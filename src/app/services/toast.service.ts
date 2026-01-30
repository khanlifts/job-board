import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSignal = signal<Toast[]>([]);
  readonly toasts = this.toastSignal.asReadonly();

  success(message: string, duration: number = 3000) {
    this.addToast(message, 'success', duration);
  }

  error(message: string, duration: number = 4000) {
    this.addToast(message, 'error', duration);
  }

  info(message: string, duration: number = 3000) {
    this.addToast(message, 'info', duration);
  }

  warning(message: string, duration: number = 3000) {
    this.addToast(message, 'warning', duration);
  }

  private addToast(message: string, type: Toast['type'], duration: number) {
    const id = crypto.randomUUID();
    const toast: Toast = { id, message, type, duration };

    this.toastSignal.update(toasts => toasts.concat(toast));

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id: string) {
    this.toastSignal.update(toasts =>
      toasts.filter(toast => toast.id !== id)
    )
  }
}
