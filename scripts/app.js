//importing api keys from enviornment.js
import {prod, dev} from "./environment.js";
let apiKey = "&appid=";
if (prod.isLive){
    apiKey += prod.apiKey;
} else {
    apiKey += dev.apiKey;
}
//import {} from "./localStorage.js" -- 
import { saveFavoriteToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


//declare variables from HTML elements
//bg image
let backgroundImage = document.getElementById("backgroundImage");

//search bar
let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");

//inject favorites area
let favoritesListBtn = document.getElementById("favoritesListBtn");
let injectFavorites = document.getElementById("injectFavorites");

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
let todayForecastHighTemp = document.getElementById("todayForecastHighTemp");

//declare variables for keeping track of data fetched from Weather API
let locationApiTempStorage;
let reverseGeoLocationTempStorage;
let locationApiURL = "";

let currentCityInfo;
let currentCity5DayInfo;
let latitude = "";
let longitude = "";
let cityName = "";
let currentStateVar = "";
let currentCountryVar = "";
let lowIconVarTracker;
let highIconVarTracker;
let lowDescripVarTracker;
let highDescripVarTracker;

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

};

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
    backgroundImage.style.backgroundImage = `url("${EvaluateCurrentBackground(currentCityInfo.weather[0].icon)}")`;
    currentWeatherDescription.textContent = currentCityInfo.weather[0].main;
};

//five day weather forecast fetch/call
async function AsyncFiveDayWeather(lat, lon){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${apiKey}&units=imperial`);
    const data = await promise.json();
    currentCity5DayInfo = data;
    console.log(currentCity5DayInfo);
    Parse5DayForecastInfo();
};

//parsing state names into state codes custom function
function ParseStateInfo(state){
    let stateCode;
    switch(state){
        case "Alabama": stateCode = "AL"; break;
        case "Alaska": stateCode = "AK"; break;
        case "Arizona": stateCode = "AZ"; break;
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
};

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
    AsyncFiveDayWeather(latitude, longitude);
};

function error(err){
    console.warn(err.message);
};

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

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
};

//totally unnecessary functions that parse date/time data
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
};

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
};

function EvaluateHours(date){
    let temp = date.getHours();
    let result = "";
    if (temp <= 23 && temp >= 13){
        result = (temp - 12);
        currentTimeAmPm = "pm";
    } else if (temp == 12){
        result = temp;
        currentTimeAmPm = "pm";
    } else if (temp <= 11 && temp >= 1){
        result = temp;
        currentTimeAmPm = "am";
    } else if (temp == 0) {
        result = 12;
        currentTimeAmPm = "am";
    }
    return result;
};

function EvaluateMins(date){
    let result = "";
    if (date.getMinutes() <= 9){
        result = "0" + date.getMinutes();
    } else {
        result = date.getMinutes();
    }
    return result;
};

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
};

//function that determines the weather icons used across the website based on API inputs
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
};

//function that determines the background based on the returned API data
function EvaluateCurrentBackground(input){
    let result = "";
    switch(input){
        case "01d" || "01n": result = "../assets/images/bgImages/sunnyDay.jpg"; break;
        case "02d" || "02n": result = "../assets/images/bgImages/scatteredClouds.jpg"; break;
        case "03d" || "03n": result = "../assets/images/bgImages/sunBehindCloud.jpg"; break;
        case "04d" || "04n": result = "../assets/images/bgImages/cloudy.jpg"; break;
        case "09d" || "09n": result = "../assets/images/bgImages/sunAndRain.jpg"; break;
        case "10d" || "10n": result = "../assets/images/bgImages/rainyDay.jpg"; break;
        case "11d" || "11n": result = "../assets/images/bgImages/thunder.jpg"; break;
        case "13d" || "13n": result = "../assets/images/bgImages/snow.jpg"; break;
        case "50d" || "50n": result = "../assets/images/bgImages/fog.jpg"; break;
        default: result = "../assets/images/bgImages/sunnyDay.jpg"; break;
    }
    return result;
};

//function that does the bulk of processing the 5-Day Weather Forecast data from the 5-Day Forecast API
function Parse5DayForecastInfo(){
    //declare arrays to organize and hold the data of different days
    let sunArr = [];
    let monArr = [];
    let tueArr = [];
    let wedArr = [];
    let thuArr = [];
    let friArr = [];
    let satArr = [];

    //function that will parse date-time info to find the day
    const dayFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
    })

    //variable to hold the day of the first data point to reference beginning of 5-day forecast
    let beginningDate = dayFormatter.format(currentCity5DayInfo.list[0].dt * 1000);
    console.log(beginningDate);

    //for loop that sorts data into different days
    for (let i = 0; i < currentCity5DayInfo.list.length; i++){
        let tempInfo = dayFormatter.format(currentCity5DayInfo.list[i].dt * 1000);
        if (tempInfo == "Sunday"){
            sunArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Monday"){
            monArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Tuesday"){
            tueArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Wednesday"){
            wedArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Thursday"){
            thuArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Friday"){
            friArr.push(currentCity5DayInfo.list[i]);
        } else if (tempInfo == "Saturday"){
            satArr.push(currentCity5DayInfo.list[i]);
        }
    }

    //switch statement to determine the order with which each day's information is presented
    switch (beginningDate){
        case "Sunday":
            Process5DayInfoForOutput(sunArr, monArr, tueArr, wedArr, thuArr);
            break;
        case "Monday":
            Process5DayInfoForOutput(monArr, tueArr, wedArr, thuArr, friArr);
            break;
        case "Tuesday":
            Process5DayInfoForOutput(tueArr, wedArr, thuArr, friArr, satArr);
            break;
        case "Wednesday":
            Process5DayInfoForOutput(wedArr, thuArr, friArr, satArr, sunArr);
            break;
        case "Thursday":
            Process5DayInfoForOutput(thuArr, friArr, satArr, sunArr, monArr);
            break;
        case "Friday":
            Process5DayInfoForOutput(friArr, satArr, sunArr, monArr, tueArr);
            break;
        case "Saturday":
            Process5DayInfoForOutput(satArr, sunArr, monArr, tueArr, wedArr);
            break;
        default:
            break;
    }
};

//function that processes the information from the 5-day weather forecast and populates the webpage with weather data
function Process5DayInfoForOutput(arr1, arr2, arr3, arr4, arr5){
    const dayFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
    })

    fiveDayTitle1.textContent = dayFormatter.format(arr1[0].dt * 1000);
    fiveDayTitle2.textContent = dayFormatter.format(arr2[0].dt * 1000);
    fiveDayTitle3.textContent = dayFormatter.format(arr3[0].dt * 1000);
    fiveDayTitle4.textContent = dayFormatter.format(arr4[0].dt * 1000);
    fiveDayTitle5.textContent = dayFormatter.format(arr5[0].dt * 1000);

    fiveDayImg1.src = EvaluateWeatherIcon(Determine5DayIcons(arr1));
    fiveDayImg2.src = EvaluateWeatherIcon(Determine5DayIcons(arr2));
    fiveDayImg3.src = EvaluateWeatherIcon(Determine5DayIcons(arr3));
    fiveDayImg4.src = EvaluateWeatherIcon(Determine5DayIcons(arr4));
    fiveDayImg5.src = EvaluateWeatherIcon(Determine5DayIcons(arr5));

    fiveDay1High.textContent = FindHighTemp(arr1);
    fiveDay2High.textContent = FindHighTemp(arr2);
    fiveDay3High.textContent = FindHighTemp(arr3);
    fiveDay4High.textContent = FindHighTemp(arr4);
    fiveDay5High.textContent = FindHighTemp(arr5);

    fiveDay1Low.textContent = FindLowTemp(arr1);
    fiveDay2Low.textContent = FindLowTemp(arr2);
    fiveDay3Low.textContent = FindLowTemp(arr3);
    fiveDay4Low.textContent = FindLowTemp(arr4);
    fiveDay5Low.textContent = FindLowTemp(arr5);

    ProcessDataForTodayForcast(arr1);
};

function ProcessDataForTodayForcast(arr){
    FindHighTemp(arr);
    FindLowTemp(arr);

    todayForecastLowIcon.src = EvaluateWeatherIcon(lowIconVarTracker);
    todayForecastHighIcon.src = EvaluateWeatherIcon(highIconVarTracker);
    
    todayForecastLowDescription.textContent = lowDescripVarTracker;
    todayForecastHighDescription.textContent = highDescripVarTracker;

    todayForecastLowTemp.textContent = FindLowTemp(arr);
    todayForecastHighTemp.textContent = FindHighTemp(arr);
};

//function to find which dataset represents the highest temp
function FindHighTemp(arr){
    let result = arr[0].main.temp;
    for (let i = 0; i < arr.length; i++){
        if (arr[i].main.temp > result) {
            result = arr[i].main.temp;
            highIconVarTracker = arr[i].weather[0].icon;
            highDescripVarTracker = arr[i].weather[0].main;
        }
    }
    return Math.round(result);
};

//function to find which dataset represents the lowest temp
function FindLowTemp(arr){
    let result = arr[0].main.temp;
    for (let i = 0; i < arr.length; i++){
        if (arr[i].main.temp < result) {
            result = arr[i].main.temp;
            lowIconVarTracker = arr[i].weather[0].icon;
            lowDescripVarTracker = arr[i].weather[0].main;
        }
    }
    return Math.round(result);
};

//function to determine which weather icon should represent a day in the 5-day forcast
function Determine5DayIcons(arr){
    let result = arr[0].weather[0].icon;
    for (let i = 0; i < arr.length; i++){
        switch(arr[i].weather[0].icon){
            case "13d" || "13n":
                result = "13d";
                break;
            case "11d" || "11n": 
                if (result != "13d" || result != "13n"){
                    result = "11d";
                }
                break;
            case "10d" || "10n":
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n"){
                    result = "10d";
                } 
                break;
            case "50d" || "50n": 
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n" || result != "10d" || result != "10n"){
                    result = "50d";
                }
                break;
            case "09d" || "09n":
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n" || result != "10d" || result != "10n" || result != "50d" || result != "50n"){
                    result = "09d";
                }
                break;
            case "04d" || "04n":
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n" || result != "10d" || result != "10n" || result != "50d" || result != "50n" || result != "09d" || result != "09n"){
                    result = "04d";
                }
                break;
            case "03d" || "03n": 
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n" || result != "10d" || result != "10n" || result != "50d" || result != "50n" || result != "09d" || result != "09n" || result != "04d" || result != "04n"){
                    result = "03d";
                }
                break;
            case "02d" || "02n":
                if (result != "13d" || result != "13n" || result != "11d" || result != "11n" || result != "10d" || result != "10n" || result != "50d" || result != "50n" || result != "09d" || result != "09n" || result != "04d" || result != "04n" || result != "03d" || result != "03n"){
                    result = "02d";
                }
                break;
            default: 
                result = "01d"; 
                break;
        }
        console.log(result);
    }
    return result;
};

//event listeners
submitBtn.addEventListener("click", function(){
    AsyncLocalWeatherCoords(searchInput.value);
});

addFavBtn.addEventListener("click", function(){
    console.log();
    let location = {lon: longitude, lat: latitude, name: cityName, state: currentStateVar};
    saveFavoriteToLocalStorage(location);
    if (injectFavorites.innerHTML != ""){
        injectFavorites.innerHTML = "";
        CreateElements();
    }
});

favoritesListBtn.addEventListener("click", function(){
    injectFavorites.innerHTML = "";
    let localStorageData = getLocalStorage();
    console.log(localStorageData);
    CreateElements();
});

//function for creating/displaying favorite's list
function CreateElements(){
    let favorites = getLocalStorage();
    console.log(favorites);
    favorites.map(city => {

        let cityBtn = document.createElement('button');
        cityBtn.className = 'btn add-fav-btn';
        cityBtn.textContent = city.name + ", " + city.state;
        cityBtn.type = 'button'
        cityBtn.style = 'border-radius: 15px 0px 0px 15px; background-color: rgba(10, 17, 40, .8);';
        cityBtn.addEventListener('click', function(){
            latitude = city.lat;
            longitude = city.lon;
            AsyncReverseGeocoding(latitude, longitude);
            AsyncLocalWeather(latitude, longitude);
            EvaluateCurrentTime();
            AsyncFiveDayWeather(latitude, longitude);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'X';
        deleteBtn.type = 'button';
        deleteBtn.style = 'height: 44px; width: 44px; border-radius: 0px 15px 15px 0px; background-color: rgba(220, 53, 69, .8);';
        deleteBtn.addEventListener('click', function(){
            removeFromLocalStorage(city);
            injectFavorites.innerHTML = "";
            CreateElements();
        });

        let outsideDiv = document.createElement("div");
        outsideDiv.style = 'margin-bottom: 1rem;';
        outsideDiv.className = 'fadeIn';

        outsideDiv.appendChild(cityBtn);
        outsideDiv.appendChild(deleteBtn);

        injectFavorites.appendChild(outsideDiv);
    });
    let closeFavorites = document.createElement('button');
    closeFavorites.className = 'btn add-fav-btn';
    closeFavorites.textContent = 'Close Favorites';
    closeFavorites.type = 'button';
    closeFavorites.style = 'width: 399px; background-color: rgba(10, 17, 40, .8);';
    closeFavorites.addEventListener('click', function(){
        injectFavorites.innerHTML = "";
    });

    let closeBtnDiv = document.createElement("div");
    closeBtnDiv.className = 'fadeIn';

    closeBtnDiv.appendChild(closeFavorites);
    injectFavorites.appendChild(closeBtnDiv);
};