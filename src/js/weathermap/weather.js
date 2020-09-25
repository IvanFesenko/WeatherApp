import Axios from 'axios';
import moment from 'moment';

function transformData(data) {
  const { weather, wind, city, main, list } = data;
  const result = {};
  result.todayList = list.filter(el => {
    const todayDate = new Date().getDate();
    const listDate = moment.unix(el.dt)._d.getDate();
    return todayDate === listDate;
  });
}

export default class WeatherApp {
  constructor(query, selector) {
    this.key = '41490885519f99c639996623f74d93c9=dippa&';
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
  #getKey() {
    return this.key.split('').reverse().join('');
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
    //   type: { day },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // const url = `${baseURL}${day}${searchQuery}${this.#getKey()}&units=${metric}`;
    const url =
      'https://raw.githubusercontent.com/IvanFesenko/WeatherApp/master/src/js/weathermap/dayly.json';
    return Axios.get(url);
  }

  getWeeklyWeather() {
    // const {
    //   baseURL,
    //   type: { days },
    //   searchQuery,
    //   units: { metric },
    // } = this;
    // const url = `${baseURL}${days}${searchQuery}${this.#getKey()}&units=${metric}`;
    const url =
      'https://raw.githubusercontent.com/IvanFesenko/WeatherApp/master/src/js/weathermap/weekly.json';
    return Axios.get(url);
  }

  #getWeatherImageURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
