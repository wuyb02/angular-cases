import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, take} from 'rxjs/operators';

import {AuthService} from './auth.service';

/**
 * The interceptor modifies all http request header by including an unexpired user token
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  /**
   * Constructor injects the user authentication service, AuthService
   * @param authService
   */
  constructor(private authService: AuthService) {}

  /**
   * The intercept function modifies the http request header by including an unexpired user token
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
