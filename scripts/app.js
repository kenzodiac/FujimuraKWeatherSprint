//import {} from "./localStorage.js"

//declare variables from HTML elements
let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");

let currentTemp = document.getElementById("currentTemp");
let addFavBtn = document.getElementById("addFavBtn");
let currentLoc = document.getElementById("currentLoc");
let currentState = document.getElementById("currentState");
let currentTime = document.getElementById("currentTime");
let currentDate = document.getElementById("currentDate");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");

let fiveDayTitle1 = document.getElementById("fiveDayTitle1");
let fiveDayTitle2 = document.getElementById("fiveDayTitle2");
let fiveDayTitle3 = document.getElementById("fiveDayTitle3");
let fiveDayTitle4 = document.getElementById("fiveDayTitle4");
let fiveDayTitle5 = document.getElementById("fiveDayTitle5");

let fiveDayImg1 = document.getElementById("fiveDayImg1");
let fiveDayImg2 = document.getElementById("fiveDayImg2");
let fiveDayImg3 = document.getElementById("fiveDayImg3");
let fiveDayImg4 = document.getElementById("fiveDayImg4");
let fiveDayImg5 = document.getElementById("fiveDayImg5");

let fiveDay1High = document.getElementById("fiveDay1High");
let fiveDay2High = document.getElementById("fiveDay2High");
let fiveDay3High = document.getElementById("fiveDay3High");
let fiveDay4High = document.getElementById("fiveDay4High");
let fiveDay5High = document.getElementById("fiveDay5High");

let fiveDay1Low = document.getElementById("fiveDay1Low");
let fiveDay2Low = document.getElementById("fiveDay2Low");
let fiveDay3Low = document.getElementById("fiveDay3Low");
let fiveDay4Low = document.getElementById("fiveDay4Low");
let fiveDay5Low = document.getElementById("fiveDay5Low");


let todayForecastLowIcon = document.getElementById("todayForecastLowIcon");
let todayForecastLowDescription = document.getElementById("todayForecastLowDescription");
let todayForecastLowTemp = document.getElementById("todayForecastLowTemp");

let todayForecastHighIcon = document.getElementById("todayForecastHighIcon");
let todayForecastHighDescription = document.getElementById("todayForecastHighDescription");
let todayForecastHighTemp = document.getElementById("todayForecastLowTemp");

//declare variables for keeping track of data fetched from Weather API
let locationApiTempStorage;
let locationApiURL = "";
let currentWeatherApiURL = "";

let currentCity;
let currentCityInfo;
let currentCity5DayInfo;
let savedInput = "";
let latitude = "";
let longitude = "";
let cityName = "";


async function AsyncLocalWeatherCoords(searchInput){
    locationApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=543bd604775c751180b1c9722a1db386";
    const promise = await fetch(locationApiURL);
    const data = await promise.json();
    locationApiTempStorage = data;
    console.log(locationApiTempStorage);
    cityName = locationApiTempStorage[0].name;
    latitude = locationApiTempStorage[0].lat;
    longitude = locationApiTempStorage[0].lon;
    console.log("location: " + cityName + "; latitude: " + latitude + "; longitude: " + longitude);
    AsyncLocalWeather(latitude, longitude);
    AsyncFiveDayWeather(latitude, longitude);
}

async function AsyncLocalWeather(lat, lon){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=543bd604775c751180b1c9722a1db386&units=imperial`);
    const data = await promise.json();
    currentCityInfo = data;
    console.log(currentCityInfo);
    cityName = currentCityInfo.name;
    currentLoc.textContent = currentCityInfo.name;
    currentTemp.textContent = Math.round(currentCityInfo.main.temp);
    currentState.textContent = locationApiTempStorage[0].state;
}

async function AsyncFiveDayWeather(lat, lon){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=543bd604775c751180b1c9722a1db386&units=imperial"`);
    const data = await promise.json();
    currentCity5DayInfo = data;
    console.log(currentCity5DayInfo);
}

//event listeners
submitBtn.addEventListener("click", function(){
    AsyncLocalWeatherCoords(searchInput.value);
    // fiveDayWeather(latitude, longitude);
});

addFavBtn.addEventListener("click", function(){

});