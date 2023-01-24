//import {} from "./localStorage.js"

let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");


let currentCity;
let currentCityInfo;
let currentCity5DayInfo;
let savedInput = "";
let locationApiURL = "";
let latitude = "";
let longitude = "";
let cityName = "";

submitBtn.addEventListener("click", function(){
    localWeatherCoords(searchInput);
    localWeather(latitude, longitude);
    fiveDayWeather(latitude, longitude);
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