import { CurrentWeather } from './interfaces/currentWeather.interface';
import { Forecast, ForecastWeather } from './interfaces/forecast.interface';
import Weather from './weather';

const citySearchForm = document.querySelector( '.city-search-form' ) as HTMLFormElement;

if ( citySearchForm ) {
	citySearchForm.addEventListener( 'submit', async ( e: SubmitEvent ) => {
		e.preventDefault();
		const cityInput = citySearchForm.querySelector( '.city' ) as HTMLInputElement;
		const searchResults = citySearchForm.querySelector( '.search-results' ) as HTMLUListElement;
		const city = cityInput.value;
		const weather = Weather.getInstance();
		const locations = await weather.getLocations( city );

		searchResults.innerHTML = '';

		if ( !locations.length ) {
			const li = document.createElement( 'li' );
			li.textContent = 'Nessun risultato trovato';
			searchResults.appendChild( li );
			return;
		}

		locations.forEach( ( location: any ) => {
			const li = document.createElement( 'li' );
			const button = document.createElement( 'button' );
			button.textContent = `${ location.name }, ${ location.state }, ${ location.country }`;
			button.addEventListener( 'click', async () => {
				searchResults.innerHTML = '';
				Promise.all( [
					weather.getCurrentWeather( location.lat, location.lon ),
					weather.getForecast( location.lat, location.lon )
				] ).then( ( [currentWeather, forecast] ) => {
					showWeatherData( currentWeather, forecast );
				} )
			} )
			li.appendChild( button );
			searchResults.appendChild( li );
		} )

	} )
}

function showWeatherData( currentWeather: CurrentWeather, forecast: Forecast ) {

	const weatherMain = document.querySelector( '.weather-main' ) as HTMLParagraphElement;
	const weatherLocation = document.querySelector( '.weather-location' ) as HTMLParagraphElement;
	const weatherTemperature = document.querySelector( '.weather-temperature' ) as HTMLParagraphElement;
	const weatherStats = document.querySelector( '.weather-stats' ) as HTMLElement;
	const weatherDaily = document.querySelector( '.weather-daily ul' ) as HTMLUListElement;

	weatherStats.className = 'weather-stats';
	weatherStats.classList.add( currentWeather.weather[0].main.toLowerCase() );
	weatherMain.textContent = currentWeather.weather[0].description;
	weatherLocation.textContent = currentWeather.name;
	weatherTemperature.textContent = `${ currentWeather.main.temp }°C`;
	weatherDaily.innerHTML = '';
	const forecastElements = createWeatherDay( forecast );
	forecastElements.forEach( ( element: HTMLElement ) => {
		weatherDaily.appendChild( element );
	} )

}


function createWeatherDay( forecast: Forecast ) {
	const forecastMap = forecast.list.map( ( forecastWeather: ForecastWeather ) => {
		const li = document.createElement( 'li' );
		const day = new Date( forecastWeather.dt * 1000 );
		li.innerHTML = `
		<span class="day">${ day.toLocaleDateString( 'it-IT', { weekday: 'long' } ) }</span>
		<span class="stats">
			<span>${ forecastWeather.main.temp }</span>
			<span>${ forecastWeather.weather[0].description }</span>
		</span>
		`;
		return li;
	} );

	return forecastMap;
}
