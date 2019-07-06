import {Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * Interact with user to start and stop counting.
 * Use Event binding to emit the number with each count up.
 */
@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  /**
   * Event-binding to emit the number with each count up
   */
  @Output() numberCountedUp = new EventEmitter<number>();

  /**
   * The number that is counted up, starting from 1.
   */
  currentNum: number = 1;
  /**
   * Flag to show if the counting is started.
   */
  isCountStarted: boolean = false;
  /**
   * Interval that is triggered every a second
   */
  interval: number;


  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Start or Stop counting when user clicks the button
   *
   */
  onGameControl() {
    if(this.isCountStarted===false) {
      this.interval = setInterval(() => {
        this.numberCountedUp.emit(this.currentNum);
        console.log(this.currentNum);
        this.currentNum++;
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
    this.isCountStarted = !this.isCountStarted;
  }
}
