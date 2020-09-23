import Axios from 'axios';

class WeatherApp {
  constructor(searchQuery) {
    this.key = '&appid=9c39d47f326699936c99f91558809414';
    this.baseURL = 'api.openweathermap.org/data/2.5/weather?q=';
    this.searchQuery = searchQuery;
    this.enabled = false;
    this.city = '';
  }

  #render() {}

  #setup() {}

  destroy() {}
}
