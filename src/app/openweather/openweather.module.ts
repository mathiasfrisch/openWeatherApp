import { OpenweatherService } from './services/openweather.service';
import { LoginModule } from './../login/login.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LocationInputComponent } from './location-input/location-input.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    CurrentWeatherComponent,
    WeatherComponent,
    WeatherForecastComponent,
    LocationInputComponent
  ],
  providers: [
    OpenweatherService,
    httpInterceptorProviders
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTabsModule,
    LoginModule
  ]
})
export class OpenweatherModule { }
