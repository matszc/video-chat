import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class VcMessageService {

  constructor(
    private messageService: MessageService
  ) { }

  success(message: string): void {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message})
  }

  warning(message: string): void {
    this.messageService.add({severity: 'warn', summary: 'Warning', detail: message})
  }

  error(message: string): void {
    this.messageService.add({severity: 'Error', summary: 'Error', detail: message})
  }

  info(message: string): void {
    this.messageService.add({severity: 'Info', summary: 'Info', detail: message})
  }
}
