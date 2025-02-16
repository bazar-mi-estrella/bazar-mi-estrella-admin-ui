import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Master } from 'src/app/core/interfaces/master.interface';
import { MasterService } from 'src/app/core/services/master.service';
import { RefundService } from 'src/app/core/services/refund.service';
import { Constants } from 'src/app/core/utils/constants';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund-evaluate',
  templateUrl: './refund-evaluate.component.html',
  styleUrl: './refund-evaluate.component.scss'
})
export class RefundEvaluateComponent implements OnInit {

  @Input() id: string | undefined; // Recibe los datos del modal

  isLoaderInitial: boolean = true
  isLoaderSave: boolean = false;

  ValidatorUtil = ValidatorUtil
  Constants = Constants
  form!: FormGroup;
  resultList: Master[] = []
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly formBuilder: FormBuilder,
    private readonly refundService: RefundService,
    private readonly masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      workerId: [sessionStorage.getItem('user_id'), Validators.required],
      result: ['', Validators.required],
      refundId: ['', Validators.required],
      reply: ['', Validators.required],
    });
    this.refundId.setValue(this.id)
  }

  initValues(): void {
    this.isLoaderInitial = true;
    forkJoin({
      resultList: this.masterService.findByPrefixAndCorrelatives(Constants.PREFIX_RESULT_REFUND),

    }).subscribe({
      next: (response) => {
        this.isLoaderInitial = false;
        this.resultList = response.resultList
      },
      error: (error) => {
        this.isLoaderInitial = false
        console.error('Error al obtener datos:', error);
      },
    });
  }

  save(): void {
    
    if (this.form.invalid) {
      this.submitted = true;
      return
    }

    this.isLoaderSave = true
    this.refundService.save(this.form.value).subscribe({
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

  get reply(): AbstractControl {
    return this.form.controls['reply'];
  }

  get refundId(): AbstractControl {
    return this.form.controls['refundId'];
  }
}
