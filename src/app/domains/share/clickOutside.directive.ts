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
  @Output() public clickOutside = new EventEmitter<void>();
  private clickOutsideSubscription: Subscription;

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

  public isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
  public ngOnDestroy(): void {
    this.clickOutsideSubscription?.unsubscribe();
  }
}
