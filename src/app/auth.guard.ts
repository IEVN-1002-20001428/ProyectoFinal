import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userType = this.authService.getUserType();
    const allowedRoles = (route.data as { allowedRoles: string[] }).allowedRoles;

    if (allowedRoles && allowedRoles.includes(userType)) {
      // El tipo de usuario tiene permiso para acceder a la ruta
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
