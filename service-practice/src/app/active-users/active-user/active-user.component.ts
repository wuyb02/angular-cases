import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * show the user name of the active user, and interact with client to send request to set the user to inactive. Detailed functions include:
 *
 * - Property binding to get user name and index.
 * - Display user name, and a link to interact with client.
 * - When the link clicked, Event binding to send request to set the user to inactive and emit the user index.
 */
@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent {
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
  @Output() requestSetUserToInactive = new EventEmitter<number>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Trigger the event binding when the link is clicked
   */
  onLinkClickUserToInactive() {
    this.requestSetUserToInactive.emit(this.index);
  }
}
