import refs from './refs';
import WeatherApp from './weathermap/weather';
import initByGeolocation from './geolocation';
import { showElement, hideElement } from './elementsVisuality';

refs.btn.addEventListener('click', onSearchSubmit);
window.refs = refs;

function onSearchSubmit(event) {
  const { query, App } = refs;
  event.preventDefault();
  hideElement(App.ref);
  showElement('.preloader');
  App.destroy();
  refs.App = new WeatherApp('.weather-app', { query: query.value });
}

// initByGeolocation()
//   .then(resolve => {
//     const { latitude: lat, longitude: lon } = resolve.coords;
//     refs.App = new WeatherApp('.weather-app', { cords: { lat, lon } });
//   })
//   .catch(error => {
//     console.log(error);
//     refs.App = new WeatherApp('.weather-app', { query: 'Kiev' });
//   });
