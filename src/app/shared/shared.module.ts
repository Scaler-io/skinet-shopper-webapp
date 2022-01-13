import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CdkStepperModule } from '@angular/cdk/stepper'

import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { PrependRupeeSymbolPipe } from './pipes/prepend-rupee-symbol.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StepperComponent } from './components/stepper/stepper.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginatorComponent,
    OrderSummeryComponent,
    PrependRupeeSymbolPipe,
    ErrorMessageComponent,
    TextInputComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule
  ],
  exports: [
    // modules
    PaginationModule,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule,
    
    // components
    PagingHeaderComponent,
    PaginatorComponent,
    OrderSummeryComponent,
    PrependRupeeSymbolPipe,
    ErrorMessageComponent,
    TextInputComponent,
    StepperComponent
  ]
})
export class SharedModule { }
