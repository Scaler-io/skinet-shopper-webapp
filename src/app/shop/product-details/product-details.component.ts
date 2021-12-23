import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private shopService: ShopService,
    private route: ActivatedRoute,
    private bradcrumService: BreadcrumbService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    var productId = (+this.route.snapshot.paramMap.get('id'));
    this.shopService.getProduct(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.bradcrumService.set('@productDetails', product.name);
      },
      error: (error: any) => console.log(error)
    });
  }

}