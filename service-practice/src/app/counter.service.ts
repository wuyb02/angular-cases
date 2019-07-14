import { Injectable } from '@angular/core';

/**
 * count the operations of user status switch.
 */
@Injectable()
export class CounterService {
  /**
   * number of "active -> inactive" operations
   */
  nOpActiveToInactive: number = 0;
  /**
   * number of "inactive -> active" operations
   */
  nOpInactiveToActive: number = 0;

  /**
   * @ignore
   */
  constructor() { }
}
