var city;
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");


function citySearch(event){
    event.preventDefault();
    var searchInput = document.querySelector("#city-search-input");
    city = searchInput.value;
    if (city) {
        console.log(city);
        forecastWeather(city);
    }
}

function forecastWeather(city) {
    var APIKey = "e256b571cb3fa1813dc8566aad393b43";
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

searchForm.addEventListener("submit", citySearch);

/* var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit); */ 