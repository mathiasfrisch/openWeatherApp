import { WeatherForecast } from './../data-model/weather-data';
import { Component, OnInit } from '@angular/core';
import { ILocation } from '../app.component';
import { OpenweatherService } from '../services/openweather.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

/**
 * the component show the weatherforecast for the next five days, it is visualized by a c3.js chart
 */
export class WeatherForecastComponent implements OnInit {

  public weatherForecast: WeatherForecast;
  public errorMessage: string;
  public location: ILocation;

  private chart;

  constructor(private weatherService: OpenweatherService) { }

  ngOnInit() {
    // listen to location change
    this.weatherService.currentLocation.subscribe(loc => this.locationChanged(loc));
  }

  /**
   * @param newLocation if location is updated get weather data from the service
   */
  private locationChanged(newLocation: ILocation) {
    this.weatherForecast = undefined;
    this.location = newLocation;
    if (newLocation) {
      this.weatherService.getWeatherForecast(this.location.city, this.location.countryCode).subscribe((weatherData) => {
        this.weatherForecast = weatherData;
        this.errorMessage = undefined;
        this.showTemperature();
      }, (error: {status: number, message: string}) => {
        this.errorMessage = error.message;
        if (this.chart) {
          this.chart.destroy();
          this.chart = undefined;
        }
      });
    }
  }

  public showTemperature(): void {
    if (this.weatherForecast) {
      const days = this.weatherForecast.forecastData.map((data) => data.date);
      const temps = this.weatherForecast.forecastData.map(data => data.temperature);
      this.createChart(temps, days, 'Temperature');
    }
  }

  public showHumidity(): void {
    if (this.weatherForecast) {
      const days = this.weatherForecast.forecastData.map((data) => data.date);
      const humidity = this.weatherForecast.forecastData.map(data => data.humidity);
      this.createChart(humidity, days, 'Humidity');
    }
  }

  public showWindSpeed(): void {
    if (this.weatherForecast) {
      const days = this.weatherForecast.forecastData.map((data) => data.date);
      const windSpeed = this.weatherForecast.forecastData.map(data => data.windSpeed);
      this.createChart(windSpeed, days, 'Windspeed');
    }
  }

  public createChart(values: number[], date: Date[], label: string): void {
    (date as any[]).unshift('x');
    (values as any[]).unshift(label);
    const color = {};
    color[label] = '#00897b';

    this.chart = c3.generate({
      bindto: '#forecast-chart',
      data: {
          x: 'x',
          columns: [
              date,
              values
          ],
          type: 'area-spline',
          colors: color
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                count: 5,
                format: '%a'
              }
          }
      }
    });
  }

}
