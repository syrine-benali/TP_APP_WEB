import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-services';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // If the user is logged in (signal), allow activation
  if (auth.isLoggedIn()) return true;

  // Otherwise redirect to the login page and preserve the attempted URL
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
