import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public lat: number = 29.8738;
  public lng: number = -95.5233;

  public origin: any;
  public destination: string;

  duration: string = 'null';

  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
    origin: {
      icon: 'https://cdn3.iconfinder.com/data/icons/fatcow/32x32_0200/car_add.png',
      draggable: true,
    },
    destination: {
      icon: 'https://cdn0.iconfinder.com/data/icons/hamburg/32/home.png',
      opacity: 0.8,
    },
  };

  ngOnInit() {
    //this.origin = '2267 West Sam Houston Pkwy N, Houston, TX 77043';
    this.destination = '303 Memorial City Way, Houston, TX 77024';

    if (window.navigator && window.navigator.geolocation) {
//      window.navigator.geolocation.getCurrentPosition(
//        position => {
//          //this.geolocationPosition = position;
//          this.origin = { lat: position.coords.latitude, lng: position.coords.longitude};
//          console.log(position)
//        },
//        error => {
//          switch (error.code) {
//            case 1:
//              console.log('Permission Denied');
//              break;
//            case 2:
//              console.log('Position Unavailable');
//              break;
//            case 3:
//              console.log('Timeout');
//              break;
//          }
//        }
//      );
      window.navigator.geolocation.watchPosition(
        position => {
          //this.geolocationPosition = position;
          this.origin = { lat: position.coords.latitude, lng: position.coords.longitude};
          console.log(position)
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  public onResponse(response: any){
    console.log(response.routes[0]['legs'][0]);
    if(response.routes[0].legs[0].duration.value<1)
    {
      this.duration = 'Arrived';
    } else {
      this.duration = response.routes[0].legs[0].duration.text;
    }
  }
}
