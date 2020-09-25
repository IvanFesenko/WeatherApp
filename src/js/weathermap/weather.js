import Axios from 'axios';

function transformData(data) {
  const { weather, wind, city, main, list } = data;
}

export default class WeatherApp {
  constructor(query, selector) {
    this.key = '&appid=9c39d47f326699936c99f91558809414';
    this.baseURL = 'http://api.openweathermap.org/data/2.5/';
    this.type = {
      day: 'weather',
      days: 'forecast',
    };
    this.city = query;
    this.units = {
      metric: 'metric',
      imperial: 'imperial',
    };
    // this.getData = this.getData.bind(this);
    this.getData();
    this.ref = document.querySelector(selector);
    console.log(this);
  }
  async getData() {
    try {
      const [data1, data2] = await Promise.all([
        this.getTodayWeather(),
        this.getWeeklyWeather(),
      ]);
      const { data: dayly } = data1;
      const { data: weekly } = data2;
      const allData = { ...dayly, ...weekly };
      this.allData = allData;
    } catch (e) {
      console.error(e);
    }
  }

  getTodayWeather() {
    // const {
    //   baseURL,
    //   key,
    //   type: { day },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // const url = `${baseURL}${day}${searchQuery}${key}&units=${metric}`;
    const url =
      'https://raw.githubusercontent.com/IvanFesenko/WeatherApp/master/src/js/weathermap/dayly.json';
    return Axios.get(url);
  }

  getWeeklyWeather() {
    // const {
    //   baseURL,
    //   key,
    //   type: { days },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // const url = `${baseURL}${days}${searchQuery}${key}&units=${metric}`;
    const url =
      'https://raw.githubusercontent.com/IvanFesenko/WeatherApp/master/src/js/weathermap/weekly.json';
    return Axios.get(url);
  }

  #getWeatherImageURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
