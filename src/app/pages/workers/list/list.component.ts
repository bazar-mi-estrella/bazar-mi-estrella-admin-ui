import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators, UntypedFormControl, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Date Format
import { DatePipe } from '@angular/common';

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { addContact, deleteContact, fetchCrmContactData, updateContact } from 'src/app/store/CRM/crm_action';
import { selectCRMLoading, selectContactData } from 'src/app/store/CRM/crm_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';

// Rest Api Service
import { GlobalComponent } from 'src/app/global-component';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Constants } from 'src/app/core/utils/constants';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { Master } from 'src/app/core/interfaces/master.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { WorkerTray } from 'src/app/core/interfaces/worker-tray.interface';
import { WorkerService } from 'src/app/core/services/worker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  isLoaderInitial: boolean = true;
  isLoader: boolean = true;

  workers: WorkerTray[] = []
  worker: WorkerTray = {} as WorkerTray;

  stateList: Master[] = []
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  contactsForm!: UntypedFormGroup;
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  contacts?: any;
  url = GlobalComponent.API_URL;
  allcontacts: any;
  searchTerm: any;
  searchResults: any;


  formFilter!: FormGroup;

  constructor(
    private readonly modalService: NgbModal,
    private readonly masterService: MasterService,
    private readonly workerService: WorkerService,
    public service: PaginationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Trabajadores' },
      { label: 'Bandeja', active: true }
    ];
    this.initForm()
    this.initValues()
    this.getData()

  }


  initForm() {
    this.formFilter = this.formBuilder.group({
      name: [''],
      stateId: [''],
      email: ['']
    })
  }

  initValues(): void {
    this.isLoaderInitial = true;
    forkJoin({
      stateList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_STATE_WORKER),
    }).subscribe({
      next: (response) => {
        this.isLoaderInitial = false;
        this.stateList = response.stateList;
      },
      error: (error) => {
        this.isLoaderInitial = false
        console.error('Error al obtener datos:', error);
      },
    });
  }

  getData() {
    this.isLoader = true;
    this.workerService.getAll(this.formFilter.value).subscribe(res => {
      this.workers = res.content
      this.worker = this.workers[0]
      this.isLoader = false;
    })
  }

  navigateNew(): void {
    this.router.navigate(['workers/new'])
  }

  openModal(): void {
    const options: NgbModalOptions = { centered: true, backdrop: 'static', size: 'lg' }
    const modalRef = this.modalService.open(DialogAddComponent, options);
    modalRef.componentInstance.message = "11111111111"; // Mensaje dinámico
    modalRef.result.then(
      (res) => console.log("hola-->", res),
      (des) => console.log("des--------->", des)
    );
  }


  /**
   * Form data get
   */
  get form() {
    return this.contactsForm.controls;
  }

  changePage() {
    this.contacts = this.service.changePage(this.allcontacts)
  }


  viewDataGet(id: string): void {
    this.worker = this.workers.find(x => x.id === id) || {} as WorkerTray;
  }

  editDataGet(id: any, content: any) {
  }

  /**
   * Confirmation mail model
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }


  // Csv File Export
  csvFileExport() {
    let orders = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Trabajadores Data',
      useBom: true,
      noDownload: false,
      headers: ["Id", "Nombres", "Foto", "Estado", "Correo", "Email", "Phone", "Tags", "Lead Score", "Last Contacted"]
    };
    new ngxCsv(this.workers, "trabajadores", orders);
  }



  clear() {
    this.initForm()
    this.getData()
  }
  /**
* Sort table data
* @param param0 sort the column
*
*/
  // Sort data
  onSort(column: string) {
    this.workers = this.service.onSort(column, this.workers)
  }



  get name(): AbstractControl {
    return this.formFilter.controls["name"]
  }

}
