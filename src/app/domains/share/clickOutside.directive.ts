import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { fromEvent, filter, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutSideDirective implements OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();
  clickOutsideSubscription: Subscription;
  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.clickOutsideSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((e) => {
          return !this.isInside(e.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
  ngOnDestroy(): void {
    this.clickOutsideSubscription?.unsubscribe();
  }
}
