import {prod, dev} from "./environment.js";
let apiKey = "&appid=";
if (prod.isLive){
    apiKey += prod.apiKey;
} else {
    apiKey += dev.apiKey;
}
//import {} from "./localStorage.js"

//declare variables from HTML elements
//search bar
let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");

//current weather info
let currentTemp = document.getElementById("currentTemp");
let addFavBtn = document.getElementById("addFavBtn");
let currentLoc = document.getElementById("currentLoc");
let currentState = document.getElementById("currentState");
let currentTime = document.getElementById("currentTime");
let currentDate = document.getElementById("currentDate");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentWeatherDescription = document.getElementById("currentWeatherDescription");

//five day forecast info
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

//forecast low
let todayForecastLowIcon = document.getElementById("todayForecastLowIcon");
let todayForecastLowDescription = document.getElementById("todayForecastLowDescription");
let todayForecastLowTemp = document.getElementById("todayForecastLowTemp");

//forecast high
let todayForecastHighIcon = document.getElementById("todayForecastHighIcon");
let todayForecastHighDescription = document.getElementById("todayForecastHighDescription");
let todayForecastHighTemp = document.getElementById("todayForecastLowTemp");

//declare variables for keeping track of data fetched from Weather API
let locationApiTempStorage;
let reverseGeoLocationTempStorage;
let locationApiURL = "";
let currentWeatherApiURL = "";

let currentCity;
let currentCityInfo;
let currentCity5DayInfo;
let savedInput = "";
let latitude = "";
let longitude = "";
let cityName = "";
let currentStateVar = "";
let currentCountryVar = "";

let currentTimeData = new Date();
let currentTimeAmPm;
let currentTimeHours = EvaluateHours(currentTimeData);
let currentTimeMins = currentTimeData.getMinutes();
let currentTimeMonth = EvaluateMonth(currentTimeData);
let currentTimeDayOfWeek = EvaluateDayOfWeek(currentTimeData);
let currentTimeDay = currentTimeData.getDay();
let currentTimeYear = currentTimeData.getFullYear();

//geolocation api fetch/call
async function AsyncLocalWeatherCoords(searchInput){
    locationApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1" + apiKey;
    const promise = await fetch(locationApiURL);
    const data = await promise.json();
    locationApiTempStorage = data;
    console.log(locationApiTempStorage);
    cityName = locationApiTempStorage[0].name;
    latitude = locationApiTempStorage[0].lat;
    longitude = locationApiTempStorage[0].lon;
    currentStateVar = locationApiTempStorage[0].state;
    currentCountryVar = locationApiTempStorage[0].country;
    currentStateVar = ParseStateInfo(currentStateVar);
    currentState.textContent = currentStateVar;
    console.log("location: " + cityName + "; latitude: " + latitude + "; longitude: " + longitude);
    AsyncLocalWeather(latitude, longitude);
    AsyncFiveDayWeather(latitude, longitude);

}

//current weather api fetch/call
async function AsyncLocalWeather(lat, lon){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}&units=imperial`);
    const data = await promise.json();
    currentCityInfo = data;
    console.log(currentCityInfo);
    cityName = currentCityInfo.name;
    currentLoc.textContent = currentCityInfo.name;
    currentTemp.textContent = Math.round(currentCityInfo.main.temp);
    currentWeatherIcon.src = EvaluateWeatherIcon(currentCityInfo.weather[0].icon);
    currentWeatherDescription.textContent = currentCityInfo.weather[0].main;
}

//five day weather forecast fetch/call
async function AsyncFiveDayWeather(lat, lon){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}&units=imperial"`);
    const data = await promise.json();
    currentCity5DayInfo = data;
    console.log(currentCity5DayInfo);
}

//parsing state names into state codes custom function
function ParseStateInfo(state){
    let stateCode;
    switch(state){
        case "Alabama": stateCode = "AL"; break;
        case "Alaska": stateCode = "AK"; break;
        case "Arizona": stateCode = "AR"; break;
        case "Arkansas": stateCode = "AR"; break;
        case "American Samoa": stateCode = "AS"; break;
        case "California": stateCode = "CA"; break;
        case "Colorado": stateCode = "CO"; break;
        case "Connecticut": stateCode = "CT"; break;
        case "Delaware": stateCode = "DE"; break;
        case "District of Columbia": stateCode = "DC"; break;
        case "Florida": stateCode = "FL"; break;
        case "Georgia": stateCode = "GA"; break;
        case "Guam": stateCode = "GU"; break;
        case "Hawaii": stateCode = "HI"; break;
        case "Idaho": stateCode = "ID"; break;
        case "Illinois": stateCode = "IL"; break;
        case "Indiana": stateCode = "IN"; break;
        case "Iowa": stateCode = "IA"; break;
        case "Kansas": stateCode = "KS"; break;
        case "Kentucky": stateCode = "KY"; break;
        case "Louisiana": stateCode = "LA"; break;
        case "Maine": stateCode = "ME"; break;
        case "Maryland": stateCode = "MD"; break;
        case "Massachusetts": stateCode = "MA"; break;
        case "Michigan": stateCode = "MI"; break;
        case "Minnesota": stateCode = "MN"; break;
        case "Mississippi": stateCode = "MS"; break;
        case "Missouri": stateCode = "MO"; break;
        case "Montana": stateCode = "MT"; break;
        case "Nebraska": stateCode = "NE"; break;
        case "Nevada": stateCode = "NV"; break;
        case "New Hampshire": stateCode = "NH"; break;
        case "New Jersey": stateCode = "NJ"; break;
        case "New Mexico": stateCode = "NM"; break;
        case "New York": stateCode = "NY"; break;
        case "North Carolina": stateCode = "NC"; break;
        case "North Dakota": stateCode = "ND"; break;
        case "Northern Mariana Islands": stateCode = "MP"; break;
        case "Ohio": stateCode = "OH"; break;
        case "Oklahoma": stateCode = "OK"; break;
        case "Oregon": stateCode = "OR"; break;
        case "Pennsylvania": stateCode = "PA"; break;
        case "Puerto Rico": stateCode = "PR"; break;
        case "Rhode Island": stateCode = "RI"; break;
        case "South Carolina": stateCode = "SC"; break;
        case "South Dakota": stateCode = "SD"; break;
        case "Tennessee": stateCode = "TN"; break;
        case "Texas": stateCode = "TX"; break;
        case "Trust Territories": stateCode = "TT"; break;
        case "Utah": stateCode = "UT"; break;
        case "Vermont": stateCode = "VT"; break;
        case "Virginia": stateCode = "VA"; break;
        case "Virgin Islands": stateCode = "VI"; break;
        case "Washington": stateCode = "WA"; break;
        case "West Virginia": stateCode = "WV"; break;
        case "Wisconsin": stateCode = "WI"; break;
        case "Wyoming": stateCode = "WY"; break;
        default: stateCode = currentCountryVar;
    }
    return stateCode;
}

//default location/time obtained from user browser
function success(position){
    console.log(position);
    console.log("latitude: " + position.coords.latitude);
    console.log("longitude: " + position.coords.longitude);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    AsyncReverseGeocoding(latitude, longitude);
    AsyncLocalWeather(latitude, longitude);
    EvaluateCurrentTime();
}

function error(err){
    console.warn(err.message);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

navigator.geolocation.getCurrentPosition(success, error, options);

//reverse geocoding api fetch/call for defualt location based on obtained location data from user browser
async function AsyncReverseGeocoding(lat, lon){
    locationApiURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}${apiKey}`;
    const promise = await fetch(locationApiURL);
    const data = await promise.json();
    reverseGeoLocationTempStorage = data;
    currentStateVar = reverseGeoLocationTempStorage[0].state;
    currentCountryVar = reverseGeoLocationTempStorage[0].country;
    currentStateVar = ParseStateInfo(currentStateVar);
    currentState.textContent = currentStateVar;
}

function EvaluateDayOfWeek(date){
    let result = "";
    switch(date.getDay()){
        case 0: result = "Sunday"; break;
        case 1: result = "Monday"; break;
        case 2: result = "Tuesday"; break;
        case 3: result = "Wednesday"; break;
        case 4: result = "Thursday"; break;
        case 5: result = "Friday"; break;
        case 6: result = "Saturday"; break;
        default: break;
    }
    return result;
}

function EvaluateMonth(date){
    let result ="";
    switch(date.getMonth()){
        case 0: result = "January"; break;
        case 1: result = "February"; break;
        case 2: result = "March"; break;
        case 3: result = "April"; break;
        case 4: result = "May"; break;
        case 5: result = "June"; break;
        case 6: result = "July"; break;
        case 7: result = "August"; break;
        case 8: result = "September"; break;
        case 9: result = "October"; break;
        case 10: result = "November"; break;
        case 11: result = "December"; break;
        default: break;
    }
    return result;
}

function EvaluateHours(date){
    let temp = date.getHours();
    let result = "";
    if (temp <= 23 && temp >= 13){
        result = temp - 12;
        currentTimeAmPm = "pm";
    } else if (temp = 12){
        result = temp;
        currentTimeAmPm = "pm";
    } else if (temp <= 11 && temp >= 1){
        result = temp;
        currentTimeAmPm = "am";
    } else {
        result = 12;
        currentTimeAmPm = "am";
    }
    return result;
}

function EvaluateMins(date){
    let result = "";
    if (date.getMinutes() <= 9){
        result = "0" + date.getMinutes();
    } else {
        result = date.getMinutes();
    }
    return result;
}

function EvaluateCurrentTime(){
    currentTimeData = new Date();
    console.log(currentTimeData.getHours());
    currentTimeHours = EvaluateHours(currentTimeData);
    currentTimeMins = EvaluateMins(currentTimeData);
    currentTimeMonth = EvaluateMonth(currentTimeData);
    currentTimeDayOfWeek = EvaluateDayOfWeek(currentTimeData);
    currentTimeDay = currentTimeData.getDate();
    currentTimeYear = currentTimeData.getFullYear();
    currentTime.textContent = currentTimeHours +  ":" + currentTimeMins + currentTimeAmPm;
    currentDate.textContent = currentTimeMonth + " " + currentTimeDay + ", " + currentTimeYear;
}

function EvaluateWeatherIcon(input){
    let result = "";
    switch(input){
        case "01d": result = "../assets/images/weatherIcons/sunIcon.png"; break;
        case "01n": result = "../assets/images/weatherIcons/clearMoonIcon.png"; break;
        case "02d" || "02n": result = "../assets/images/weatherIcons/sunBehindSmallCloudIcon.png"; break;
        case "03d" || "03n": result = "../assets/images/weatherIcons/sunBehindCloudIcon.png"; break;
        case "04d" || "04n": result = "../assets/images/weatherIcons/cloudIcon.png"; break;
        case "09d" || "09n": result = "../assets/images/weatherIcons/sunBehindRainCloudIcon.png"; break;
        case "10d" || "10n": result = "../assets/images/weatherIcons/rainCloudIcon.png"; break;
        case "11d" || "11n": result = "../assets/images/weatherIcons/lightningCloudIcon.png"; break;
        case "13d" || "13n": result = "../assets/images/weatherIcons/snowflakeIcon.png"; break;
        case "50d" || "50n": result = "../assets/images/weatherIcons/fogIcon.png"; break;
        default: result = "../assets/images/weatherIcons/sunIcon.png"; break;
    }
    return result;
}


//event listeners
submitBtn.addEventListener("click", function(){
    AsyncLocalWeatherCoords(searchInput.value);
});

addFavBtn.addEventListener("click", function(){

});