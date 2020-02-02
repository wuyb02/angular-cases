import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

/**
 * User authentication component, including sign up and log in.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  /**
   * switch between "log in" or "sign up" mode
   */
  isLoginMode = true;
  /**
   * true if waiting for response from authentication API
   */
  isLoading = false;
  /**
   * error message
   */
  error: string = null;

  /**
   * form object
   */
  @ViewChild('f', {static: false}) form: NgForm;

  /**
   * constructor injects user authentication service and Router service.
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Calls user authentication API: If authorized, login the user, and if unautherized, give the error message
   */
  onSubmit() {
    this.isLoading = true;
    this.error = null;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoginMode) {
      authObs = this.authService.login(this.form.value.email, this.form.value.password);
    } else {
      authObs = this.authService.signup(this.form.value.email, this.form.value.password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
