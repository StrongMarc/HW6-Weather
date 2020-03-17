$(document).ready(function() {
   
  var cities = [];
  // function to display cities buttons using for loop
  function rendercity() {
    $(`#cityList`).empty()
    for (var i = 0; i < cities.length; i++) {
      a = $("<button>")
      a.addClass("city");
      a.attr("cityName", cities[i]);
      a.text(cities[i]);
      $("#cityList").append(a);
    }
    // forecast()
  }
  // function to display cities buttons using forEach
  // function rendercity() {
  //   $(`#cityList`).empty()
  //   cities.forEach(function(cities){
  //       let btn = $(`<button> ${ cities } </button>`)
  //       $(`#cityList`).append(btn)
  //   })
  // }

  // Function to add city to array 
  $("#addCity").on("click", function(event) {
    event.preventDefault();
    var city = $("#inputCity").val().trim();
    cities.push(city);
    forecast(city)
    rendercity();
  });

  // Function to add city to array on click and display forecast data
  // $("#addCity").on("click", function(event) {
  //   event.preventDefault();
  //   cities.push($(`#inputCity`).val().trim())
  //   var city = $("#inputCity").val().trim();
  //   rendercity();
  //   console.log(city)
  //   forecast(city)
  // });
   
   // Clicking on city list
  $(document).on("click", ".city", function() {
    var cityText = $(this).attr("cityName");
    forecast(cityText)
  })

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
        //  alert(uvURL)
          $.ajax({
            url: uvURL,
            method: "GET"
            }).then(function(responseUV) {
              var index = $( responseUV.value )[0]
              // alert(index)
              $('div')
              $(`#uvIndex`).html(`
                <p>UV Index: <span> ${ responseUV.value }</span></p>
              `) 
            });    
      });
      fiveDayForecast(cityText)
  }

  // function uvColor () {
    
  // }

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
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[7].weather[0].icon + "@2x.png"
        $(`#day1`).html(`
            <h5>${ responseForcast.list[7].dt_txt.slice(5, 7) }/${ responseForcast.list[7].dt_txt.slice(8, 10) }/${ responseForcast.list[7].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day1Icon").attr("src",link);
        $(`#day1Temp`).html(`
            <p>Temp: ${ responseForcast.list[7].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day1Hum`).html(`
            <p>Temp: ${ responseForcast.list[7].main.humidity }%</p>
        `)

        //Day 2 forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[15].weather[0].icon + "@2x.png"
        $(`#day2`).html(`
            <h5>${ responseForcast.list[15].dt_txt.slice(5, 7) }/${ responseForcast.list[15].dt_txt.slice(8, 10) }/${ responseForcast.list[15].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day2Icon").attr("src",link);
        $(`#day2Temp`).html(`
            <p>Temp: ${ responseForcast.list[15].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day2Hum`).html(`
            <p>Temp: ${ responseForcast.list[15].main.humidity }%</p>
        `)

        //Day 3 forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[23].weather[0].icon + "@2x.png"
        $(`#day3`).html(`
            <h5>${ responseForcast.list[23].dt_txt.slice(5, 7) }/${ responseForcast.list[23].dt_txt.slice(8, 10) }/${ responseForcast.list[23].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day3Icon").attr("src",link);
        $(`#day3Temp`).html(`
            <p>Temp: ${ responseForcast.list[23].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day3Hum`).html(`
            <p>Temp: ${ responseForcast.list[23].main.humidity }%</p>
        `)

        //Day 4 forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[31].weather[0].icon + "@2x.png"
        $(`#day4`).html(`
            <h5>${ responseForcast.list[31].dt_txt.slice(5, 7) }/${ responseForcast.list[31].dt_txt.slice(8, 10) }/${ responseForcast.list[31].dt_txt.slice(0, 4) }</h5>
        `)
        $(`#day4Temp`).html(`
            <p>Temp: ${ responseForcast.list[31].main.temp } <sup>o</sup>F</p>
        `)
        $("#day4Icon").attr("src",link);
        $(`#day4Hum`).html(`
            <p>Temp: ${ responseForcast.list[31].main.humidity }%</p>
        `)

        //Day 5 forecast
        var link = "http://openweathermap.org/img/wn/" + responseForcast.list[39].weather[0].icon + "@2x.png"
        $(`#day5`).html(`
            <h5>${ responseForcast.list[39].dt_txt.slice(5, 7) }/${ responseForcast.list[39].dt_txt.slice(8, 10) }/${ responseForcast.list[39].dt_txt.slice(0, 4) }</h5>
        `)
        $("#day5Icon").attr("src",link);
        $(`#day5Temp`).html(`
            <p>Temp: ${ responseForcast.list[39].main.temp } <sup>o</sup>F</p>
        `)
        $(`#day5Hum`).html(`
            <p>Temp: ${ responseForcast.list[39].main.humidity }%</p>
        `)
    });
  }
});


      
    