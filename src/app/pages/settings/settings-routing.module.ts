import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeMarcModelComponent } from './type-marc-model/type-marc-model.component';


const routes: Routes = [
  {
    path: "type-marc-model",
    component: TypeMarcModelComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
