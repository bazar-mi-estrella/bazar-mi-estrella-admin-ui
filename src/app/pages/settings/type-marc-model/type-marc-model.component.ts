import { Component, model } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ClientFilter } from 'src/app/core/interfaces/client-filter.interface';
import { Client } from 'src/app/core/interfaces/client.interface';
import { Master } from 'src/app/core/interfaces/master.interface';
import { CustomerService } from 'src/app/core/services/customer.service';
import { MasterService } from 'src/app/core/services/master.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Constants } from 'src/app/core/utils/constants';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { AddTypeMarcModelComponent } from './add-type-marc-model/add-type-marc-model.component';
import { TypeMarcaModelService } from 'src/app/core/services/typemarcmodel.service';
import { TypeMarcModel } from 'src/app/core/interfaces/typemarcmodel.interface';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-marc-model',
  templateUrl: './type-marc-model.component.html',
  styleUrl: './type-marc-model.component.scss'
})
export class TypeMarcModelComponent {
  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!: FormGroup
  stateList: Master[] = []
  isLoader: boolean = true;

  customers: Client[] = [];

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  typesList: TypeMarcModel[] = []
  makesList: TypeMarcModel[] = []
  modelsList: TypeMarcModel[] = []

  constructor(
    public service: PaginationService,
    private readonly masterService: MasterService,
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly typeMarcaModelService: TypeMarcaModelService,
    private readonly customerService: CustomerService,

    private readonly formBuilder: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Tipo - marca - modelo', active: true }
    ];

    this.initForm()
    this.initValues()

  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      stateId: ['', [Validators.required]]
    });
  }

  initValues(): void {
    forkJoin({
      typesList: this.typeMarcaModelService.types(),
      makesList: this.typeMarcaModelService.makes(),
      modelsList: this.typeMarcaModelService.models('')

    }).subscribe({
      next: (response) => {
        this.typesList = response.typesList
        this.makesList = response.makesList
        this.modelsList = response.modelsList
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }


  openModal(format: string): void {
    const options: NgbModalOptions = { centered: true, backdrop: 'static', size: 'sm' }
    const modalRef = this.modalService.open(AddTypeMarcModelComponent, options);
    modalRef.componentInstance.forrmat = format
    modalRef.result.then(
      (res) => {
        if (res) this.initValues()
      },
      () => { }
    );
  }


  deleteItem(item: TypeMarcModel): void {
    this.typeMarcaModelService.deleteType(item.id).subscribe({
      next: (res) => {
        let config = SweetAlertUtil.getAlertConfig(res.code, res.message)
        Swal.fire(config).then(() => this.initValues());
      },
      error: (error: any) => {
        console.error('Error al eliminar el elemento:', error);
      },
    });
  }

  clear(): void {
    this.initForm()
  }



  changePage() {
    this.customers = this.service.changePage(this.customers)
  }

  onSort(column: any) {
    // resetting other headers
    this.customers = this.service.onSort(column, this.customers)
  }


  get name(): AbstractControl {
    return this.form.controls["fullname"]
  }

  get email(): AbstractControl {
    return this.form.controls["email"]
  }
}
