import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
// Range Slider
import { Options } from 'ngx-slider-v2';


// Products Services
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from '../../../global-component';
import { Router } from '@angular/router';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { deleteProduct } from 'src/app/store/Ecommerce/ecommerce_action';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductFilter } from 'src/app/core/interfaces/product-filter';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { Constants } from 'src/app/core/utils/constants';
import { forkJoin } from 'rxjs';
import { MasterService } from 'src/app/core/services/master.service';
import { TypeMarcaModelService } from 'src/app/core/services/typemarcmodel.service';
import { Master } from 'src/app/core/interfaces/master.interface';
import { TypeMarcModel } from 'src/app/core/interfaces/typemarcmodel.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

/**
 * Products Components
 */
export class ProductsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ValidatorUtil = ValidatorUtil
  Constants = Constants

  url = GlobalComponent.API_URL;
  publishedList: Master[] = []
  typesList: TypeMarcModel[] = []
  marcList: TypeMarcModel[] = []

  products: Product[] = [];
  user = [];
  Brand: any = [];
  Rating: any = [];
  discountRates: number[] = [];
  form!: FormGroup;
  total: any;
  totalbrand: any;
  totalrate: any;
  totaldiscount: any;

  allproducts: any;
  activeindex = '1';
  allpublish: any;
  grocery: any = 0;
  fashion: any = 0;
  watches: any = 0;
  electronics: any = 0;
  furniture: any = 0;
  accessories: any = 0;
  appliance: any = 0;
  kids: any = 0;
  totalpublish: any = 0;

  searchTerm: string = ""
  isLoader: boolean = true;


  constructor(
    private readonly modalService: NgbModal,
    private readonly masterService: MasterService,
    private readonly router: Router,
    public service: PaginationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly store: Store<{ data: RootReducerState }>,
    public restApiService: restApiService,
    private readonly productService: ProductService,
    private readonly typeMarcaModelService: TypeMarcaModelService,

  ) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Productos' },
      { label: 'Bandeja', active: true }
    ];

    this.initForm()
    this.initValues()
    this.getData()
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      type: [''],
      marca: ['']
    });
  }

  clear(): void {
    this.initForm()
    this.getData()
  }

  getData() {
    this.isLoader = true;
    this.productService.getAllByfilter(this.form.value as ProductFilter).subscribe((response) => {

      this.products = this.service.changePage(response.content)
      this.isLoader = false;
    })

  }

  initValues(): void {
    forkJoin({
      publishedList: this.masterService.findByPrefixAndCorrelatives(6),
      typesList: this.typeMarcaModelService.types()
    }).subscribe({
      next: (response) => {
        this.publishedList = response.publishedList;
        this.typesList = response.typesList
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  getMarcas(typeId: string): void {
    this.typeMarcaModelService
      .marcas(typeId)
      .subscribe(res => this.marcList = res)
  }


  onSelectionChangeType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    //this.getMarcas(value)
  }


  changePage() {
    this.products = this.service.changePage(this.products)
  }

  /**
* change navigation
*/

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort(column: string) {
    this.products = this.service.onSort(column, this.products)
  }

  /**
  * Delete Model Open
  */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.store.dispatch(deleteProduct({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteProduct({ id: this.checkedValGet.toString() }));
      (document.getElementById("selection-element") as HTMLElement).style.display = "none"
    }
    this.deleteId = ''
  }

  // Price Slider
  minValue = 0;
  maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000
  };

  /**
   * Default Select2
   */
  multiDefaultOption = 'Watches';
  selectedAccount = 'This is a placeholder';
  Default = [
    { name: 'Watches' },
    { name: 'Headset' },
    { name: 'Sweatshirt' },
  ];

  // Check Box Checked Value Get
  checkedValGet: any[] = [];
  // Select Checkbox value Get


  godetail(id: string) {
    this.router.navigate(['/ecommerce/product-detail/' + id])
  }


  gopublishdetail(id: any) {
    this.router.navigate(['/ecommerce/product-detail/'])
  }

  get name(): AbstractControl {
    return this.form.controls["name"]
  }


}
