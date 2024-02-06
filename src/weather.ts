import { CurrentWeather } from './interfaces/currentWeather.interface';
import { Forecast, ForecastWeather } from './interfaces/forecast.interface';
import { GeocodedLocation } from './interfaces/geocoding.interface';

class Weather {

	private static instance: Weather;
	private weatherEndpoint: string = "https://api.openweathermap.org/data/2.5/weather";
	private geocodingEndpoint: string = "https://api.openweathermap.org/geo/1.0/direct";
	private forecastEndpoint: string = "https://api.openweathermap.org/data/2.5/forecast";
	private setting: { [key: string]: string } = { units: "metric", lang: "it" }
	private apiKey: string = "LA_TUA_CHIAVE_API";

	constructor () { }

	static getInstance() {
		if ( !Weather.instance ) {
			Weather.instance = new Weather();
		}

		return Weather.instance;
	}

	async getLocations( query: string ): Promise<GeocodedLocation[]> {
		const response = await fetch( `${ this.geocodingEndpoint }?q=${ query }&limit=5&appid=${ this.apiKey }&lang=${ this.setting.lang }` );
		const data: GeocodedLocation[] = await response.json();
		return data;
	}

	async getCurrentWeather( lat: number, lon: number ): Promise<CurrentWeather> {

		const response = await fetch( `${ this.weatherEndpoint }?lat=${ lat }&lon=${ lon }&appid=${ this.apiKey }&units=${ this.setting.units }&lang=${ this.setting.lang }` );
		const data: CurrentWeather = await response.json();
		return data;

	}

	async getForecast( lat: number, lon: number ): Promise<Forecast> {
		const response = await fetch( `${ this.forecastEndpoint }?lat=${ lat }&lon=${ lon }&appid=${ this.apiKey }&units=${ this.setting.units }&lang=${ this.setting.lang }` );
		let data: Forecast = await response.json();
		data.list = this.filterForecast( data.list );
		return data;
	}

	private filterForecast( forecast: ForecastWeather[] ): ForecastWeather[] {
		const foundDays: string[] = [];
		const filteredForecast: ForecastWeather[] = [];
		forecast.forEach( ( forecastWeather: ForecastWeather ) => {
			const date = forecastWeather.dt_txt.split( ' ' )[0];
			if ( foundDays.indexOf( date ) === -1 ) {
				foundDays.push( date );
				filteredForecast.push( forecastWeather );
			} else {
				return;
			}
		} )

		return filteredForecast;
	}
}

export default Weather;
