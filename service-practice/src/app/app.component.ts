import { Component } from '@angular/core';
import {UsersService} from './users.service';

/**
 * Host ActiveUsersComponent and InactiveUsersComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
}
