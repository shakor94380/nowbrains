import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.productService.get(id)
    .subscribe((product) => {this.product = product});
  }
}
