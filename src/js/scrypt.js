import WeatherApp from './weathermap/weather';
import initByGeolocation from './geolocation';






initByGeolocation()
  .then(resolve => {
    const {latitude: lat , longitude: lon} = resolve.coords;
    const App = new WeatherApp('.weather-app', {cords: {lat, lon}});
    window.s = App;
  })
  .catch(error => {
    console.log(error);
    const App = new WeatherApp('.weather-app', {query: 'Kiev'});
    window.s = App;
  });


