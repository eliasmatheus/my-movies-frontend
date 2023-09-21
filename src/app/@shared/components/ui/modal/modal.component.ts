import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input({ required: true }) modalTitle: string;
  @Output() close = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }
}
