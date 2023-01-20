let apiKey = "701f06352d61835bc4fc894e7b084629";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function phillyConditions(response) {
  let currentPhillyTemp = Math.round(response.data.main.temp);
  let philaTemp = document.querySelector("#tempToday");
  philaTemp.innerHTML = `${currentPhillyTemp}`;
  let feelsLikeTemp = Math.round(response.data.main.temp);
  let currentFeelsLike = document.querySelector("#feels");
  currentFeelsLike.innerHTML = `${feelsLikeTemp}`;
  let currentPhillyHumidity = response.data.main.humidity;
  let philaHumidity = document.querySelector("#humidity");
  philaHumidity.innerHTML = `${currentPhillyHumidity}`;
  let currentPhillyWind = Math.round(response.data.wind.speed);
  let philaWind = document.querySelector("#wind");
  philaWind.innerHTML = `${currentPhillyWind}`;
  let skyConditions = response.data.weather[0].id;
  console.log(skyConditions);
  let imageType = document.querySelector("#currentImage");
  if (skyConditions >= 200 && skyConditions <= 240) {
    imageType.setAttribute("src", "images/rain_and_lightning.png");
  } else if (skyConditions >= 300 && skyConditions <= 532) {
    imageType.setAttribute("src", "images/rain_cloud.png");
  } else if (skyConditions >= 600 && skyConditions <= 632) {
    imageType.setAttribute("src", "images/snow_cloud.png");
  } else if (skyConditions >= 800 && skyConditions <= 803) {
    imageType.setAttribute("src", "images/cloudySun.png");
  } else if (skyConditions == 804) {
    imageType.setAttribute("src", "images/clouds.png");
  } else {
    imageType.setAttribute("src", "images/sun.png");
  }
}
axios
  .get(`${apiUrl}&q=Philadelphia&units=imperial&appid=${apiKey}`)
  .then(phillyConditions);

let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekdays[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let h6 = document.querySelector("h6");
h6.innerHTML = `${day} ${hour}:${minutes}`;

function newTemp(response) {
  let myTemp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = `${myTemp}`;
}

function newWind(response) {
  let myWind = Math.round(response.data.wind.speed.value);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${myWind}`;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Location";
  axios
    .get(`${apiUrl}&lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(newTemp);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Location";
  axios
    .get(`${apiUrl}&lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(newWind);
}

function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationTemp = document.querySelector("#current-city");
currentLocationTemp.addEventListener("click", getGeoLocation);

function getTemp(event) {
  event.preventDefault();
  let newCity = document.querySelector("#inlineForm");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;
  axios
    .get(`${apiUrl}&q=${newCity.value}&units=imperial&appid=${apiKey}`)
    .then(newTemp);
}
let searchedTemp = document.querySelector("#city-search");
searchedTemp.addEventListener("click", getTemp);

let weekdaysShortened = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat",
];

let dayZero = weekdaysShortened[now.getDay()];
let day0 = document.querySelector("#dayZero");
day0.innerHTML = `${dayZero}`;

let dayOneShort = weekdaysShortened[now.getDay() + 1];
let dayOne = document.querySelector("#dayOne");
dayOne.innerHTML = `${dayOneShort}`;

let dayTwoShort = weekdaysShortened[now.getDay() + 2];
let dayTwo = document.querySelector("#dayTwo");
dayTwo.innerHTML = `${dayTwoShort}`;

let dayThreeShort = weekdaysShortened[now.getDay() + 3];
let dayThree = document.querySelector("#dayThree");
dayThree.innerHTML = `${dayThreeShort}`;

let dayFourShort = weekdaysShortened[now.getDay() + 4];
let dayFour = document.querySelector("#dayFour");
dayFour.innerHTML = `${dayFourShort}`;

let dayFiveShort = weekdaysShortened[now.getDay() + 5];
let dayFive = document.querySelector("#dayFive");
dayFive.innerHTML = `${dayFiveShort}`;

let fahrenheitTemp = 42;
function toCelcius(event) {
  let celciusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = `${celciusTemp}`;
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", toCelcius);

function toFahrenheit() {
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = "42";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

//if (weather[city] !== undefined) {
//  let temperature = weather[city].temp;
//  let celsius = Math.round(temperature);
//  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
//  let humidity = weather[city].humidity;
//  alert(
//    `It is currently ${celsius}ºC (${fahrenheit}) in ${city} with a humdity of ${humidity}%.`
//  );
//} else {
//  alert(
//    `Sorry, we don't have the conditions for this city. Try going to https://www.google.com/?q=weather+${city}`
//  );
//}
