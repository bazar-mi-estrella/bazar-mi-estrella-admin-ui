import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeMarcModel } from 'src/app/core/interfaces/typemarcmodel.interface';
import { TypeMarcaModelService } from 'src/app/core/services/typemarcmodel.service';
import { Constants } from 'src/app/core/utils/constants';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type-marc-model',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './add-type-marc-model.component.html',
  styleUrl: './add-type-marc-model.component.scss'
})
export class AddTypeMarcModelComponent implements OnInit {

  Constants = Constants;
  ValidatorUtil = ValidatorUtil
  format: string = "";
  types: TypeMarcModel[] = [];
  form!: FormGroup;
  formMake!: FormGroup;
  formModel!: FormGroup;


  constructor(
    public activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly typeMarcaModelService: TypeMarcaModelService,

  ) {

  }

  saveType() {
    this.typeMarcaModelService.saveType(this.form.value).subscribe({
      next: (res) => {
        let config = SweetAlertUtil.getAlertConfig(res.code, res.message)
        Swal.fire(config).then(() => {
           if (res.code == '1') this.close(res.message)
        });
       
      },
      error: () => { }
    });
  }

  saveMake() {
    this.typeMarcaModelService.saveMake(this.formMake.value).subscribe({
      next: (res) => {
        let config = SweetAlertUtil.getAlertConfig(res.code, res.message)
        Swal.fire(config).then(() => {
          if (res.code == '1') this.close(res.message)
        });
      },
      error: () => { }
    });
  }


  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    })

    this.formMake = this.fb.group({
      id: [''],
      typeId: ['', [Validators.required]],
      name: ['', [Validators.required]],
    })

    this.formModel = this.fb.group({
      id: [''],
      marcaId: ['', [Validators.required]],
      name: ['', [Validators.required]],
    })
  }


  close(value?: string) {
    this.activeModal.close(value);
  }

  get name(): AbstractControl {
    return this.form.controls['name']
  }

  get nameMake(): AbstractControl {
    return this.formMake.controls['name']
  }

  get nameModel(): AbstractControl {
    return this.formModel.controls['name']
  }


}

