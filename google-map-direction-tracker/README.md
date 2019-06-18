# google-map-track location
Track your current location on Google Map. Show in real time the path between your current location and the destination while you move. Customize the location marker. See the app [in action](https://map-track-location.firebaseapp.com/).

## Track current location
Your geolocation info is taken from the browser. A dialogue box will display to ask for permission. \
Refer to “google-map-direction-api-setup” for Google Map API and Google Direction API setup, and “app.module.ts”. \
In “app.component.ts”

```
  ngOnInit() {
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
```
In "app.component.html"
```
<div class="container-fluid">
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <agm-map [latitude]="lat" [longitude]="lng">
        <agm-direction
          [origin]="origin"
          [destination]="destination"
          (onResponse)="onResponse($event)" >
        </agm-direction>
      </agm-map>
      <h5>Client address: {{ destination }}</h5>
      <h5>Driver location: lattitude {{ origin.lat }}, longitude {{ origin.lng }}</h5>
      <h5>Estimate of arrival: {{ duration }}</h5>
    </div>
  </div>
</div>
```
## Customize location marker
Follow Customize location marker, “Agm-Direction”, [link](https://robby570.tw/Agm-Direction-Docs/source/featured/marker.html).\
“app.component.ts”
```
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
```
"app.component.html"
```
      <agm-map [latitude]="lat" [longitude]="lng">
        <agm-direction
          [origin]="origin"
          [destination]="destination"
          [renderOptions]="renderOptions"
          [markerOptions]="markerOptions"
          (onResponse)="onResponse($event)" >
        </agm-direction>
      </agm-map>
```
The icon picture is 32x32 pixels. In Google, search “house icon”, “Tools” -> “Size” -> “Exactly”, “32x32”.

## Reference
Angular location tracker: “Display and Track User’s current location using Google Map Geolocation in Angular 5”, [link](https://medium.com/@balramchavan/display-and-track-users-current-location-using-google-map-geolocation-in-angular-5-c259ec801d58).
