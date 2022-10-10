import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ClickOutSideDirective } from './clickOutside.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent, ClickOutSideDirective],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule,
    ClickOutSideDirective,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShareModule {}
