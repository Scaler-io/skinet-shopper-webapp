import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavBarComponent} from './ui/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
