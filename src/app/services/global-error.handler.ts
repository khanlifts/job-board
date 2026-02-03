import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);

  handleError(error: Error | any): void {
    this.logErrorIfDev(error);

    if (error instanceof TypeError) {
      this.handleTypeError(error);
    } else if (error instanceof ReferenceError) {
      this.handleReferenceError(error);
    } else {
      this.handleUnknownError(error);
    }

    if (this.isCriticalError(error)) {
      this.router.navigate(['/error', 500], {
        state: { message: 'An unexpected error occured. Please try again later.' }
      });
    }
  }

  private logErrorIfDev(error: Error): void {
    if (isDevMode()) {
      console.error('Global Error Handler', error);
    }
  }

  private handleTypeError(error: TypeError): void {
    if (isDevMode()) {
      console.error('TypeError', error);
    }
    this.logError('TypeError', error);
  }

  private handleReferenceError(error: ReferenceError): void {
    if (isDevMode()) {
      console.error('ReferenceError', error);
    }
    this.logError('ReferenceError', error);
  }

  private handleUnknownError(error: Error): void {
    if (isDevMode()) {
      console.error('Unknown error:', error);
    }
    this.logError('Unknown Error', error);
  }

  private isCriticalError(error: Error): boolean {
    const criticalErrors = ['NullPointerException', 'OutOfMemory'];
    return criticalErrors.some(criticalError => error.message.includes(criticalError));
  }

  private logError(errorType: string, error: Error): void {
    console.log(`[${errorType}] ${error.message}`);
    console.log(`Stack: ${error.stack}`);
  }
}
