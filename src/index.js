let apiKey = "dea7930290bf9064796ot2c1b9b4c9a7";

let apiUrl = "https://api.shecodes.io/weather/v1/forecast?";

function currentConditions(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.city}`;
  fahrTemp = response.data.daily[0].temperature.day;
  let currentTemp = Math.round(fahrTemp);
  let mainTemp = document.querySelector("#tempToday");
  let feelsLikeTemp = Math.round(response.data.daily[0].temperature.day);
  let currentFeelsLike = document.querySelector("#feels");
  let currentHumidity = response.data.daily[0].temperature.humidity;
  let curHumidity = document.querySelector("#humidity");
  let currentWind = Math.round(response.data.daily[0].wind.speed);
  let curWind = document.querySelector("#wind");
  let conditionsDescription = document.querySelector("#conditions");
  console.log(conditionsDescription);
  let skyDescription = response.data.daily[0].condition.description;
  let imageType = document.querySelector("#currentImage");
  imageType.setAttribute("src", response.data.daily[0].condition.icon_url);

  mainTemp.innerHTML = `${currentTemp}`;
  currentFeelsLike.innerHTML = `${feelsLikeTemp}`;
  curHumidity.innerHTML = `${currentHumidity}`;
  curWind.innerHTML = `${currentWind}`;
  conditionsDescription.innerHTML = `${skyDescription}`;
}
axios
  .get(`${apiUrl}query=Philadelphia&units=imperial&key=${apiKey}`)
  .then(currentConditions);

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

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function getPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Location";
  axios
    .get(`${apiUrl}lat=${lati}&lon=${long}&units=imperial&key=${apiKey}`)
    .then(currentConditions);
}
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationConditions = document.querySelector("#current-city");
currentLocationConditions.addEventListener("click", getGeoLocation);

function cityCoords(response) {
  console.log(response);
  let lati = response.data.coord.lat;
  let long = response.data.coord.lon;
  axios
    .get(`${apiUrl}lat=${lati}&lon=${long}&units=imperial&key=${apiKey}`)
    .then(currentConditions);
}

function getCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#inlineForm");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;
  axios
    .get(`${apiUrl}query=${newCity.value}&units=imperial&key=${apiKey}`)
    .then(currentConditions);
}
let searchedTemp = document.querySelector("#city-search");
searchedTemp.addEventListener("click", getCity);

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

function toCelsius(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#tempToday");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let celsiusTemp = Math.round(((fahrTemp - 32) * 5) / 9);
  tempToday.innerHTML = `${celsiusTemp}`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);

function toFahrenheit(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#tempToday");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  tempToday.innerHTML = Math.round(fahrTemp);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let fahrTemp = null;
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
