//import {} from "./localStorage.js"

//declare variables from HTML elements
let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");

let currentTemp = document.getElementById("currentTemp");
let addFavBtn = document.getElementById("addFavBtn");
let currentLoc = document.getElementById("currentCity");
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

//declare variables for keeping track of data fetched from Weather API
let currentCity;
let currentCityInfo;
let currentCity5DayInfo;
let savedInput = "";
let locationApiURL = "";
let latitude = "";
let longitude = "";
let cityName = "";

//event listeners
submitBtn.addEventListener("click", function(){
    localWeatherCoords(searchInput);
    localWeather(latitude, longitude);
    fiveDayWeather(latitude, longitude);
})

addFavBtn.addEventListener("click", function(){

})


function urlCall(url){
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            currentCity = data;
        }
    );
}

function urlWeatherCall(url){
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            currentCityInfo = data;
        }
    );
}

function urlFiveDayCall(url){
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            currentCity5DayInfo = data;
        }
    );
}

function localWeatherCoords(searchInput){
    savedInput = searchInput.value;
    locationApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + savedInput + "&limit=1&appid=543bd604775c751180b1c9722a1db386";
    urlCall(locationApiURL);
    latitude = currentCity[0].lat;
    longitude = currentCity[0].lon;
    cityName = currentCity[0].name;
    console.log(currentCity);
    console.log("location: " + currentCity[0].name + ": " + currentCity[0].country);
    console.log("latitude: " + currentCity[0].lat);
    console.log("longitude: " + currentCity[0].lon);
}

function localWeather(lat, lon){
    locationApiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=543bd604775c751180b1c9722a1db386&units=imperial";
    urlWeatherCall(locationApiURL);
    console.log(currentCityInfo);
    console.log("Location: "+ currentCityInfo.name);
    console.log("Current Temp: "+ currentCityInfo.main.temp + "F");
    console.log("Weather: "+ currentCityInfo.weather[0].description);
}

function fiveDayWeather(lat, lon){
    locationApiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=543bd604775c751180b1c9722a1db386&units=imperial";
    urlFiveDayCall(locationApiURL);
    console.log(currentCity5DayInfo);
}