# google-map-api-setup
This angular app marks a location on google map by calling Google Map API. See the app [in action](https://map-api-setup.firebaseapp.com/).\
We explain step-by-step on setting up Google API and getting a token to enable Angular code to display a google map with a location marker.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.\

## Set up Google API
At “Google cloud platform” -> “Create new project”:\
`Name: angular google map module`\
`Bill Account: (Need to attach billing card info for unlimited map loads)`

Choose the created project, “APIs & Services” -> “Credential”, “Create Credentials” -> “API key”, and an API is created.  

Under “APIs & Services” -> “Dashboard”, “Enable API & Services”, search “Google map”, Choose “Maps Javascript API”, “Enable”. Then go to “Quotas”, make sure “map loads per day” is unlimited. If not, update billing info and refresh.

Detailed step follows DesignCourse “Angular 7 Google Maps Tutorial with IPAPI (Plotting a User's Location)”, [YouTube](https://www.youtube.com/watch?v=-IwTQgKIjCQ), 18min. Or follow Google document “Get an API Key”, [link](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Create the project from scratch
Create the project, and install google map API and bootstrap from NPM.
```
ng new google-map-api-setup
npm install bootstrap
npm install --save @agm/core
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

@NgModule({
  ...
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY'
    })
  ], 
})
export class AppModule {}
```
In "app.component.html"
```
<div class="container-fluid">
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <agm-map [latitude]='latitude' [longitude]='longitude' >
        <agm-marker [latitude]='latitude' [longitude]='longitude'>
          <agm-info-window> {{ infoWindowText }}</agm-info-window>
        </agm-marker>
      </agm-map>
    </div>
  </div>
</div>
```
In "app.component.css"
```
agm-map {
  height: 300px;
}
```
In "app.component.ts"
```
export class AppComponent {
  latitude: number = 29.8627;
  longitude: number = -95.5846;
  infoWindowText: string = 'Location based on latitude and longitude.';
}
```

## Reference
A list of Inputs and Outputs of “agm-map” can be found at “Components AgmMap”, [link](https://angular-maps.com/api-docs/agm-core/components/agmmap).
