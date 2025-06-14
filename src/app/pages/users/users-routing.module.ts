import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ListComponent } from "./list/list.component";
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "new",
    component: NewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
