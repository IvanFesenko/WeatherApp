import moment from 'moment';

function formatList(list, format) {
  return list.reduce((acc, value) => {
    const { weather, wind, main, dt } = value;
    const result = { ...weather[0], ...wind, ...main, dt };
    result.temp = Math.round(result.temp);
    result.time = moment.unix(result.dt - 10800).format(format);
    result.image = getWeatherImageURL(result.icon);
    acc.push(result);
    return acc;
  }, []);
}

function getWeatherImageURL(icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export default function transformData(data) {
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
  result.todayList = formatList(todayList, 'HH:mm');

  ;

  const fiveDaysList = list.filter(el => {
    const todayDate = new Date().getDate();
    const listDate = moment.unix(el.dt - 10000)._d.getDate();
    if (todayDate === listDate) return false;
    const listHours = moment.unix(el.dt - 10000)._d.getHours();
    if (listHours === 12) return true;
  });

  // result.fiveDays = fiveDaysList;
  result.fiveDaysList = formatList(fiveDaysList, 'DD.MM');

  return result;
}
