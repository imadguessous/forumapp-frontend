import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuth()) {
      return true;
    } else {
      console.log('Auth Guard Service: UnAuthentificated User:');
      return this.router.navigate(['/not-authentificated']);
    }
  }
}
