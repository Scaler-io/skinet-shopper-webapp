import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { HomeModule } from './home/home.module';
import { ConfirmAuthorityInterceptor } from './core/interceptors/confirm-authority.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule, 
    BrowserAnimationsModule, 
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ConfirmAuthorityInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
