import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, UntypedFormBuilder } from '@angular/forms';

// Rest Api Service
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Constants } from 'src/app/core/utils/constants';
import { MasterService } from 'src/app/core/services/master.service';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/core/interfaces/order.interface';
import { Master } from 'src/app/core/interfaces/master.interface';
import { Router } from '@angular/router';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { DateFormatUtil } from 'src/app/core/utils/date-format.util';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

/**
 * Orders Component
 */
export class OrdersComponent {
  ValidatorUtil = ValidatorUtil
  Constants = Constants
  isLoader: boolean = true
  stateList: Master[] = []
  form!: FormGroup;
  locale = Spanish

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  masterSelected!: boolean;
  checkedList: any;
  customerName?: any;

  Pending = 'Pending';
  Inprogress = 'Inprogress';
  Cancelled = 'Cancelled';
  Pickups = 'Pickups';
  Returns = 'Returns';
  Delivered = 'Delivered';
  payment: any = '';
  status: any = '';

  // Api Data
  content?: any;
  econtent?: any;
  orderes?: any;
  page: any = 1;
  pageSize: any = 8;

  allorderes: Order[] = [];
  searchResults: any;
  searchTerm: any;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly masterService: MasterService,
    private readonly orderService: OrderService,
    public service: PaginationService,
  ) {
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Pedidos' },
      { label: 'Bandeja', active: true }
    ];

    this.initForm()
    this.initValues()
    this.getData()

  }


  flatpickrOptions: any = {
    mode: 'range',
    altInput: true,
    dateFormat: 'dd/MM/yyyy',
    altFormat: 'dd/MM/yyyy',
  };
  DAY = 86400000;

  startOptions: any = {
    locale: Spanish,
    mode: 'range',
    dateFormat: 'd M, Y',
    altFormat: 'd M, Y',
    maxDate: new Date(),
  };

  initForm(): void {
    this.form = this.formBuilder.group({
      personfullname: [''],
      code: [''],
      orderDate: ['25-01-2023'],
      stateId: [''],
      statepagoId: [''],
      datestart: [''],
      dateend: [''],
    });

  }

  initValues(): void {
    forkJoin({
      stateList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_STATE_PAYMENT),
    }).subscribe({
      next: (response) => {
        this.stateList = response.stateList;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  getData(): void {
    this.isLoader = true;
    this.orderService.getAllByfilter(this.form.value).subscribe((response) => {

      this.allorderes = this.service.changePage(response.content)
      this.isLoader = false;
    })

  }

  clear(): void {
    this.initForm()
    this.getData()
  }

  changePage() {
    this.allorderes = this.service.changePage(this.allorderes)
  }


  onDateChange(event: any) {
    let selectDates: any[] = event.selectedDates
    let dateStart: string = DateFormatUtil.start(selectDates[0])
    let dateEnd: string = DateFormatUtil.end(selectDates[1])

    this.datestart.setValue(dateStart)
    this.dateEnd.setValue(dateEnd)

  }

  onNavChange(changeEvent: NgbNavChangeEvent): void {
    const actions: { [key: number]: () => void } = {
      1: () => {
        this.stateId.reset();
        this.getData();
      },
      2: () => {
        this.stateId.setValue(Constants.STATE_ORDER_DELIVERED);
        this.getData();
      },
      3: () => {
        this.stateId.setValue(Constants.STATE_ORDER_IN_TRANSIT);
        this.getData();
      },
      4: () => {
        this.orderes = this.allorderes.filter((order: any) => order.status === 'Returns');
      },
      5: () => {
        this.orderes = this.allorderes.filter((order: any) => order.status === 'Cancelled');
      },
      6: () => {
        this.stateId.setValue(Constants.STATE_ORDER_PREPARING_SHIPMENT);
        this.getData();
      },
    };

    // Ejecuta la acción correspondiente si existe
    actions[changeEvent.nextId]?.();
  }



  /**
   * Open modal
   * @param content modal content
  */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
  * Delete Model Open
  */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }


  get code(): AbstractControl {
    return this.form.controls['code']
  }

  get stateId(): AbstractControl {
    return this.form.controls['stateId']
  }

  get client(): AbstractControl {
    return this.form.controls['personfullname']
  }

  get datestart(): AbstractControl {
    return this.form.controls['datestart']
  }

  get dateEnd(): AbstractControl {
    return this.form.controls['dateend']
  }

}

