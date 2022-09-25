//Date Section
let currentTime = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = document.querySelector("#week-day");
let dayTime = document.querySelector("#day-time");

weekDay.innerHTML = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
   minutes = `0${minutes}`
}
if (hours < 10) {
   hours = `0${hours}`
}
dayTime.innerHTML = `${hours}:${minutes}`;

//Search Section

//Current Location

let checkCurrentTemp = document.querySelector("#current-button"); 
checkCurrentTemp.addEventListener("click",searchCurrent);

function getTempForCurrent(response){
let receivedTemp = Math.round(response.data.main.temp);
let receivedCity = response.data.name;
let resultCity = document.querySelector(".city-name");
let resultTemp = document.querySelector("#temp-current");
resultTemp.innerHTML = `${receivedTemp}°C`
resultCity.innerHTML = receivedCity;

}
function showWeatherCurrent(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "616b14cbd38253313b3b8852fa77335d";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getTempForCurrent);

}

function searchCurrent(event){
   event.preventDefault();
navigator.geolocation.getCurrentPosition(showWeatherCurrent);
}

// Specific Location

let form = document.querySelector("form");

function findCityTemp(response){
let receivedTemp = Math.round(response.data.main.temp);
let receivedCity = response.data.name;
let resultCity = document.querySelector(".city-name");
let resultTemp = document.querySelector("#temp-current");
resultTemp.innerHTML = `${receivedTemp}°C`
resultCity.innerHTML = receivedCity;
}
function displaySearchCity(event){
event.preventDefault();
let apiKey = "616b14cbd38253313b3b8852fa77335d";
let searchedCity = document.querySelector("#city");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(findCityTemp);
}

form.addEventListener("submit", displaySearchCity);