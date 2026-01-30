import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: Error | any): void {
    console.error('Global Error Handler', error);

    if (error instanceof TypeError) {
      console.error('TypeError', error);
      this.logError('TypeError', error);
    } else if (error instanceof ReferenceError) {
      console.error('ReferenceError', error);
      this.logError('ReferenceError', error);
    } else {
     console.error('Unknown error:', error);
     this.logError('Unknown Error', error);
    }

    if (this.isCriticalError(error)) {
      this.router.navigate(['/error', 500], {
        state: { message: 'An unexpected error occured. Please try again later.' }
      })
    }
  }

  private isCriticalError(error: Error): boolean {
    const criticalErrors = ['NullPointerException', 'OutOfMemory'];
    return criticalErrors.some(criticalError => error.message.includes(criticalError));
  }

  private logError(errorType: string, error: Error): void {
    console.log(`[${ errorType }] ${ error.message }`);
    console.log(`Stack: ${ error.stack }`);
  }
}
