import { Component, OnInit } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'skinet-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public products: Product[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response: Pagination<Product>) => this.products = response.data,
      error: (error: any) => console.log(error)
    });
  }

}
