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
import { TypeMarcModelComponent } from './type-marc-model/type-marc-model.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ListGroupComponent } from "./type-marc-model/list-group/list-group.component";



@NgModule({
  declarations: [
    TypeMarcModelComponent,
    ListGroupComponent
  ],
  imports: [
    SettingsRoutingModule,
    CommonModule,
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
]
})
export class SettingsModule { }
