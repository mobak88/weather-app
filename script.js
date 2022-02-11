import { API } from './env';

const lang = 'en';
const units = 'metric';
const userInput = document.getElementById('search');

const displayCity = document.querySelector('.city-name');
const displayTemp = document.querySelector('.city-temp');
const errorMsg = document.querySelector('.error');

function displayCityName(cityName) {
  displayCity.innerHTML = cityName;
}

function getCity(data) {
  const city = data.timezone.replace('Europe/', '');
  displayCityName(city);
}

function displayCityTemp(data) {
  displayTemp.innerHTML = '';
  data.daily.forEach((day) => {
    displayTemp.innerHTML += `<p>Day ${data.daily.indexOf(day) + 1}: ${Math.round(day.temp.day)}°</p>`;
  });
}

function createWeatherData(lat, lon) {
  const weatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API}&units=${units}&lang=${lang}`;

  async function getWeatherData() {
    try {
      const response = await fetch(weatherData);
      const data = await response.json();
      getCity(data);
      displayCityTemp(data);
      console.log(data);
    } catch (err) {
      errorMsg.innerHTML = `Something went wrong, please try again.`;
    }
  }
  getWeatherData();
}

async function getCityCoords() {
  try {
    const API = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${userInput.value}&format=json&limit=1`;
    const response = await fetch(API);
    const data = await response.json();
    console.log(data[0].lat);
    console.log(data[0].lon);
    createWeatherData(
      data[0].lat,
      data[0].lon
    );
    errorMsg.innerHTML = '';
    userInput.value = '';
  } catch (err) {
    if (userInput.value === '') {
      errorMsg.innerHTML = `Please type in a keyword`;
    } else {
      errorMsg.innerHTML = `Something went wrong, please try again.`;
    }

    displayCity.innerHTML = '';
    displayTemp.innerHTML = '';
    console.log(err);
  }
}

userInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    getCityCoords();
  }
});
