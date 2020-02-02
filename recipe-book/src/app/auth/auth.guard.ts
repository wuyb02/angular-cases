import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

/**
 * protect the recipe URL: Only accessible with user authentication; otherwise, re-direct to user authentication page.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * constructor injects user authentication service, and Router service.
   * @param authService
   * @param router
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * The recipe URL is only accessible after user authentication.
   * @param route
   * @param router
   */
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if(!!user) {
          return true;
        } else {
          return this.router.createUrlTree(['auth']);
        }
      })
    );
  }
}
