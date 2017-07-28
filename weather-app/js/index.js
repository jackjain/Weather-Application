var unit = "<sup>o</sup>C";
var temp;
$(document).ready(function() {
  var x = document.getElementById("user-location");
  getLocation_weather();
  $("#unit-toggle").change(function() {
    if ($(this).is(":checked")) {
      unit = "<sup>o</sup>C";
      $("#temperature").html("<p>Temperature : " + temp + " " + unit + "</p>");
    } else {
      unit = "<sup>o</sup>F";
      $("#temperature").html(
        "<p>Temperature : " + (9 / 5.0 * temp + 32) + " " + unit + "</p>"
      );
    }
  });
  
  // getWeatherData();
});

function getLocation_weather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      // console.log(lat + " " + lng);
      $.ajax({
        url:
          "https://fcc-weather-api.glitch.me/api/current?lon=" +
            lng +
            "&lat=" +
            lat,
        dataType: "jsonp",
        success: function(data) {
          $("#user-location").html(
            "<p>Location(Longitude,Lattitude):(" +
              Math.round(lng) +
              "," +
              Math.round(lat) +
              ")"
          );
          $("#temperature").html(
            "<p>Temperature : " +
              JSON.stringify(data.main.temp) +
              " " +
              unit +
              "</p>"
          );
          temp = data.main.temp;
          $("#description").html(
            "<p>Description: " +
              (data.weather[0].description[0].toUpperCase() +
                data.weather[0].description.substring(1))
          );
          $("#weather-image").html(
            '<img src="' +
              data.weather[0].icon +
              '" alt="' +
              data.weather[0].description +
              '" ></img>'
          );
        }
      });
    });
  } else {
    console.log("Hi");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}