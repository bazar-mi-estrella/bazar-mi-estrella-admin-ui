import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path: 'workers', loadChildren: () => import('./workers/workers.module').then(m => m.WorkersModule)
  },
  {
    path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
  },
  

  {
    path: 'marletplace', loadChildren: () => import('./nft-marketplace/nft-marketplace.module').then(m => m.NftMarketplaceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
