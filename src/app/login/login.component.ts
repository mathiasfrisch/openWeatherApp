import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * gets user name and password from the input and calls the LoginService
 */
export class LoginComponent implements OnInit {

  public user: string;
  public password: string;
  public errorMessage: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    if (!this.user && !this.password) {
      return;
    }
    this.loginService.login(this.user, this.password);
    if (!this.loginService.loggedIn) {
      this.errorMessage = 'User name or password wrong';
    } else {
      this.router.navigate(['weather']);
    }
  }

}
