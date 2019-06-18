import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
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
