import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { Offer } from 'src/app/core/interfaces/offer.interface';
import { Paginator } from 'src/app/core/interfaces/paginator.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TypeMarcaModelService } from 'src/app/core/services/typemarcmodel.service';
import { Constants } from 'src/app/core/utils/constants';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { RootReducerState } from 'src/app/store';
import { AddOfferComponent } from '../add-offer/add-offer.component';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements OnInit {

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  isLoader: boolean = true;

  paginator: Paginator = { size: 20, number: 0 } as Paginator;

  form!: FormGroup;
  offers: Offer[] = []
  stateList: Master[] = []
  breadCrumbItems = [
    { label: 'Productos' },
    { label: 'Ofertas', active: true }
  ];

  constructor(
    private readonly modalService: NgbModal,
    private readonly masterService: MasterService,
    private readonly router: Router,
    public service: PaginationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly offerService: OfferService,
  ) { }


  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Productos' },
      { label: 'Ofertas', active: true }
    ];

    this.initForm()
    this.initValues()
    this.getData(this.paginator)
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      productName: [''],
      typeId: [''],
      marcaId: ['']
    });
  }

  initValues(): void {
    forkJoin({
      stateList: this.masterService.findByPrefixAndCorrelatives(6),
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
    this.getData(this.paginator)
  }

  getData(paginator: Paginator) {
    this.isLoader = true;
    this.offerService.getAllByfilter(this.form.value, paginator).subscribe((response) => {
      this.offers = response.content
      this.paginator = this.service.buildPagination(response)
      this.isLoader = false;
    })

  }

  openModal(): void {
    const options: NgbModalOptions = { centered: true, backdrop: 'static', size: 'lg' }
    const modalRef = this.modalService.open(AddOfferComponent, options);
    modalRef.result.then(
      (res) => res ? this.getData(this.paginator) : console.log("close"),
      () => { }
    );
  }


  edit(offer: Offer) {

  }

  // Csv File Export
  csvFileExport() {
    let config = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Ofertas Data',
      useBom: true,
      noDownload: false,
      headers: ["Id", "Nombres", "Foto", "Estado", "Correo", "Email", "Phone", "Tags", "Lead Score", "Last Contacted"]
    };
    new ngxCsv(this.offers, "Ofertas", config);
  }


  changePage(index: number) {
    this.getData({ size: this.paginator.size, number: index - 1 } as Paginator)
  }

  onSort(column: string) {
    this.offers = this.service.onSort(column, this.offers)
  }


  get name(): AbstractControl {
    return this.form.controls["productName"]
  }
}
