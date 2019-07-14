import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * show the user name of the inactive user, and interact with client to send request to set the user to active. Detailed functions include:
 *
 * - Property binding to get user name and index.
 * - Display user name, and a link to interact with client.
 * - When the link clicked, Event binding to send request to set the user to active and emit the user index.
 */
@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent {
  /**
   * Name of the user that is set by property binding
   */
  @Input() userName: string;
  /**
   * Index of the user that is set by property binding
   */
  @Input() index: number;
  /**
   * Event binding to emit user index
   */
  @Output() requestSetUserToActive = new EventEmitter<number>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Trigger the event binding when the link is clicked
   */
  onLinkClickUserToActive() {
    this.requestSetUserToActive.emit(this.index);
  }
}
