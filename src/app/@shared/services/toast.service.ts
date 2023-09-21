import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(message: string, title?: string) {
    this.messageService.add({
      severity: 'success',
      summary: title ?? 'Success',
      detail: message,
    });
  }

  error(message: string, title?: string) {
    this.messageService.add({
      severity: 'error',
      summary: title ?? 'Error',
      detail: message,
    });
  }

  info(message: string, title?: string) {
    this.messageService.add({
      severity: 'info',
      summary: title ?? 'Info',
      detail: message,
    });
  }

  warn(message: string, title?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: title ?? 'Warn',
      detail: message,
    });
  }
}
