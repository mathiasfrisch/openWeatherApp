import { ILocation } from './../app.component';
import { WeatherDataFactory, WeatherData, WeatherForecast } from './../data-model/weather-data';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * stores the current location and fetches weather data from the openweathermal api
 */
export class OpenweatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private currentEndpoint = 'weather';
  private forecastEndpoint = 'forecast';
  private apiKey = '6caa095d7f4d0115b62893c483ad3c89';
  private locationSource = new Subject<ILocation>();
  public currentLocation = this.locationSource.asObservable();

  constructor(private http: Http) { }

  public changeLocation(location: ILocation) {
    this.locationSource.next(location);
  }

  public getCurrentWeather(city: string, countryCode?: string): Observable<WeatherData> {
    const location = countryCode ? city + ', ' + countryCode : city;
    return this.http.get(`${this.apiUrl}/${this.currentEndpoint}?q=${location}&APPID=${this.apiKey}`)
    .pipe(catchError(this.errorHandler))
    .pipe(map(resp => resp.json()))
    .pipe(map(result => {
      const weatherData = WeatherDataFactory.getWeatherData(result);
      return weatherData;
    }));

  }

  public getWeatherForecast(city: string, countryCode?: string): Observable<WeatherForecast> {
    const location = countryCode ? city + ', ' + countryCode : city;
    return this.http.get(`${this.apiUrl}/${this.forecastEndpoint}?q=${location}&mode=json&APPID=${this.apiKey}`)
    .pipe(catchError(this.errorHandler))
    .pipe(map(resp => resp.json()))
    .pipe(map(result => {
      const weatherData = WeatherDataFactory.getForecastData(result);
      return weatherData;
    }));
  }

  private errorHandler(error) {
    let message = 'Something went wrong';
    if (error._body) {
      const err = JSON.parse(error._body);
      message = err.message ? err.message : message;
    }
    return throwError({status: error.status, message});
  }
}
