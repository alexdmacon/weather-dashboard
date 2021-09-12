var city;
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var todayForecast = document.querySelector("#today-forecast");
var todayDate = dayjs().format("MMMM D, YYYY");

// Form submit handler
searchForm.addEventListener("submit", citySearch);

// Controls the search form. Takes city name input and carries it over as parameter for the next function that fetches the API data.
function citySearch(event){
    event.preventDefault();

    var searchInput = document.querySelector("#city-search-input");
    city = searchInput.value;

    if (city) {
        console.log(city);
        forecastWeather(city);
    }
}

// fetches data from OpenWeather API using city input.
function forecastWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data, city);
            }
            )
    })
}

function displayForecast() {
    console.log(todayDate);
    todayForecast.textContent.todayDate;
}

