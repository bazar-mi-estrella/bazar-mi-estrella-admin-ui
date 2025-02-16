import { Component } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Constants } from 'src/app/core/utils/constants';
import { DateFormatUtil } from 'src/app/core/utils/date-format.util';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { OrderRefund } from 'src/app/core/interfaces/order-refund.interface';
import { RefundService } from 'src/app/core/services/refund.service';
import { RefundEvaluateComponent } from '../refund-evaluate/refund-evaluate.component';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrl: './refunds.component.scss'
})
export class RefundsComponent {

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  isLoader: boolean = true
  stateList: Master[] = []
  form!: FormGroup;
  refunds: OrderRefund[] = []

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly masterService: MasterService,
    private readonly refundService: RefundService,
    public service: PaginationService,
  ) {
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Pedidos' },
      { label: 'Reembolsos', active: true }
    ];

    this.initForm()
    this.initValues()
    this.getData()

  }

  initForm(): void {
    this.form = this.formBuilder.group({
      personfullname: [''],
      orderCode: [''],
      orderDate: ['25-01-2023'],
      stateId: [''],
      datestart: [''],
      dateend: [''],
    });

  }

  initValues(): void {
    forkJoin({
      stateList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_STATE_REFUND),
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
    this.refundService.getRefunds(this.form.value).subscribe((response) => {
      this.refunds = this.service.changePage(response.content)
      this.isLoader = false;
    })

  }

  openModal(id: string): void {
    const options: NgbModalOptions = { centered: true, backdrop: 'static', size: 'lg' }
    const modalRef = this.modalService.open(RefundEvaluateComponent, options);
    modalRef.componentInstance.id = id; // Mensaje dinámico
    modalRef.result.then(
      (res) => res ? this.getData() : console.log("close"),
      () => { }
    );
  }


  clear(): void {
    this.initForm()
    this.getData()
  }

  startOptions: any = {
    locale: Spanish,
    mode: 'range',
    dateFormat: 'd M, Y',
    altFormat: 'd M, Y',
    maxDate: new Date(),
  };

  onDateChange(event: any) {
    let selectDates: any[] = event.selectedDates
    let dateStart: string = DateFormatUtil.start(selectDates[0])
    let dateEnd: string = DateFormatUtil.end(selectDates[1])

    this.datestart.setValue(dateStart)
    this.dateEnd.setValue(dateEnd)

  }

  onSort(column: string) {
    this.refunds = this.service.onSort(column, this.refunds)
  }

  changePage() {
    this.refunds = this.service.changePage(this.refunds)
  }

  get code(): AbstractControl {
    return this.form.controls['orderCode']
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
