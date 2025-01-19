import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Date Format

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Sweet Alert
import Swal from 'sweetalert2';

// Rest Api Service
import { addOrder, deleteOrder, fetchorderListData, updateOrder } from 'src/app/store/Ecommerce/ecommerce_action';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { selectDataLoading, selectOrderData } from 'src/app/store/Ecommerce/ecommerce_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Constants } from 'src/app/core/utils/constants';
import { MasterService } from 'src/app/core/services/master.service';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/core/interfaces/order.interface';
import { Master } from 'src/app/core/interfaces/master.interface';
import { Router } from '@angular/router';

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
  date: any;
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

  initForm(): void {
    this.form = this.formBuilder.group({
      orderId: [''],
      _id: [''],
      clientfullname: ['', [Validators.required]],
      code: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

  }

  initValues(): void {
    forkJoin({
      stateList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_STATE_CLIENT),
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

  onSort(column: any) {
    this.allorderes = this.service.onSort(column, this.allorderes)
  }


  getPathNavigateView(id: string): string {
    return "/ecommerce/order-details/" + id
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {

    if (changeEvent.nextId === 1) {
      this.orderes = this.allorderes
    }
    if (changeEvent.nextId === 2) {
      this.orderes = this.allorderes.filter((order: any) => order.status == 'Delivered');
    }
    if (changeEvent.nextId === 3) {
      this.orderes = this.allorderes.filter((order: any) => order.status == 'Pickups');
    }
    if (changeEvent.nextId === 4) {
      this.orderes = this.allorderes.filter((order: any) => order.status == 'Returns');
    }
    if (changeEvent.nextId === 5) {
      this.orderes = this.allorderes.filter((order: any) => order.status == 'Cancelled');
    }
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


  get client(): AbstractControl {
    return this.form.controls['clientfullname']
  }


}
