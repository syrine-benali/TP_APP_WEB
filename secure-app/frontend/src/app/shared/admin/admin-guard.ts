import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth-services';

/**
 * Guard for admin-only routes.
 * If the current user is admin -> allow. Otherwise redirect to /home.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // If the current user is an admin, allow activation
  if (auth.isAdmin()) return true;

  // Otherwise redirect to home
  return router.createUrlTree(['/home']);
};
