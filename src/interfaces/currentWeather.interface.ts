export interface Weather {
	"id": number;
	"main": string;
	"description": string;
	"icon": string;
}

export interface CurrentWeather {
	"coord": Coords,
	"weather": Weather[],
	"base": string,
	"main": {
		"temp": number,
		"feels_like": number,
		"temp_min": number,
		"temp_max": number,
		"pressure": number,
		"humidity": number
		"sea_level": number,
		"grnd_level": number
	},
	"visibility": number,
	"wind": {
		"speed": number,
		"deg": number,
		"gust": number
	},
	"rain": {
		"1h": number
	},
	"clouds": {
		"all": number
	},
	"dt": number,
	"sys": {
		"type": number,
		"id": number,
		"country": string,
		"sunrise": number,
		"sunset": number
	},
	"timezone": number,
	"id": number,
	"name": string,
	"cod": number
}

export interface Coords {
	"lon": number,
	"lat": number
}
