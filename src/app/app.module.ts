import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import { CustomersComponent } from './components/customers/customers.component'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    NewProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
