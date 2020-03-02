import { WeatherComponent } from './openweather/weather/weather.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Checks if user is logged in during routing. If not -> redirect to login page
 */
export class LoginActivate implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.loggedIn) {
      this.router.navigate(['login']);
    }
    return true;
  }
}


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'weather',
    loadChildren: () => import('./openweather/openweather.module').then(m => m.OpenweatherModule), canActivate: [LoginActivate]},
  { path: '**', component: WeatherComponent, canActivate: [LoginActivate] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

