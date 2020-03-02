import { HttpClient } from '@angular/common/http';
import { ILocation } from '../data-model/location-data';
import { WeatherDataFactory, WeatherData, WeatherForecast } from '../data-model/weather-data';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private currentEndpoint = 'weather';
  private forecastEndpoint = 'forecast';

  private locationSource = new Subject<ILocation>();
  public currentLocation = this.locationSource.asObservable();

  constructor(private http: HttpClient) { }

  public changeLocation(location: ILocation) {
    this.locationSource.next(location);
  }

  public getCurrentWeather(city: string, countryCode?: string): Observable<WeatherData> {
    const location = countryCode ? city + ', ' + countryCode : city;
    return this.http.get(`${this.apiUrl}/${this.currentEndpoint}?q=${location}`)
    .pipe(
      retry(3),
      map(result => WeatherDataFactory.getWeatherData(result)),
      catchError(this.errorHandler));
  }

  public getWeatherForecast(city: string, countryCode?: string): Observable<WeatherForecast> {
    const location = countryCode ? city + ', ' + countryCode : city;
    return this.http.get(`${this.apiUrl}/${this.forecastEndpoint}?q=${location}&mode=json`)
    .pipe(
      retry(3),
      catchError(this.errorHandler),
      map(result => WeatherDataFactory.getForecastData(result)));
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
