import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  formProduct!: FormGroup;
  formSearch!: FormGroup;
  products!: Product[];
  productId!: Product['_id'];
  action!: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
    this.formSearch = this.fb.group({
      name: [''],
      stock: [''],
      price: [''],
      start: [''],
      end: [''],
    });
    this.getProducts();
  }

  clearFormProduct(){
    this.formProduct.reset();
  }

  clearFormSearch(){
    this.formSearch.reset();
  }

  getProducts(){
    this.productService.getAll()
    .subscribe((products: Product[])=> this.products = products)
  }

  showProduct(id: Product['_id']) {
    this.router.navigate(['product', id]);
  }

  editProduct(product: Product) {
    this.productId = product._id;
    this.action = 'edit';
    this.formProduct.patchValue({
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
    })
  }

  search() {
    let data: any = {};
    const keys = Object.keys(this.formSearch.value);
    for (let index = 0; index < keys.length; index++) {
      if (this.formSearch.value[keys[index]]){
        data[keys[index]] = this.formSearch.value[keys[index]];
      }
    }
    this.productService.search(data)
    .subscribe((products: Product[])=> {
      this.products = products;
      this.toast.success('search done');
    });
  }

  createProduct() {
    this.clearFormProduct();
    this.action = 'save';
  }

  deleteProduct(id: Product['_id']) {
    if (confirm("Are you sure to delete that line")) {
      this.productService.delete(id)
      .subscribe(()=>{
        this.getProducts();
        this.toast.success('Product deleted');
      });
    }
  }

  save() {
    if (this.action === 'save') {
      this.productService.create(this.formProduct.value)
            .subscribe(()=>{
        this.getProducts();
        this.toast.success('Product created');
      });
    } else if(this.action === 'edit'){
      this.productService.patch(this.productId, this.formProduct.value)
            .subscribe(()=>{
        this.getProducts();
        this.toast.success('Product edited');
      });
    }
  }
}
