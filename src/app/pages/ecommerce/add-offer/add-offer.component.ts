import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { chatMessagesData } from 'src/app/core/data';
import { Master } from 'src/app/core/interfaces/master.interface';
import { Product } from 'src/app/core/interfaces/product.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { ProductService } from 'src/app/core/services/product.service';
import { RefundService } from 'src/app/core/services/refund.service';
import { Constants } from 'src/app/core/utils/constants';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent {

  @Input() id: string | undefined; // Recibe los datos del modal

  isLoaderInitial: boolean = true
  isLoaderSave: boolean = false;

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!: FormGroup;
  submitted = false;


  public Default = chatMessagesData;
  selectedAccount = 'This is a placeholder';

  products: Product[] = []

  constructor(
    public activeModal: NgbActiveModal,
    private readonly formBuilder: FormBuilder,
    private readonly refundService: RefundService,
    private readonly masterService: MasterService,
    private readonly productService: ProductService,
    private readonly offerService:OfferService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProducts();
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      workerId: [sessionStorage.getItem('user_id'), Validators.required],
      productId: ['', Validators.required],
      discount: ['', Validators.required],
      reason: ['', Validators.required],
      datestart: ['', Validators.required],
      dateend: ['', Validators.required],

    });
    this.refundId.setValue(this.id)
  }


  getProducts(): void {
    this.isLoaderInitial = true
    this.productService.autocomplete('').subscribe({
      next: (response) => {
        this.isLoaderInitial = false
        this.products = response
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    }) // Get all products
  }

  onSearch(event: any): void {
    console.log("event-->", event)
    this.productService.autocomplete(event.term).subscribe({
      next: (response) => {
        this.products = response
        this.productService.localProducts = response
      },
      error: (error) => { console.error('Error al obtener datos:', error); }
    })
  }

  save(): void {

    if (this.form.invalid) {
      this.submitted = true;
      return
    }

    this.isLoaderSave = true
    this.offerService.save(this.form.value).subscribe({
      next: res => {
        this.isLoaderSave = false
        let config = SweetAlertUtil.getAlertConfig("1", res.message)
        Swal.fire(config).then(() => this.close(res.code));
      },
      error: () => {
        this.isLoaderSave = false
        let config = SweetAlertUtil.getAlertConfig("3", "Sucedio un inconveniente, vuelve a intentarlo")
        Swal.fire(config).then(() => { });
      }

    })
  }

  close(value?: string) {
    this.activeModal.close(value);
  }
  get result(): AbstractControl {
    return this.form.controls['result'];
  }

  get reason(): AbstractControl {
    return this.form.controls['reason'];
  }

  get refundId(): AbstractControl {
    return this.form.controls['refundId'];
  }
}
