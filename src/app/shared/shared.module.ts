import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';


import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { PrependRupeeSymbolPipe } from './pipes/prepend-rupee-symbol.pipe';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginatorComponent,
    OrderSummeryComponent,
    PrependRupeeSymbolPipe
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    // modules
    PaginationModule,
    CarouselModule,

    // components
    PagingHeaderComponent,
    PaginatorComponent,
    OrderSummeryComponent,
    PrependRupeeSymbolPipe
  ]
})
export class SharedModule { }
