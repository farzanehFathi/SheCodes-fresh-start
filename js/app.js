// ------- Functions ----------

// ___ date and time format ___
function DateFormat(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = weekdays[date.getDay()];
  let month = months[date.getMonth()];
  let dayIndex = date.getDate();

  return `${day}, ${month} ${dayIndex}`;
}

function TimeFormat(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour} : ${minute}`;
}

// ___ Update the weather  ___

function updateWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#air-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function getData(city) {
  let apiKey = "32e12816b7e874a17bd13105b642a985";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(updateWeather);
}

// ___ Search box  ___

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getData(city);
}

// ___ Convert Units  ___
function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#air-temp");
  temp.innerHTML = "-7";
}

function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#air-temp");
  let tempNumber = Number(temp.innerHTML);
  let fahrenheitTemp = Math.round((tempNumber * 9) / 5 + 32);
  temp.innerHTML = `${fahrenheitTemp}`;
}

// ---- Date and Time  ----

let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = `${TimeFormat(currentTime)}`;

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${DateFormat(currentTime)}`;

// Change the City to Search Box

let cityElement = document.querySelector("#search-form");
cityElement.addEventListener("submit", searchCity);

// Convert Units

let toCel = document.querySelector("#to-celsius");
toCel.addEventListener("click", toCelsius);

let toFahr = document.querySelector("#to-fahrenheit");
toFahr.addEventListener("click", toFahrenheit);

// Weather API
getData("Ardabil");
