import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersDetailsComponent } from "./orders-details/orders-details.component";
import { CustomersComponent } from "./customers/customers.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { SellersComponent } from "./sellers/sellers.component";
import { SellerDetailsComponent } from "./seller-details/seller-details.component";

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "product-detail/:id",
    component: ProductDetailComponent
  },
  {
    path: "edit-product/:id",
    component: AddProductComponent,
    data: { title: 'Editar', mode: 'edit' }
  },
  {
    path: "add-product",
    component: AddProductComponent,
    data: { title: 'Nuevo', mode: 'new' }

  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "order-details/:id",
    component: OrdersDetailsComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "sellers",
    component: SellersComponent
  },
  {
    path: "seller-details",
    component: SellerDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
