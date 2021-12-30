import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'skinet-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  quantity: number = 1;

  constructor(private shopService: ShopService,
  private route: ActivatedRoute,
  private breadcrumService: BreadcrumbService,
  private basketService: BasketService) {}

  ngOnInit(): void {
    this.breadcrumService.set('@productDetails', 'Loading...');
    this.loadProduct();
  }
  
  loadProduct(): void {
    const productId: number = (+this.route.snapshot.paramMap.get('id'));
    this.shopService.getProduct(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.breadcrumService.set('@productDetails', product.name);
      },
      error: (error: any) => console.log(error)
    });
  }


  onIncreamentItem(): void {
    this.quantity++;
  }

  onDecreamentItem(): void {
    if(this.quantity > 1)
      this.quantity--;
  }

  onAddItemToBasket(): void {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
}
