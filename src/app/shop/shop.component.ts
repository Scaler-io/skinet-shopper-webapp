import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductSpecParams } from '../shared/models/productSpecParams';
import { ProductType } from '../shared/models/productType';
import { SortOption } from '../shared/models/sortOption';
import { ShopService } from './shop.service';

@Component({
  selector: 'skinet-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: Product[];
  brands: Brand[];
  types: ProductType[];
  shopParams = new ProductSpecParams();
  totalProductCount: number;
  sortOptions: SortOption[] = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams)
    .subscribe({
      next: (response: Pagination<Product>) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalProductCount = response.count;
      },
      error: (error: any) => console.log(error)
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response: Brand[]) => this.brands = [{id: 0, name: 'All'}, ...response],
      error: (error: any) => console.log(error)
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response: ProductType[]) => this.types = [{id: 0, name: 'All'}, ...response],
    });
  }

  onBrandSelect(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelect(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelect(sort: string) : void{
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChange(pageNumber: number): void {
    if(pageNumber !== this.shopParams.pageNumber){
      this.shopParams.pageNumber = pageNumber;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ProductSpecParams();
    this.getProducts(); 
  }
}
