import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

/**
 * Host HeaderComponent, and depending on the router link, the authentication/recipe/shopping list component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * the constructor injects AuthService for auto-login when app re-loaded
   * @param (AuthService) authService
   */
  constructor(private authService: AuthService) {}

  /**
   * When app is loaded, check if LocalStorage has unexpired token: if so, auto-log in.
   */
  ngOnInit() {
    this.authService.autoLogin();
  }
}
