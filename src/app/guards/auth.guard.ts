import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

let isAuthenticated = false;

export function setAuthentitaced(value: boolean) {
  isAuthenticated = value;
}

export const authGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/jobs']);
    return false;
  }
}
