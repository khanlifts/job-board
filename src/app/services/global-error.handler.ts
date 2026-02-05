import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router = inject(Router);
  private isDev = isDevMode();

  handleError(error: Error | any): void {
    this.logErrorToConsole('Global Error Handler', error);

    if (error instanceof TypeError) {
      this.logErrorToConsole('TypeError', error);
    } else if (error instanceof ReferenceError) {
      this.logErrorToConsole('ReferenceError', error);
    } else {
      this.logErrorToConsole('Unknown error', error);
    }

    this.logToServer(error);

    if (this.isCriticalError(error)) {
      this.router.navigate(['/error', 500], {
        state: { message: 'An unexpected error occured. Please try again later.' }
      });
    }
  }

  private logErrorToConsole(type: string, error: Error): void {
    if (this.isDev) {
      console.error(`[${type}]`, error);
    }
  }

  private logToServer(error: Error): void {
    console.log(`[Error] ${error.message}`);
    console.log(`Stack: ${error.stack}`);
  }

  private isCriticalError(error: Error): boolean {
    const criticalErrors = ['NullPointerException', 'OutOfMemory'];
    return criticalErrors.some(criticalError => error.message.includes(criticalError));
  }
}
