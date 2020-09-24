import Axios from 'axios';

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
    this.getData = this.getData.bind(this);
    this.getData(this);
  }
  async getData(App) {
    const data = await Promise.all([getTodayWeather(), getWeeklyWeather()]);
    console.log(data);
    // console.log(dayly);
    // console.log(weekly);
    console.log(App);

    //   .then(function (
    //   results,
    // ) {
    //   const { data: dayly } = results[0];
    //   const { data: weekly } = results[1];
    //   console.log(dayly);
    //   console.log(weekly);
    //   console.log(App);
    // });
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
}

const weatherApp = {
  key: '&appid=9c39d47f326699936c99f91558809414',
  baseURL: 'http://api.openweathermap.org/data/2.5/',
  type: {
    day: 'weather',
    days: 'forecast',
  },
  searchQuery: '',
  units: {
    metric: 'metric',
    imperial: 'imperial',
  },
};

// Promise.all([getTodayWeather(), getWeeklyWeather()]).then(function (results) {
//   const { data: dayly } = results[0];
//   const { data: weekly } = results[1];
//   console.log(dayly);
//   console.log(weekly);
// });

// getTodayWeatherAsync();

async function getTodayWeatherAsync() {
  // const {
  //   baseURL,
  //   key,
  //   type: { day },
  //   searchQuery,
  //   units: { metric },
  // } = this;
  // const url = `${baseURL}${day}${searchQuery}${key}&units=${metric}`;
  // const url =
  //   'https://raw.githubusercontent.com/IvanFesenko/WeatherApp/master/src/js/weathermap/dayly.json';

  const url =
    'http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=9c39d47f326699936c99f91558809414&units=metric';
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function getTodayWeather() {
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

function getWeeklyWeather() {
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

// constructor(searchQuery) {
//
//     const daylyData = this.getTodayWeather();
//     const weeklyData = this.getWeeklyWeather();
//     console.log(this);
//     console.log(this);
//   }
//   render() {}
//   setup() {
//     Promise.all([this.getTodayWeather(), this.getWeeklyWeather()]).then(
//       function (results) {
//         return results;
//       },
//     );
//   }
//   getWeatherImageURL(icon) {
//     return `http://openweathermap.org/img/wn/${icon}@2x.png`;
//   }

// }
