import { Component, OnInit } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'skinet-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public products: Product[];
  public brands: Brand[];
  public types: ProductType[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (response: Pagination<Product>) => this.products = response.data,
      error: (error: any) => console.log(error)
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response: Brand[]) => this.brands = response,
      error: (error: any) => console.log(error)
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response: ProductType[]) => this.types = response,
    });
  }
}
