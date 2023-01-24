//import {} from "./localStorage.js"

let searchInput = document.getElementById("searchInput");
let submitBtn = document.getElementById("submitBtn");


let currentCity;
let savedInput = "";
let locationApiURL = "";
let latitude = "";
let longitude = "";

submitBtn.addEventListener("click", function(){
    localWeatherCoords(searchInput);
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

function localWeatherCoords(searchInput){
    savedInput = searchInput.value;
    locationApiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + savedInput + "&limit=1&appid=543bd604775c751180b1c9722a1db386";
    urlCall(locationApiURL);
    // latitude = currentCity.lat;
    // longitude = currentCity.lon;
    console.log(currentCity);
}

//lololol