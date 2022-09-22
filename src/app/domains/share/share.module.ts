import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ClickOutSideDirective } from './clickOutside.directive';

@NgModule({
  declarations: [LoadingSpinnerComponent, ClickOutSideDirective],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, CommonModule, ClickOutSideDirective],
})
export class ShareModule {}
