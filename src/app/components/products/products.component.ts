import { throwError } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products!: Array<Product>;
  currentPage: number=0;
  pageSize : number =5;
  totalPages: Number=0;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string='all';

  constructor(
    private productService: ProductService,
    private fb : FormBuilder,
    public authService: AuthentificationService,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      Keyword: this.fb.control(null)
    });
    this.handleGetPageProducts()

  }


  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error : (err)=>{
        this.errorMessage = err;
      }
    });
  }
  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages= data.totalPages;
      },
      error : (err)=>{
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p: any) {
    let conf = confirm("are you sure");
    if (conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>{
        let index = this.products.indexOf(p);
        this.products.splice(index, 1)
      }
    })
  }

  handleSetPromotion(p: Product){
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next : (data)=>{
        p.promotion=!promo;
      },
      error : err =>{
        this.errorMessage=err;
      }
    })
  }

  handleSearchProducts(){
    this.currentAction='search'
    this.currentPage==0;
let Keyword=this.searchFormGroup.value.Keyword;
this.productService.seachProducts(Keyword, this.currentPage, this.pageSize).subscribe({
  next :(data)=>{
    this.products=data.products;
    this.totalPages=data.totalPages;
  }
})
  };

  goTo(i:number){
this.currentPage=i;
if(this.currentAction=='all')
this.handleGetPageProducts();
else
this.handleSearchProducts();
  }

  handleNewProduct(){
this.router.navigateByUrl("/admin/newProduct")
  }


  handleEditProduct(p:Product){
this.router.navigateByUrl("/admin/editProduct/"+p.id)
  }
}
