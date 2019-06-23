import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisplayed: boolean = true;
  clickLogs: {timestamp: Date, num: number}[] = [];
  index: number = 1;

  onToggleDetails() {
    this.isDisplayed = !this.isDisplayed;

    this.clickLogs.push({
      timestamp: new Date(),
      num : this.index
    });
    this.index++;
    console.log(this.clickLogs);
  }
}
