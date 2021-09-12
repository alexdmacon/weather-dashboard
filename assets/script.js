var APIKey = "e256b571cb3fa1813dc8566aad393b43";
var city;




var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}