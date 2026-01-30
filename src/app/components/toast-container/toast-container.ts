import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';

@Component({
  selector: 'toast-container',
  standalone: true,
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
  imports: [CommonModule]
})
export class ToastContainer {
  toastService = inject(ToastService);

  getToasts(): Toast[] {
    return this.toastService.toasts();
  }

  removeToast(id: string): void {
    this.toastService.removeToast(id);
  }

  getIcon(type: Toast['type']) {
    const icons: Record<Toast['type'], string> = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    }

    return icons[type];
  }
}
