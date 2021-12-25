import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavBarComponent} from './ui/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './ui/test-error/test-error.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { ServerErrorComponent } from './ui/server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr';
import { SectionHeaderComponent } from './ui/section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';


@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
