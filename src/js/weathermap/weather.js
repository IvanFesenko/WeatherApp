import Axios from 'axios';

export default class WeatherApp {
  constructor(searchQuery) {
    this.key = '&appid=9c39d47f326699936c99f91558809414';
    this.baseURL = 'http://api.openweathermap.org/data/2.5/';
    this.type = {
      day: 'weather',
      days: 'forecast',
    };
    this.searchQuery = `?q=${searchQuery}`;
    this.enabled = false;
    this.city = '';
    this.units = {
      metric: 'metric',
      imperial: 'imperial',
    };

    this.setup();
    console.log(this);
  }

  render() {}

  setup() {
    Promise.all([this.getTodayWeather(), this.getWeeklyWeather()]).then(
      function (results) {
        console.log(this);
        this.data = results;
      },
    );
  }

  getWeatherImageURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getTodayWeather() {
    // const {
    //   baseURL,
    //   key,
    //   type: { day },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // //http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=9c39d47f326699936c99f91558809414&units=metric
    // const url = `${baseURL}${day}${searchQuery}${key}&units=${metric}`;
    return Axios.get(url);
  }

  getWeeklyWeather() {
    //http://api.openweathermap.org/data/2.5/forecast?q=Kiev&appid=9c39d47f326699936c99f91558809414&units=metric
    // const {
    //   baseURL,
    //   key,
    //   type: { days },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // const url = `${baseURL}${days}${searchQuery}${key}&units=${metric}`;

    return Axios.get(url);
  }
}
