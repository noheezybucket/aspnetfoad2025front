import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('user');

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
