import { Component } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// Range Slider
import { Options } from 'ngx-slider-v2';


// Products Services
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from '../../../global-component';
import { Router } from '@angular/router';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { deleteProduct, fetchProductListData } from 'src/app/store/Ecommerce/ecommerce_action';
import { selectDataLoading, selectProductData } from 'src/app/store/Ecommerce/ecommerce_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductFilter } from 'src/app/core/interfaces/product-filter';

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

  url = GlobalComponent.API_URL;
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

  searchTerm:string=""


  constructor(private modalService: NgbModal,
    private router: Router,
    public service: PaginationService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    public restApiService: restApiService,
    private productService: ProductService) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Productos' },
      { label: 'Bandeja', active: true }
    ];

    this.initForm()

    this.getData()
  }

  initForm(): void {
    /**
    * Form Validation
    */
    this.form = this.formBuilder.group({
        id:['']
    });
  }


  getData() {
    this.productService.getAllByfilter(this.form.value as ProductFilter).subscribe((response) => {

      this.products = this.service.changePage(response.content)
      document.getElementById('elmLoader')?.classList.add('d-none');

    })

  }

  // Search Data
  performSearch(): void {
 
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
  onCheckboxChange(e: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    var checkBoxCount: any = document.getElementById('select-content') as HTMLElement;
    checkBoxCount.innerHTML = checkedVal.length;
    checkedVal.length > 0 ? (document.getElementById("selection-element") as HTMLElement).style.display = "block" : (document.getElementById("selection-element") as HTMLElement).style.display = "none";
  }
  /**
    * Brand Filter
    */
  changeBrand(e: any) {
    if (e.target.checked) {
      this.Brand.push(e.target.defaultValue)
    } else {
      for (var i = 0; i < this.Brand.length; i++) {
        if (this.Brand[i] === e.target.defaultValue) {
          this.Brand.splice(i, 1)
        }
      }
    }
    this.totalbrand = this.Brand.length
  }

  /**
  * Discount Filter
  */



  /**
   * Rating Filter
   */


  /**
   * Product Filtering  
   */

  /**
  * Search Product
  */

  /**
  * Range Slider Wise Data Filter
  */
  valueChange(value: number, boundary: boolean): void {
    if (value > 0 && value < 1000) {
      if (this.activeindex == '1') {
        if (boundary) {
          this.minValue = value;
        } else {
          this.maxValue = value;
        }
      } else if (this.activeindex == '2') {
        if (boundary) {
          this.minValue = value;
        } else {
          this.maxValue = value;
        }
      }
    }
  }

  clearall(ev: any) {
  
  }

  godetail(id: any) {
    this.router.navigate(['/ecommerce/product-detail'])
  }

  gopublishdetail(id: any) {
    this.router.navigate(['/ecommerce/product-detail/'])
  }

}
