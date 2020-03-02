import { Component, OnInit, Input } from '@angular/core';
import { OpenweatherService } from '../services/openweather.service';
import { ILocation} from '../data-model/location-data';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})

/**
 * get the new location data (city and country code) and sets the value in the service
 */
export class LocationInputComponent implements OnInit {

  public location: ILocation;
  @Input() showCountryCode = true;

  constructor(private weatherService: OpenweatherService) { }

  ngOnInit() {
    this.location = {
      countryCode : '',
      city: ''
    };
    this.weatherService.currentLocation.subscribe(loc => this.location = loc);
  }
  public updateWeatherData(): void {
    this.weatherService.changeLocation(this.location);
  }
}
