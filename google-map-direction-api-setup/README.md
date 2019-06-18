# google-map-direction-api-setup
This angular app shows directions between two locations on google map by calling Google Map API and Google Direction API. The estimated time of arrival is also given. See the app [in action](https://map-direction-api-setup.firebaseapp.com/).

## Set up Google API
At “Google cloud platform” -> “Create new project”:\
`Name: angular google map module`\
`Bill Account: (Need to attach billing card info for unlimited map loads)`

Choose the created project, “APIs & Services” -> “Credential”, “Create Credentials” -> “API key”, and an API is created.  

Under “APIs & Services” -> “Dashboard”, “Enable API & Services”, search “Google map”, Choose “Maps Javascript API”, “Enable”. Then go to “Quotas”, make sure “map loads per day” is unlimited. If not, update billing info and refresh.

Then under “APIs & Services” -> “Dashboard”, “Enable API & Services”, search “Directions API”, “Enable”. Then go to “Quotas”, make sure “map loads per day” is unlimited.

Detailed step follows DesignCourse “Angular 7 Google Maps Tutorial with IPAPI (Plotting a User's Location)”, [YouTube](https://www.youtube.com/watch?v=-IwTQgKIjCQ), 18min. Or follow Google document “Get an API Key”, [link](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Create the project from scratch
Create the project, and install google map API and bootstrap from NPM.
```
ng new google-map-direction-api-setup
npm install bootstrap
npm install --save @agm/core
npm install --save agm-direction
```
Import the bootstrap CSS
```
@import '~bootstrap/dist/css/bootstrap.min.css';
```
In "app.module.ts"
```
...
import { HttpClientModule } from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction'

@NgModule({
  ...
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY'
    }),
    AgmDirectionModule
  ], 
})
export class AppModule {}
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
      <h5>Destination: {{ destination }}</h5>
      <h5>Current location: {{ origin }}</h5>
      <h5>Estimate of arrival: {{ duration }}</h5>
    </div>
  </div>
</div>
```
In "app.component.css"
```
agm-map {
  height: 350px;
}
```
In "app.component.ts"
```
export class AppComponent implements OnInit {
  public lat: number = 29.8738;
  public lng: number = -95.5233;

  public origin: string;
  public destination: string;

  duration: string = 'null';

  ngOnInit() {
    this.origin = '2267 West Sam Houston Pkwy N, Houston, TX 77043';
    this.destination = '303 Memorial City Way, Houston, TX 77024';
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
```

## Reference
A list of input and output of “agm-direction” can be found at “Agm-Direction”, , [link](https://robby570.tw/Agm-Direction-Docs/index.html).
