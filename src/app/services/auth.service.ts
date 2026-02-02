import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);
  private isAdminSignal = signal(false);

  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly isAdmin = this.isAdminSignal.asReadonly();

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSignal.set(value);
  }

  setAdmin(value: boolean) {
    this.isAdminSignal.set(value);
  }
}
