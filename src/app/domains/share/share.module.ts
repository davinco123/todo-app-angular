import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ClickOutSideDirective } from './clickOutside.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, ClickOutSideDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [
    LoadingSpinnerComponent,
    CommonModule,
    ClickOutSideDirective,
    HttpClientModule,
  ],
})
export class ShareModule {}
