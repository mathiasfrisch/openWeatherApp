import { WeatherData } from './../data-model/weather-data';
import { Component, OnInit } from '@angular/core';
import { OpenweatherService } from '../services/openweather.service';
import { ILocation } from '../app.component';

/**
 * Shows the current weather data if the location changes
 */
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  public weatherData: WeatherData;
  public errorMessage: string;
  public showProgess = false;
  public location: ILocation;

  constructor(private weatherService: OpenweatherService) { }

  ngOnInit() {
    // subscribe to the weatherService to listen for location change
    this.weatherService.currentLocation.subscribe(loc => this.locationChanged(loc));
  }

  get temperature(): number {
    return Math.round(this.weatherData.temperature * 10) / 10;
  }

  get sunrise(): string {
    return this.weatherData.sunrise.getHours() + ':' + this.weatherData.sunrise.getMinutes();
  }

  get sunset(): string {
    return this.weatherData.sunset.getHours() + ':' + this.weatherData.sunset.getMinutes();
  }

  /**
   * get the weather data from the service if location changes
   *
   */
  private locationChanged(newLocation: ILocation) {
    this.location = newLocation;
    this.weatherData = undefined;
    if (newLocation) {
      this.weatherService.getCurrentWeather(this.location.city, this.location.countryCode).subscribe((weatherData) => {
        this.weatherData = weatherData;
        this.errorMessage = undefined;
      }, (error: {status: number, message: string}) => {
        this.errorMessage = error.message;
        this.showProgess = false;
      });
    }
  }

}
