import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';     // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: environment.googleMapAPIKey,
    }),
    AgmDirectionModule,     // agm-direction
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
