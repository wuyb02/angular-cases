import {Component, Input, OnInit} from '@angular/core';

/**
 * Use property binding to get a number and display the number.
 */
@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {

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
