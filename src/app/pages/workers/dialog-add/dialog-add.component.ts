import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { WorkerService } from 'src/app/core/services/user.service';
import { Constants } from 'src/app/core/utils/constants';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrl: './dialog-add.component.scss'
})
export class DialogAddComponent implements OnInit {

  @Input() message: string = '';          // Mensaje dinámico

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!: FormGroup;
  typeDocumentList: Master[] = []
  submitted = false;
  masterSelected!: boolean;
  isLoader: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly formBuilder: FormBuilder,
    private readonly workerService: WorkerService,
    private readonly masterService: MasterService
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  close() {
    this.activeModal.close();
  }


  initValues(): void {
    this.isLoader = true;
    forkJoin({
      typeDocumentList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_TYPE_DOCUMENT),
    }).subscribe({
      next: (response) => {
        this.isLoader = false;
        this.typeDocumentList = response.typeDocumentList;
      },
      error: (error) => {
        this.isLoader = false
        console.error('Error al obtener datos:', error);
      },
    });
  }



  initForm(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      photo: ['', Validators.required],
      typeId: ['', Validators.required],
      authid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typedocumentId: ['', Validators.required],
      numerodoc: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')
    this.form.patchValue({
      // image_src: file.name
      image_src: 'avatar-8.jpg'
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('customer-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.form.valid) {

      let timerInterval: any;
      Swal.fire({
        title: 'Contact inserted successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
    } else {
      this.submitted = true

    }

  }



  get photo(): AbstractControl {
    return this.form.controls['photo'];
  }

  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  get firstname(): AbstractControl {
    return this.form.controls['firstname'];
  }

  get lastname(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get typedocumentId(): AbstractControl {
    return this.form.controls['typedocumentId'];
  }

  get numerodoc(): AbstractControl {
    return this.form.controls['numerodoc'];
  }
}
