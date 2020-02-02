import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';

/**
 * Navigate menu to switch among welcome page, recipe page, shopping list, and authentication page. After authenticated, interact with user to fetch/save recipe data from server, or to log out.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * status flag for user authentication status
   */
  isAuthenticated = false;
  /**
   * if navigation menu is folded
   */
  isToggled = true;
  /**
   * subscription pointer for user status check to unsubscribe when away from the page
   */
  private userSub: Subscription;

  /**
   * constructor injects user authentication service and data storage service
   * @param authService
   * @param dataStorageService
   */
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  /**
   * when loading, subscribe to any user authentication status check
   */
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  /**
   * respond to logout button and log out the user
   */
  onLogout() {
    this.authService.logout();
  }

  /**
   * response to "Save Data" button and save recipe data to database through API
    */
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  /**
   * response to "Save Data" button and fetch recipe data from database through API
   */
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  /**
   * unsubscribe to user authentication status change when component destroyed
   */
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
