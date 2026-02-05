import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AUTH_STORAGE_KEYS, AUTH_STORAGE_VALUES } from '../core/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private isAuthenticatedSignal = signal<boolean>(
    this.loadAuthState()
  );
  private isAdminSignal = signal(this.loadAdminState());

  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly isAdmin = this.isAdminSignal.asReadonly();

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSignal.set(value);
    this.updateStorage(AUTH_STORAGE_KEYS.TOKEN, value);
  }

  setAdmin(value: boolean): void {
    this.isAdminSignal.set(value);
    this.updateStorage(AUTH_STORAGE_KEYS.ADMIN, value);
  }

  logout(): void {
    this.setAuthenticated(false);
    this.setAdmin(false);
  }

  private updateStorage(key: string, value: boolean): void {
    if (!this.isBrowser) return;

    if (value) {
      sessionStorage.setItem(key, AUTH_STORAGE_VALUES.AUTHENTICATED);
    } else {
      sessionStorage.removeItem(key);
    }
  }

  private loadAuthState(): boolean {
    if (!this.isBrowser) return false;
    return (
      sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN) ===
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
  }

  private loadAdminState(): boolean {
    if (!this.isBrowser) return false;
    return (
      sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN) ===
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
  }
}
