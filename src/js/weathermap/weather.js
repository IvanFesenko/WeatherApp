import Axios from 'axios';
import transformData from './dataTransforamtion';
import template from '../../templates/WeatherApp.hbs';
import Swiper from 'swiper';
import { showElement, hideElement } from '../elementsVisuality';

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
      const { lat, lon } = params.cords;
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
    const swiperHourly = new Swiper('.swiper__hourly', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 30,
    });
    const swiperWeekly = new Swiper('.swiper__weekly', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 30,
      touchMoveStopPropagation: false,
    });
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

  destroy() {
    this.ref.innerHTML = '';
  }
}
