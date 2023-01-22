let apiKey = "dea7930290bf9064796ot2c1b9b4c9a7";

let apiUrl = "https://api.shecodes.io/weather/v1/forecast?";

function currentConditions(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.city}`;
  fahrTemp = response.data.daily[0].temperature.day;
  let currentTemp = Math.round(fahrTemp);
  let mainTemp = document.querySelector("#tempToday");
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
  curHumidity.innerHTML = `${currentHumidity}`;
  curWind.innerHTML = `${currentWind}`;
  conditionsDescription.innerHTML = `${skyDescription}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  console.log(dailyForecast);

  let forecastElement = document.querySelector("#weekly");

  let forecastHTML = '<div class="row">';

  dailyForecast.forEach(function (forecastDay, index) {
    if (index <= 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class=" col-2 text-center">
              <span class="dayZero" id="dayZero"> ${formatDay(
                forecastDay.time
              )} </span>
              <br />
              <img
                src="${forecastDay.condition.icon_url}"
                alt="Partly Cloudy"
                class="icons"
                id="dailyImage"
              />
              <br />
              <span class="temps">
                <span class="highTemp"> ${Math.round(
                  forecastDay.temperature.maximum
                )}ºF </span> /
                <span class="lowTemp"> ${Math.round(
                  forecastDay.temperature.minimum
                )}ºF </span>
              </span>
            </div>
`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

axios
  .get(`${apiUrl}query=Philadelphia&units=imperial&key=${apiKey}`)
  .then(currentConditions);

axios
  .get(`${apiUrl}query=Philadelphia&units=imperial&key=${apiKey}`)
  .then(displayForecast);

function getPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Location";
  axios
    .get(`${apiUrl}lat=${lati}&lon=${long}&units=imperial&key=${apiKey}`)
    .then(currentConditions);
  axios
    .get(`${apiUrl}lat=${lati}&lon=${long}&units=imperial&key=${apiKey}`)
    .then(displayForecast);
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
  axios
    .get(`${apiUrl}lat=${lati}&lon=${long}&units=imperial&key=${apiKey}`)
    .then(displayForecast);
}

function getCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#inlineForm");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${newCity.value}`;
  axios
    .get(`${apiUrl}query=${newCity.value}&units=imperial&key=${apiKey}`)
    .then(currentConditions);
  axios
    .get(`${apiUrl}query=${newCity.value}&units=imperial&key=${apiKey}`)
    .then(displayForecast);
}
let searchedTemp = document.querySelector("#city-search");
searchedTemp.addEventListener("click", getCity);

let now = new Date();

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
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${day} ${hour}:${minutes}`;

let fahrTemp = null;
