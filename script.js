const key = 'b34546a544f44c3e49b6ff1cbab1258c';
const geocodeKey = '142d59a6d775429a86132d2461adb2ab';
const lang = 'en';
const units = 'metric';
const userInput = document.getElementById('search');

const displayCity = document.querySelector('.city-name');
const displayTemp = document.querySelector('.city-temp');

let API = `https://api.opencagedata.com/geocode/v1/json?key=${geocodeKey}&q=london`;

async function getCityCoords() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    createWeatherData(
      data.results[0].geometry.lat,
      data.results[0].geometry.lng
    );
    console.log(data);
    console.log(data.results[0].geometry.lat);
    console.log(data.results[0].geometry.lng);
  } catch (err) {
    console.log(err);
  }
}

function createWeatherData(lat, lon) {
  let weatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

  async function getWeatherData() {
    try {
      const response = await fetch(weatherData);
      const data = await response.json();
      getCity(data);
      displayCityTemp(data);
    } catch (err) {
      console.log(err);
    }
  }
  getWeatherData();
}

function getCity(data) {
  const city = data.timezone.replace('Europe/', '');
  displayCityName(city);
}

function displayCityName(cityName) {
  displayCity.innerHTML = cityName;
}

function displayCityTemp(data) {
  displayTemp.innerHTML = `${Math.round(data.daily[0].temp.day)}°`;
  console.log(data.daily[0].temp.day);
}

function pushDataToArr(data, city, temp) {
  data.push({
    city: city,
    temp: temp,
  });
}
