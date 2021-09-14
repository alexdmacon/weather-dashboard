var city;
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var todayForecast = document.querySelector("#today-forecast");
var todayDate = dayjs().format("MM/DD/YYYY");
var fiveDayForecastEls = document.querySelectorAll(".day-forecast");
var fiveDayDiv = document.querySelector("#five-day-forecast");
var pastSearches = $("#past-searches");
var searches = 0;
var pastSearchesKeywords = [];
var fiveDayDisplay = "";

localStorage.clear();

// Form submit handler
searchForm.addEventListener("submit", citySearch);

// Controls the search form. Takes city name input and carries it over as parameter for the next function that fetches the API data.
function citySearch(event) {
  event.preventDefault();

  var searchInput = document.querySelector("#city-search-input");
  city = searchInput.value;

  if (city) {
    console.log(city);
    forecastWeather(city);
    fiveDayForecast(city);

    // Takes input and pushes it into an array to be stashed in localStorage
    pastSearchesKeywords.push(city);

    localStorage.setItem("pastSearches", JSON.stringify(pastSearchesKeywords));
    searches = searches + 1;

    displaySearches();
  }
}

// gets previous inputs out of localStorage and displays them on page. Also creates necessary class and id tags to click past search items to renew weather forecast.
function displaySearches() {
  pastSearches.empty();
  var searchHistory = JSON.parse(localStorage.pastSearches);
  for (let i = 0; i < searchHistory.length; i++) {
    var pastSearch = searchHistory[i];
    var searchDisplay = document.createElement("BUTTON");
    searchDisplay.textContent = pastSearch;
    searchDisplay.setAttribute("class", "city-search-buttons");
    searchDisplay.setAttribute("id", pastSearch);
    console.log(pastSearch);
    pastSearches.append(searchDisplay);

    // Clicking one of the newly created buttons fires the searchAgain function, which will get the forecasts for the previously searched city that is clicked
    searchDisplay.addEventListener("click", searchAgain);
  }
}

function searchAgain(event) {
  var city = event.target.getAttribute("id");
  if (city) {
    forecastWeather(city);
    fiveDayForecast(city);
  }
}

function forecastWeather(city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  // clears previous forecast data
  todayForecast.textContent = "";
  fiveDayForecastEls.textContent = "";
  fiveDayDisplay.textContent = "";

  // fetches data from OpenWeather API using city input.
  fetch(queryURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      console.log(data.main.temp);

      //displays today's date and name of city searched
      var dateDisplay = document.createElement("h2");
      dateDisplay.textContent = city + " " + todayDate;
      todayForecast.append(dateDisplay);

      //displays icon image showing today's weather
      var weatherIcon = data.weather[0].icon;
      var iconDisplay = document.createElement("img");
      iconDisplay.width = 100;
      iconDisplay.height = 100;
      iconDisplay.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      todayForecast.append(iconDisplay);

      // display's today's temp
      var tempDisplay = document.createElement("li");
      tempDisplay.textContent = "Temp: " + data.main.temp + "°F";
      todayForecast.append(tempDisplay);

      // displays today's wind speed
      var windDisplay = document.createElement("li");
      windDisplay.textContent = "Wind: " + data.wind.speed + " MPH";
      todayForecast.append(windDisplay);

      // displays today's humidity
      var humidityDisplay = document.createElement("li");
      humidityDisplay.textContent = "Humidity: " + data.main.humidity + "%";
      todayForecast.append(humidityDisplay);

      //Where the heck do I find the UV index?
      // https://openweather.co.uk/blog/post/uv-index-now-part-one-call-api

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
      getUV(lat, lon);
    });
  });
}

// get and display UV index info.
function getUV(lat, lon) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey;
  fetch(queryURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      var uvDisplay = document.createElement("li");
      var uvDisplayNumber = document.createElement("span")
      uvDisplay.textContent = "UV Index: ";
      uvDisplayNumber.textContent = data.current.uvi;

      if (data.current.uvi < 4) {
        uvDisplayNumber.setAttribute("class", "favorable");
      } else if (data.current.uvi < 8) {
        uvDisplayNumber.setAttribute("class", "moderate");
      } else {
        uvDisplayNumber.setAttribute("class", "severe");
      }
      todayForecast.append(uvDisplay);
      uvDisplay.append(uvDisplayNumber);
    });
  });
}

// uses different API URL (but same city value from input form) to fetch different set of data, in this case for the 5-day forecast
function fiveDayForecast(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  fetch(queryURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      fiveDayDisplay = document.createElement("h2");
      fiveDayDisplay.textContent = "5-Day Forecast";
      fiveDayDiv.append(fiveDayDisplay);

      // loop populates five-day forecast section with appropriate data
      for (let i = 0; i < 5; i++) {
        fiveDayForecastEls[i].innerHTML = "";

        //gets dates for 5-day forecast
        var forecastDay = dayjs()
          .add(i + 1, "day")
          .format("MM/DD/YYYY");
        console.log(forecastDay);
        var forecastDayDisplay = document.createElement("h3");
        forecastDayDisplay.textContent = forecastDay;
        fiveDayForecastEls[i].append(forecastDayDisplay);

        var weatherIcon = data.list[i].weather[0].icon;
        var iconDisplay = document.createElement("img");
        iconDisplay.width = 100;
        iconDisplay.height = 100;
        iconDisplay.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        );
        fiveDayForecastEls[i].append(iconDisplay);

        var tempDisplay = document.createElement("li");
        tempDisplay.textContent = "Temp: " + data.list[i].main.temp + "°F";
        fiveDayForecastEls[i].append(tempDisplay);

        var windDisplay = document.createElement("li");
        windDisplay.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        fiveDayForecastEls[i].append(windDisplay);

        var humidityDisplay = document.createElement("li");
        humidityDisplay.textContent =
          "Humidity: " + data.list[i].main.humidity + "%";
        fiveDayForecastEls[i].append(humidityDisplay);
      }
    });
  });
}
