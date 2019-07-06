import {Component, Input, OnInit} from '@angular/core';

/**
 * Use property binding to get a number and display the number.
 */
@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {

  /**
   * Number that is set by property binding
   */
  @Input() num: number;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
