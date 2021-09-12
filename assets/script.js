var city;
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#search-button");
var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var todayForecast = document.querySelector("#today-forecast");
var todayDate = dayjs().format("MM/DD/YYYY");

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
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
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
            iconDisplay.width=100;
            iconDisplay.height=100;
            iconDisplay.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            todayForecast.append(iconDisplay);

            // display's todays temp
            var tempDisplay=document.createElement("li");
            tempDisplay.textContent = "Temp: " + data.main.temp + "°F";
            todayForecast.append(tempDisplay);

            // displays today's wind speed
            var windDisplay=document.createElement("li");
            windDisplay.textContent = "Wind: " + data.wind.speed + " MPH";
            todayForecast.append(windDisplay);
            
            // displays today's humidity
            var humidityDisplay=document.createElement("li");
            humidityDisplay.textContent = "Humidity: " + data.main.humidity + " %";
            todayForecast.append(humidityDisplay);

            //Where the heck do I find the UV index?
            var uvDisplay=document.createElement("li");
            uvDisplay.textContent = "UV Index: "

            }
            )
    })
}

