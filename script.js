$(document).ready(function() {
   
  // forecast()

  var cities = [];
  // function to display cities
  function rendercity() {
    $(`#cityList`).empty()
    cities.forEach(function(cities){
        let btn = $(`<button> ${ cities } </button>`)
        $(`#cityList`).append(btn)
    })
  }

  // Function to add city to array on click
  $("#addCity").on("click", function(event) {
    event.preventDefault();
    cities.push($(`#inputCity`).val().trim())
    var city = $("#inputCity").val().trim();
    rendercity();
    console.log(city)
    forecast(city)
  });
  

  // Function to retrieve forcast data and display in main card above
  function forecast(cityText) {
      var unit = "&units=imperial"
      var key = "cedb9c57ccdd0a6a3213271aa94438a7"
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityText + unit + "&appid=" + key;
      $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
          var link = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
          $(`#forecast`).html(`
              <h2>${ response.name }</h2>
          `)
          $("#forecastIcon").attr("src",link);
          $(`#temp`).html(`
            <p>Temperature: ${ response.main.temp } <sup>o</sup>F</p>
          `)

          $(`#humidity`).html(`
            <p>Humidity: ${ response.main.humidity }%</p>
          `)
          
          $(`#wind`).html(`
            <p>Wind Speed: ${ response.wind.speed } MPH</p>
          `)
        
          var lon= $( response.coord.lon)
          var lat= $( response.coord.lat )
          var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat[0] + "&lon=" + lon[0];
          $.ajax({
            url: uvURL,
            method: "GET"
            }).then(function(responseUV) {
              $(`#uvIndex`).html(`
                <p>UV Index: ${ responseUV.value }</p>
              `)
            });    
      });
      fiveDayForecast(cityText)
  }

  // Function to retrieve 5 day forcast data and display below main card 
  function fiveDayForecast(cityText) {
    var unit = "&units=imperial"
    var key = "cedb9c57ccdd0a6a3213271aa94438a7"
    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityText + unit + "&appid=" + key;
    $.ajax({
      url: fiveDayURL,
      method: "GET"
      }).then(function(responseForcast) {
        //Tomorrow's forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[5].weather[0].icon + "@2x.png"
        $(`#day1`).html(`
            <h5>${ responseForcast.list[5].dt_txt.slice(5, 7) }/${ responseForcast.list[5].dt_txt.slice(8, 10) }/${ responseForcast.list[5].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day1Icon").attr("src",link);
        $(`#day1Temp`).html(`
            <p>Temp: ${ responseForcast.list[5].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day1Hum`).html(`
            <p>Temp: ${ responseForcast.list[5].main.humidity }%</p>
        `)

        //Day 2 forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[13].weather[0].icon + "@2x.png"
        $(`#day2`).html(`
            <h5>${ responseForcast.list[13].dt_txt.slice(5, 7) }/${ responseForcast.list[13].dt_txt.slice(8, 10) }/${ responseForcast.list[13].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day2Icon").attr("src",link);
        $(`#day2Temp`).html(`
            <p>Temp: ${ responseForcast.list[13].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day2Hum`).html(`
            <p>Temp: ${ responseForcast.list[13].main.humidity }%</p>
        `)

        //Day 3 forecast
        $(`#day3`).html(`
            <h5>${ responseForcast.list[21].dt_txt.slice(5, 7) }/${ responseForcast.list[21].dt_txt.slice(8, 10) }/${ responseForcast.list[21].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day3Icon").attr("src",link);
        $(`#day3Temp`).html(`
            <p>Temp: ${ responseForcast.list[21].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day3Hum`).html(`
            <p>Temp: ${ responseForcast.list[21].main.humidity }%</p>
        `)

        //Day 4 forecast
        $(`#day4`).html(`
            <h5>${ responseForcast.list[29].dt_txt.slice(5, 7) }/${ responseForcast.list[29].dt_txt.slice(8, 10) }/${ responseForcast.list[29].dt_txt.slice(0, 4) }</h5>
        `)
        $(`#day4Temp`).html(`
            <p>Temp: ${ responseForcast.list[29].main.temp } <sup>o</sup>F</p>
        `)
        $("#day4Icon").attr("src",link);
        $(`#day4Hum`).html(`
            <p>Temp: ${ responseForcast.list[29].main.humidity }%</p>
        `)

        //Day 5 forecast
        $(`#day5`).html(`
            <h5>${ responseForcast.list[37].dt_txt.slice(5, 7) }/${ responseForcast.list[37].dt_txt.slice(8, 10) }/${ responseForcast.list[37].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day5Icon").attr("src",link);
        $(`#day5Temp`).html(`
            <p>Temp: ${ responseForcast.list[37].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day5Hum`).html(`
            <p>Temp: ${ responseForcast.list[37].main.humidity }%</p>
        `)
    });
  }
});


      
    