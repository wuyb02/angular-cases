import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: true}) signupForm: NgForm;
  summary: string = '';

  onSubmit() {
    console.log(this.signupForm.value.email);
    this.summary = "A user with email of " + this.signupForm.value.email + " subscribed as " + this.signupForm.value.subscription;
    console.log(this.summary);
  }
}
