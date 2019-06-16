import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  latitude: number = 29.8627;
  longitude: number = -95.5846;
  infoWindowText: string = 'Location based on latitude and longitude.';
}
