import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

// Component pages

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },

  {
    path: "new",
    component: NewComponent,
    data: { title: 'Nuevo', mode: 'new' }
  },
  {
    path: "edit/:id",
    component: NewComponent,
    data: { title: 'Editar', mode: 'edit' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
