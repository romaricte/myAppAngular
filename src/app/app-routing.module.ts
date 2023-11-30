import { AuthenticationGuard } from './guards/authentication.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},

  {path: "", component : LoginComponent},
  {path: "admin", component : AdminTemplateComponent,
  canActivate:[AuthenticationGuard],
children:[
  {path: "products", component: ProductsComponent },
  {path: "customers", component : CustomersComponent},
  {path: "newProduct", component : NewProductComponent},
  {path: "editProduct/:id", component : EditProductComponent},
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
