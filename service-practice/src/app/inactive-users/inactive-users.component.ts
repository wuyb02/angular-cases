import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';

/**
 * list inactive user info and interact with client to set user to active. Detailed functions include:
 *
 * - Inject UsersService to initialize local users array.
 * - Property binding to feed user name and index to InactiveUserComponent and host a list of InactiveUserComponent.
 * - Event binding to listen to InactiveUserComponent’s request to set one user to active and get the user index.
 * - Inject UsersService to set the user to active.
 */
@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  /**
   * Local user array to store user names
   */
  users: string[];
  /**
   * Local counter for number of "inactive -> active" operations
   */
  nOpInactiveToActive: number = 0;

  /**
   * Inject UsersService to store user data and change user status
   * @param usersService
   */
  constructor(private usersService: UsersService) { }

  /**
   * Initialze local user arrays from UsersService
   */
  ngOnInit() {
    this.users = this.usersService.inactiveUsers;
  }

  /**
   * Use UsersService to change user status to active and increase "inactive -> active" operation number by 1
   * @param userIndex
   */
  onRequestSetUserToActive(userIndex: number) {
    console.log('inactive to active: ' + userIndex);
    this.nOpInactiveToActive = this.usersService.setUserToActive(userIndex);
  }
}
