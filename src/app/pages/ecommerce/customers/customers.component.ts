import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
// Date Format

// Sweet Alert

// Csv File Export

// Rest Api Service
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Constants } from 'src/app/core/utils/constants';
import { forkJoin } from 'rxjs';
import { MasterService } from 'src/app/core/services/master.service';
import { Router } from '@angular/router';
import { Master } from 'src/app/core/interfaces/master.interface';
import { CustomerService } from '../../../core/services/customer.service';
import { ClientFilter } from 'src/app/core/interfaces/client-filter.interface';
import { Client } from 'src/app/core/interfaces/client.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})

/**
 * Customers Component
 */
export class CustomersComponent {
  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!:FormGroup
  stateList: Master[] = []
  isLoader: boolean = true;

  customers: Client[]=[];

  // bread crumb items
  breadCrumbItems!: Array<{}>;



  constructor(
     public service: PaginationService,
    private readonly masterService: MasterService,
    private readonly router: Router,

    private  readonly customerService:CustomerService,

    private readonly formBuilder: UntypedFormBuilder,
 ) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Clientes' },
      { label: 'Bandeja', active: true }
    ];

    this.initForm()
    this.initValues()
    this.getData()

  }

  initForm():void{
    this.form = this.formBuilder.group({
      id: [''],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
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

  
    clear(): void {
      this.initForm()
      this.getData()
    }
  
    getData() {
      this.isLoader = true;
      this.customerService.getAllByfilter(this.form.value as ClientFilter).subscribe((response) => {
  
        this.customers = this.service.changePage(response.content)
        this.isLoader = false;
      })
  
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
