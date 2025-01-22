import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/interfaces/users.interface';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { UserService } from 'src/app/core/services/user.service';
import { Constants } from 'src/app/core/utils/constants';
import { ValidatorUtil } from 'src/app/core/utils/validator.util';
import { InvoiceListModel } from 'src/app/store/Invoice/invoice_model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  ValidatorUtil = ValidatorUtil
  Constants = Constants

  form!: FormGroup;
  users: User[] = []
  num: number = 0;

  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  CustomersData!: InvoiceListModel[];
  masterSelected!: boolean;
  checkedList: any;


  isLoader: boolean = true;

  constructor(
    private fb: FormBuilder,
    public service: PaginationService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Bandeja', active: true }
    ];

    this.initForm();
    this.getDataUsers();

  }


  getDataUsers() {
    this.isLoader = true;
    this.userService.getAll(this.form.value).subscribe(res => {
      this.users = res.content
      this.isLoader = false;
    })
  }

  initForm() {
    this.form = this.fb.group({
      name: [''],
      stateId: [''],
      email: ['']
    })
  }



  clear() {
    this.initForm()
    this.getDataUsers()
  }



  // Sort Data
  onSort(column: string) {
    this.users = this.service.onSort(column, this.users)
  }

  get name(): AbstractControl {
    return this.form.controls["name"]
  }

}
