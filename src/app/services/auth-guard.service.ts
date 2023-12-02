import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import {map, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (isAuth) {
        if (user?.roles.includes(route.data['role'])) return true;
        else if (user?.roles.includes('Admin')) return this.router.createUrlTree(['/admin-dashboard']);
        else if (user?.roles.includes('Customer')) return this.router.createUrlTree(['/dashboard']);
      }
      return this.router.createUrlTree(['/login']);
    }))
  }

}
