import { Coords, Weather } from './currentWeather.interface';

export interface Forecast {
	city: City;
	cnt: number;
	code: string;
	list: ForecastWeather[];
	message: number;
}

interface City {
	coord: Coords;
	country: string;
	id: number;
	name: string;
	population: number;
	sunrise: number;
	sunset: number;
	timezone: number;
}

export interface ForecastWeather {
	clouds: { all: number },
	dt: number,
	dt_txt: string,
	main: {
		feels_like: number,
		grnd_level: number,
		humidity: number,
		pressure: number,
		sea_level: number,
		temp: number,
		temp_kf: number,
		temp_max: number,
		temp_min: number
	},
	pop: number,
	sys: { pod: string },
	visibility: number,
	weather: Weather[],
	wind: { speed: number, deg: number, gust: number }
}
