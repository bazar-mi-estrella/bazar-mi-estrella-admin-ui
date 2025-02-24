import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { ImgbbService } from 'src/app/core/services/imgbb.service';
import { MasterService } from 'src/app/core/services/master.service';
import { WorkerService } from 'src/app/core/services/worker.service';
import { Constants } from 'src/app/core/utils/constants';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { FirebaseError } from "firebase/app"; // Importa FirebaseError

// Sweet Alert
import Swal from 'sweetalert2';
import { WorkerGet } from 'src/app/core/interfaces/worker-get.interface';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {

  @Input() message: string = '';          // Mensaje dinámico

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!: FormGroup;
  typeDocumentList: Master[] = []
  roleList: Master[] = []
  submitted = false;
  isLoaderInit: boolean = true;
  isLoader: boolean = false;
  breadCrumbItems!: Array<{}>;

  title: string = ''
  mode: string = ''
  id: string = this.activatedRoute.snapshot.params["id"]

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly workerService: WorkerService,
    private readonly masterService: MasterService,
    private readonly imgbbService: ImgbbService,

  ) { }

  ngOnInit(): void {
    this.initDataRoute()
    this.initForm();
    this.initValues();
  }

  initDataRoute() {
    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      this.mode = data['mode'];
    });

    this.breadCrumbItems = [
      { label: 'Trabajadores' },
      { label: this.title, active: true }
    ];
  }

  initValues(): void {
    this.isLoaderInit = true;
    forkJoin({
      typeDocumentList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_TYPE_DOCUMENT),
      roleList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_ROLE),

    }).subscribe({
      next: (response) => {
        this.isLoaderInit = false;
        this.typeDocumentList = response.typeDocumentList;
        this.roleList = response.roleList
        if (this.mode === 'edit') this.getById()

      },
      error: (error) => {
        this.isLoaderInit = false
        console.error('Error al obtener datos:', error);
      },
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      photo: ['', Validators.required],
      typeId: ['', Validators.required],
      imgurl: [''],
      authid: [''],
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

  
    getById(): void {
      this.workerService.getById(this.id).subscribe((res: WorkerGet) => {
        this.form.patchValue(res)
      })
    }

  // File Upload
  imageURL: string | undefined;
  base64Image: string = '';

  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;

      // Convertir el archivo leído en Base64
      this.base64Image = this.imageURL.split(',')[1]; // Aquí se obtiene solo la parte Base64

      // Asignar la imagen al elemento img en la página
      (document.getElementById('customer-img') as HTMLImageElement).src = this.imageURL;

      this.imgbbService.save(this.base64Image).subscribe((res) => {
        this.photo.setValue(res.data.url)
      })
    }

    reader.readAsDataURL(file);
  }


  /**
   * Save user
   */
  async saveUser(firebaseId: string) {
    this.isLoader = true;

    this.authid.setValue(firebaseId)
    this.workerService.save(this.form.value).subscribe({
      next: res => {
        this.isLoader = false;
        let config = SweetAlertUtil.getAlertConfig(res.code, res.message)
        Swal.fire(config).then(() => this.router.navigate(['workers']));
      },
      error: res => { }
    })

  }

  beforeSave(): void {
    if (this.form.valid) {
      this.workerService.register(this.email.value, this.numerodoc.value)
        .then(x => this.saveUser(x.user.uid))
        .catch(error => this.verifErrorFirebase(error))

    } else {
      this.submitted = true
    }
  }

  verifErrorFirebase(error: FirebaseError): void {
    let config = SweetAlertUtil.getAlertConfig("3", "Error desconocido en proveedor de Autenticación")
    switch (error.code) {
      case "auth/email-already-in-use":
        config = SweetAlertUtil.getAlertConfig("3", "El correo ya existe en el proveedor de Autenticación, ingresa otro")
        console.error("El correo ya está registrado.");
        break;
      case "auth/invalid-email":
        console.error("El correo no es válido.");
        break;
      case "auth/weak-password":
        console.error("La contraseña es demasiado débil.");
        break;
      default:
        console.error("Error desconocido:", error.message);
    }

    Swal.fire(config).then(() => { });


  }



  back(): void {
    this.router.navigate(['/workers'])
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

  get typeId(): AbstractControl {
    return this.form.controls['typeId']
  }

  get phone(): AbstractControl {
    return this.form.controls["phone"]
  }

  get address(): AbstractControl {
    return this.form.controls["address"]
  }

  get imgurl(): AbstractControl {
    return this.form.controls["imgurl"]
  }

  get authid(): AbstractControl {
    return this.form.controls["authid"]
  }

}

