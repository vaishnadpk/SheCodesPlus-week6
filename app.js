let currentCalender = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let day = days[currentCalender.getDay()];
let hours = currentCalender.getHours();
let minutes = currentCalender.getMinutes();
let timeNow = `${hours}:${minutes}`;

let display = document.querySelector("#dayAndTime");
display.innerHTML = `${day} ${timeNow}`;

function cityMain(event) {
  event.preventDefault();
  const input = document.querySelector("#searchcity");

  let city = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getWeather(apiUrl);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}1&lon=${longitude}&appid=${apiKey}&units=metric`;

  getWeather(apiUrl);
}

function cityNow() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let apiKey = "52169e3105f28caedcdec1ae5c07459d";

function getWeather(apiUrl) {
  function showTemperature(response) {
    console.log(Math.round(response.data.main.temp));
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(response.data.main.temp);

    console.log(response.data.weather[0].description);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let cityName = document.querySelector("#cityName");
    cityName.innerHTML = response.data.name;
  }

  axios.get(apiUrl).then(showTemperature);
}

let currentCity = document.querySelector("#inputForm");
currentCity.addEventListener("submit", cityMain);
document.getElementById("currentbtn").addEventListener("click", cityNow);
