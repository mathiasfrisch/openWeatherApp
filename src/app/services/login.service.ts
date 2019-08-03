import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * the service checks user name and password. If correct credentials are present, they are
 * stored in local storage
 */
export class LoginService {

  public loggedIn: boolean;

  constructor() {
    this.loggedIn = localStorage.getItem('loggedin') ? true : false;
  }

  public login(user: string, password: string): void {
    this.loggedIn = user === 'user' && password === 'weather';
    if (this.loggedIn) {
      localStorage.setItem('loggedin', 'true');
    }
  }

  public logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedin');
  }
}
