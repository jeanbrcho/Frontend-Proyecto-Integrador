import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard → isLoggedIn:', authService.isLoggedIn());

  if (!authService.isLoggedIn()) {
    alert('Debes iniciar sesión para sacar un turno.');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
