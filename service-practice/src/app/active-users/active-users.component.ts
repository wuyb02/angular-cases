import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';

/**
 * list active user info and interact with client to set user to inactive. Detailed functions include:
 *
 * - Inject UsersService to initialize local users array.
 * - Property binding to feed user name and index to ActiveUserComponent and host a list of ActiveUserComponent.
 * - Event binding to listen to ActiveUserComponent’s request to set one user to inactive and get the user index.
 * - Inject UsersService to set the user to inactive.
 */
@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  /**
   * Local user array to store user names
   */
  users: string[];
  /**
   * Local counter for number of "active -> inactive" operations
   */
  nOpActiveToInactive: number = 0;

  /**
   * Inject UsersService to store user data and change user status
   * @param usersService
   */
  constructor(private usersService: UsersService) { }

  /**
   * Initialze local user arrays from UsersService
   */
  ngOnInit() {
    this.users = this.usersService.activeUsers;
  }

  /**
   * Use UsersService to change user status to inactive and increase "active -> inactive" operation number by 1
   * @param userIndex
   */
  onRequestSetUserToInactive(userIndex: number) {
    console.log('active to inactive: ' + userIndex);
    this.nOpActiveToInactive = this.usersService.setUserToInactive(userIndex);
  }
}
