export class WeatherData {
  constructor(
  public temperature: number,
  public sunrise: Date,
  public sunset: Date) {
  }
}

export class WeatherForecast {
  constructor(
  public forecastData: ForecastData[]) {
  }
}

export class ForecastData {
  constructor(
  public date: Date,
  public temperature: number,
  public humidity: number,
  public windSpeed: number) {
  }
}

/**
 * creates WeatherData and WeatherForecast objects from raw data objects
 * Todo: create raw data interface to remove "any"
 */
export class WeatherDataFactory {
  public static getWeatherData(object: any): WeatherData {
    const temp = Math.fround(object.main.temp - 273.15);
    const timeZone = object.timezone;
    const sunset = new Date((object.sys.sunset + timeZone) * 1000);
    const sunrise = new Date((object.sys.sunrise + timeZone) * 1000);
    return new WeatherData(temp, sunrise, sunset);
  }

  public static getForecastData(object: any): WeatherForecast {
    const forecasts = object.list as [];
    const forecastData = forecasts.map((forecastItem: any) => {
      return new ForecastData(new Date(forecastItem.dt * 1000), Math.fround(forecastItem.main.temp - 273.15),
        forecastItem.main.humidity, forecastItem.wind.speed);
    });
    return new WeatherForecast(forecastData);
  }
}
