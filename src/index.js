let apiKey = "701f06352d61835bc4fc894e7b084629";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function newTemp(response) {
  let myTemp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = `${myTemp}`;
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

function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationTemp = document.querySelector("#current-city");
currentLocationTemp.addEventListener("click", getGeoLocation);

function getTemp(event) {
  event.preventDefault();
  let newCity = document.querySelector("#form1");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;
  axios
    .get(`${apiUrl}&q=${newCity.value}&units=imperial&appid=${apiKey}`)
    .then(newTemp);
}
let searchedTemp = document.querySelector("#city-search");
searchedTemp.addEventListener("click", getTemp);

let now = new Date();

let h6 = document.querySelector("h6");
let weekdays = [
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
h6.innerHTML = `${day} ${hour}:${minutes}`;

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

// let weather = {
//  paris: {
//    temp: 19.7,
//    humidity: 80,
//  },
//  tokyo: {
//    temp: 17.3,
//    humidity: 50,
//  },
//  lisbon: {
//    temp: 30.2,
//    humidity: 20,
//  },
//  "san francisco": {
//    temp: 20.9,
//    humidity: 100,
//  },
//  oslo: {
//    temp: -5,
//    humidity: 20,
//  },
//};

// write your code here
//let city = prompt("Enter a city.");
//city = city.trim();
//city = city.toLowerCase();

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