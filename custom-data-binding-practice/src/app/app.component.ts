import { Component } from '@angular/core';

/**
 * Use Event Binding to receive number from GameControlComponent, and save into arrays.
 * Use Property Binding to feed values of the arrays to OddComponent or EvenComponent.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Number array to hold odd numbers
   */
  oddNumbers: number[] = [];
  /**
   * Number array to hold even numbers
   */
  evenNumbers: number[] = [];

  /**
   * Save the number into odd or even number array.
   *
   * @param {number} num
   */
  onNumberCountedUp(num: number) {
    if(num%2===0) {
      this.evenNumbers.push(num);
      // console.log('even number');
      // console.log(this.evenNumbers);
    } else {
      this.oddNumbers.push(num);
      // console.log('odd number');
      // console.log(this.oddNumbers);
    }
  }
}
