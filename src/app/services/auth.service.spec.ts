import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { PLATFORM_ID } from '@angular/core';
import { AUTH_STORAGE_KEYS, AUTH_STORAGE_VALUES } from '../core/auth.constants';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(AuthService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should set authenticated and store in sessionStorage', () => {
    service.setAuthenticated(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBe(
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
  });

  it('should remove from sessionStorage when setAuthenticated(false)', () => {
    service.setAuthenticated(true);
    service.setAuthenticated(false);

    expect(service.isAuthenticated()).toBe(false);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
  });

  it('should set admin and store in sessionStorage', () => {
    service.setAdmin(true);
    expect(service.isAdmin()).toBe(true);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBe(
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
  });

  it('should remove admin from sessionStorage when setAdmin(false)', () => {
    service.setAdmin(true);
    service.setAdmin(false);

    expect(service.isAdmin()).toBe(false);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBeNull();
  });

  it('should clear both on logout', () => {
    service.setAuthenticated(true);
    service.setAdmin(true);

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.isAdmin()).toBe(false);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBeNull();
  });

  it('should only remove TOKEN key when setAuthenticated(false)', () => {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, AUTH_STORAGE_VALUES.AUTHENTICATED);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.ADMIN, AUTH_STORAGE_VALUES.AUTHENTICATED);

    service.setAuthenticated(false);

    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBe(
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
  });

  it('should only remove ADMIN key when setAdmin(false)', () => {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, AUTH_STORAGE_VALUES.AUTHENTICATED);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.ADMIN, AUTH_STORAGE_VALUES.AUTHENTICATED);

    service.setAdmin(false);

    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBe(
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBeNull();
  });

  it('should persist authenticated state on page reload', () => {
    service.setAuthenticated(true);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    const reloadedService = TestBed.inject(AuthService);

    expect(reloadedService.isAuthenticated()).toBe(true);
  });

  it('should persist admin state on page reload', () => {
    service.setAdmin(true);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    const reloadedService = TestBed.inject(AuthService);

    expect(reloadedService.isAdmin()).toBe(true);
  });

  it('should allow authenticated without admin', () => {
    service.setAuthenticated(true);
    service.setAdmin(false);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isAdmin()).toBe(false);
  });

  it('should handle rapid state changes', () => {
    service.setAuthenticated(true);
    service.setAdmin(true);
    service.setAuthenticated(false);
    service.setAdmin(false);
    service.setAuthenticated(true);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isAdmin()).toBe(false);
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBe(
      AUTH_STORAGE_VALUES.AUTHENTICATED
    );
    expect(sessionStorage.getItem(AUTH_STORAGE_KEYS.ADMIN)).toBeNull();
  });
});
