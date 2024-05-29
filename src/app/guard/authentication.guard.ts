import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if (localStorage.getItem('LoginToken')) return true;
  else {
    _Router.navigate(['/login']);
    return false;
  }
};
