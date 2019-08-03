import { WeatherForecastComponent } from './../weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './../current-weather/current-weather.component';
import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  @ViewChild(CurrentWeatherComponent, null) private currentComp: CurrentWeatherComponent;
  @ViewChild(WeatherForecastComponent, null) private forecastComp: WeatherForecastComponent;

  constructor() { }

  // listens to a tab change: if the forecast tab is clicked the content is refreshed
  public onTabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
        this.forecastComp.showTemperature();
    }
  }
}
