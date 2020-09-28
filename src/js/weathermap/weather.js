import Axios from 'axios';
import moment from 'moment';
import template from '../../templates/WeatherApp.hbs';
import Swiper from 'swiper';
import { showElement, hideElement } from '../elementsVisuality';

function transformData(data) {
  const { weather, wind, main, list, sys, name } = data;
  const result = {};
  result.weather = { ...weather[0], ...wind, ...main, ...sys };
  result.currentTime = moment(new Date(), 'MM-DD-YYYY').format(
    'DD MMMM YYYY HH:mm',
  );
  result.city = `${name}, ${result.weather.country}`;
  result.weather.temp = Math.round(result.weather.temp);
  result.weather.feels_like = Math.round(result.weather.feels_like);
  result.weather.temp_min = Math.round(result.weather.temp_min);
  result.weather.temp_max = Math.round(result.weather.temp_max);
  result.weather.image = getWeatherImageURL(result.weather.icon);
  const todayList = list.filter(el => {
    const todayDate = new Date().getDate();
    const listDate = moment.unix(el.dt - 10000)._d.getDate();
    return todayDate === listDate;
  });
  // result.today = todayList;

  result.todayList = todayList.reduce((acc, value) => {
    const { weather, wind, main, dt } = value;
    const result = { ...weather[0], ...wind, ...main, dt };
    result.temp = Math.round(result.temp);
    result.time = moment.unix(result.dt - 10800).format('HH:mm');
    result.image = getWeatherImageURL(result.icon);
    acc.push(result);
    return acc;
  }, []);

  const fiveDaysList = list.filter(el => {
    const todayDate = new Date().getDate();
    const listDate = moment.unix(el.dt - 10000)._d.getDate();
    if (todayDate === listDate) return false;
    const listHours = moment.unix(el.dt - 10000)._d.getHours();
    if (listHours === 12) return true;
  });

  // result.fiveDays = fiveDaysList;

  result.fiveDaysList = fiveDaysList.reduce((acc, value) => {
    const { weather, wind, main, dt } = value;
    const result = { ...weather[0], ...wind, ...main, dt };
    result.temp = Math.round(result.temp);
    result.time = moment.unix(result.dt - 10800).format('DD.MM');
    result.image = getWeatherImageURL(result.icon);
    acc.push(result);
    return acc;
  }, []);

  return result;
}

function getWeatherImageURL(icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export default class WeatherApp {
  constructor(selector, params) {
    this.key = '41490885519f99c639996623f74d93c9=dippa&';
    this.baseURL = 'http://api.openweathermap.org/data/2.5/';
    this.type = {
      day: 'weather',
      days: 'forecast',
    };
    this.units = {
      metric: 'metric',
      imperial: 'imperial',
    };
    if (params.hasOwnProperty('cords')) {
      const {lat, lon} = params.cords;
      this.searchQuery = `?lat=${lat}&lon=${lon}`;
    } else {
      this.searchQuery = `?q=${params.query}`;
    }
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
      this.data = transformData(allData);
      this.#render();
    } catch (e) {
      console.error(e);
    }
  }

  #render() {
    const layout = template(this.data);
    this.ref.insertAdjacentHTML('beforeend', layout);
    hideElement('.preloader');
    showElement(this.ref);
  }

  getTodayWeather() {
    const {
      baseURL,
      type: { day },
      searchQuery,
      units: { metric },
    } = this;
    const url = `${baseURL}${day}${searchQuery}${this.#getKey()}&units=${metric}`;
    return Axios.get(url);
  }


  getWeeklyWeather() {
    const {
      baseURL,
      type: { days },
      searchQuery,
      units: { metric },
    } = this;
    const url = `${baseURL}${days}${searchQuery}${this.#getKey()}&units=${metric}`;
    return Axios.get(url);
  }

  destroy(){
    this.ref.innerHTML = '';
  }
}
