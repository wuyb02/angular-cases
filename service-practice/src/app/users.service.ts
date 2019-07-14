import { Injectable } from '@angular/core';
import {CounterService} from './counter.service';

/**
 * store user info, provide methods to change user status, and (by injecting CountService) count the operations of user status switch.
 */
@Injectable()
export class UsersService {
  /**
   * array to store active user info
   */
  activeUsers: string[] = ['Tom', 'Kate', 'Kevin'];
  /**
   * array to store inactive user info
   */
  inactiveUsers: string[] = ['Jason', 'Ted'];

  /**
   * Inject CounterService to keep track of number of operations of status change
   * @param counterService CounterService to keep track of number of operations of status change
   */
  constructor(private counterService: CounterService) { }

  /**
   * Set the user of the given index to active, and increase the number of "inactive -> active" operations by 1
   * @param index user index
   * @returns the updated number of "inactive -> active" operations
   */
  setUserToActive(index: number): number {
    this.activeUsers.push(this.inactiveUsers[index]);
    this.inactiveUsers.splice(index, 1);
    this.counterService.nOpInactiveToActive += 1;
    return this.counterService.nOpInactiveToActive;
  }

  /**
   * Set the user of the given index to inactive, and increase the number of "active -> inactive" operations by 1
   * @param index user index
   * @returns the updated number of "active -> inactive" operations
   */
  setUserToInactive(index: number): number {
    this.inactiveUsers.push(this.activeUsers[index]);
    this.activeUsers.splice(index, 1);
    this.counterService.nOpActiveToInactive += 1;
    return this.counterService.nOpActiveToInactive;
  }
}
