import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['agm-map { height: 300px; /* height is required */ }']
})
export class AppComponent {
  latitude = 29.8627;
  longitude = -95.5846;
  mapType = 'satellite';
}
