import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormProduct, Product } from 'src/app/shared/interfaces/product';
import { Search } from 'src/app/shared/interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
    ) { }

  getAll(){
    return this.http.get<Product[]>('products');
  }

  get(id: string) {
    return this.http.get<Product>(`products/${id}`);
  }

  create(data: FormProduct) {
    return this.http.post('products', {data})
  }

  delete(id: string) {
    return this.http.delete(`products/${id}`);
  }

  patch(id: string, data: FormProduct) {
    return this.http.patch<Product>(`products/${id}`, {data});
  }

  search(data: Search) {
    return this.http.post<Product[]>('products/search', {data});
  }
}
