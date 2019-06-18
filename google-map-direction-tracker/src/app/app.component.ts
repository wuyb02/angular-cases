import {Component, OnDestroy, OnInit} from '@angular/core';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import {Observer, Subscription, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public lat: number = 29.8738;
  public lng: number = -95.5233;

  private step_index: number = 0;
  private origins: string[] = [
    '2267 West Sam Houston Pkwy N, Houston, TX 77043',
    '1100 Lumpkin Rd, Houston, TX 77043',
    '901 Gessner Rd, Houston, TX 77024',
    '303 Memorial City Way, Houston, TX 77024'
  ];

  public origin: any;
  public destination: any;

  customObsSubscription: Subscription;

  duration: string = 'null';

  ngOnInit() {
    // this.origin = '2267 West Sam Houston Pkwy N, Houston, TX 77043';
    this.step_index = 0;
    this.origin = this.origins[this.step_index];
    this.destination = '303 Memorial City Way, Houston, TX 77024';

    const myObservable: Observable<number> = new Observable(
      (observer: Observer<number>) => {
        setTimeout(()=>{observer.next(1);}, 5000);
        setTimeout(()=>{observer.next(2);}, 10000);
        setTimeout(()=>{observer.next(3);}, 15000);
        // setTimeout(()=>{observer.error('this does not work');}, 5000);
      }
    );
    this.customObsSubscription = myObservable.subscribe(
      (data: number) => {
        console.log(data)
        this.step_index = data;
        this.origin = this.origins[this.step_index];
      },
    );
  }

  getDirection() {
    // this.origin = { lat: 24.799448, lng: 120.979021 };
    // this.destination = { lat: 24.799524, lng: 120.975017 };

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

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
  }
}
