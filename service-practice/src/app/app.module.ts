import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { ActiveUserComponent } from './active-users/active-user/active-user.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { InactiveUserComponent } from './inactive-users/inactive-user/inactive-user.component';
import {CounterService} from './counter.service';

@NgModule({
  declarations: [
    AppComponent,
    ActiveUsersComponent,
    ActiveUserComponent,
    InactiveUsersComponent,
    InactiveUserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
