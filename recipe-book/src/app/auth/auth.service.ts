import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {User} from './user.model';

/**
 * the model for user info of http response
 */
export interface AuthResponseData {
  /**
   * @ignore
   */
  kind: string;
  /**
   * token
   */
  idToken: string;
  /**
   * user email
   */
  email: string;
  /**
   * @ignore
   */
  refreshToken: string;
  /**
   * expiration data in string
   */
  expiresIn: string;
  /**
   * @ignore
   */
  localId: string;
  /**
   * @ignore
   */
  registered?: boolean;
}

/**
 * The service handles user authentication, including sign up, log in, log out, auto log out when token expired, and auto log in with unexpired token.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Observable for authentication status
   */
  user = new BehaviorSubject<User>(null);
  /**
   * A timer for token expiration
   */
  private tokenExpirationTimer: any;

  /**
   * Constructor injects HttpClient service and Router service.
   * @param http
   * @param router
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Calls user authentication API and sign up a user
   * @param email
   * @param password
   */
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAR1c1D8U0n2sI33FH-0QKztWf3RuYqi5I',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * Calls user authentication API and login a user
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR1c1D8U0n2sI33FH-0QKztWf3RuYqi5I',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * check if the LocalStorage has an unexpired token. If so, auto login.
   * The function auto logs in, when e.g. the page is refreshed, accidentally or during development
   */
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  /**
   * Log out and remove local token info in local Storage
   */
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Auto log out when token expires
   * @param expirationDuration
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  /**
   * The function groups shared operation of "signup" and "login" functions when API responses.
   * The shared operations include creating a user object to store authentication info, trigger user authentication status change, starting expiration timer, storage token in local storage.
   * @param email
   * @param userId
   * @param token
   * @param expiresIn
   */
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * The function groups shared error handling of "signup" and "login" functions when API responses.
   * The shared error handling includes converting different error code into readable error message.
   * @param errorRes
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
