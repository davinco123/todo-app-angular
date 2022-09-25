import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertComponent {
  @Input() public message: string;
  @Output() public close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
