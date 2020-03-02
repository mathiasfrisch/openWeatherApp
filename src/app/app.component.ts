import { LoginService } from './services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: LoginService, private router: Router) {

  }

  title = 'OpenWeather App';

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
