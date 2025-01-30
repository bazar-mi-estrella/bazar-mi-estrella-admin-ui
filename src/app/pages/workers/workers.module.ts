import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoicesRoutingModule } from '../invoices/invoices-routing.module';
import { WorkersRoutingModule } from './workers-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';



@NgModule({
  declarations: [
    ListComponent,
    DialogAddComponent,
    NewComponent
  ],
  imports: [

    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    CountUpModule,
    FlatpickrModule,
    FeatherModule.pick(allIcons),
    InvoicesRoutingModule,
    SharedModule,
    NgSelectModule,

  ]
})
export class WorkersModule {
 
 }
