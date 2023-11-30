
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products! : Array <Product>;
  constructor() {

    this.products=[ {
      id:1,
      name: "computer",
    price: 2000,
    promotion: false,
    },
    {
      id:2,
      name: "samsung",
      price: 3000,
      promotion: true,
    },
    {
      id:3,
      name: "itel",
      price: 1000,
      promotion: false,
    },
    {
      id:4,
      name: "nokia",
      price: 4000,
      promotion: true,

    },
    {
      id:5,
      name: "salade",
      price: 400,
      promotion: true,

    },
    {
      id:6,
      name: "oignon",
      price: 4000,
      promotion: true,

    },
    {
      id:7,
      name: "haricot",
      price: 400,
      promotion: true,

    },
    {
      id:8,
      name: "sel",
      price: 4000,
      promotion: false,

    },
    {
      id:9,
      name: "tomate",
      price: 4000,
      promotion: true,

    },
    {
      id:10,
      name: "calebasse",
      price: 1000,
      promotion: true,

    },
    {
      id:11,
      name: "chaussure",
      price: 4000,
      promotion: false,

    },
    {
      id:12,
      name: "caviar",
      price: 4000,
      promotion: true,

    },
    {
      id:13,
      name: "moro",
      price: 299,
      promotion: true,

    },
    {
      id:14,
      name: "couteau",
      price: 4000,
      promotion: true,

    },
    {
      id:15,
      name: "VACHE",
      price: 4000,
      promotion: false,

    },
    {
      id:16,
      name: "banene",
      price: 4000,
      promotion: true,

    },
    {
      id:17,
      name: "voiture",
      price: 300,
      promotion: false,

    }

  ]
   }

   public getAllProducts() : Observable<Product[]>{
    // let rnd = Math.random();
    // if(rnd<0.1) return throwError(()=>new Error("Internet connexion error"));
    // else
    return of(this.products);
   };

   public getPageProducts(page : number, size: number) : Observable<PageProduct>{
    let index = page*size;
   let totalPages = ~~(this.products.length/size);
   if (this.products.length % size!=0)
   totalPages++;

   let pageProduct = this.products.slice(index, index+size);
   return of({page: page, size:size, totalPages: totalPages, products: pageProduct})
   };

   public deleteProduct(id : number): Observable <boolean>{
  this.products = this.products.filter(p=>p.id!=id);
  return of (true)
   };

   public setPromotion(id : number) : Observable <boolean>{
   let product=  this.products.find(p=>p.id==id);
    if(product!=undefined){
      product.promotion=! product.promotion;
      return of(true)
    }else return throwError (()=> new Error("product not found"))
   };

   public seachProducts (keyword: string, page: number, size:number) : Observable<PageProduct>{
   let result= this.products.filter(p=>p.name.includes(keyword))
   let index = page*size;
   let totalPages = ~~(result.length/size);
   if (this.products.length % size!=0)
   totalPages++;

   let pageProduct = this.products.slice(index, index+size);
   return of({page: page, size:size, totalPages: totalPages, products: pageProduct})
   };

   public addNewProduct(product: Product): Observable <Product>{
product.id=Math.random();
this.products.push(product);
return of(product);
   };

   public getProduct( id: number){
   let product= this.products.find(p=>p.id==id);
   if(product==undefined) return throwError(()=>new Error("Product not fount"));
    return of(product)
   };

  public getErrorMessage(fieldName: string, error: any): string{
    if (error['required']) {
    return fieldName +" is required";
    } else if(error['minlength']) {
    return fieldName+" should have at least" + error["minlength"]["requiredLength"]+ "Characters";
    } else if(error['min']) {
    return fieldName+" shoild have min value" + error["min"]["min"] ;
    }else return "";
      };

  public updateProduct(product : Product): Observable <Product>{
    this.products=this.products.map(p=>(p.id==product.id)? product : p)
    return of(product)
  }
};
