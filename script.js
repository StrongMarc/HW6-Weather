$(document).ready(function() {
   
  forecast()

    function forecast() {
        var cityText = "Chicago";
        var unit = "&units=imperial"
        var key = "cedb9c57ccdd0a6a3213271aa94438a7"
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityText + unit + "&appid=" + key;
        $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) {
            $(`#forcast`).html(`
                <h2>${ response.name }</h2>
            `)
            
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
        fiveDayForecast()
    }

    function fiveDayForecast() {
      var cityText = "Chicago";
      var unit = "&units=imperial"
      var key = "cedb9c57ccdd0a6a3213271aa94438a7"
      var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityText + unit + "&appid=" + key;
      $.ajax({
        url: fiveDayURL,
        method: "GET"
        }).then(function(responseForcast) {
          $(`#day1`).html(`
              <h5>${ responseForcast.list[5].dt_txt.slice(5, 7) }/${ responseForcast.list[5].dt_txt.slice(8, 10) }/${ responseForcast.list[5].dt_txt.slice(0, 4) }</h5>
          `)
          
          $(`#day2`).html(`
              <h5>${ responseForcast.list[13].dt_txt.slice(5, 7) }/${ responseForcast.list[13].dt_txt.slice(8, 10) }/${ responseForcast.list[13].dt_txt.slice(0, 4) }</h5>
          `)

          $(`#day3`).html(`
              <h5>${ responseForcast.list[21].dt_txt.slice(5, 7) }/${ responseForcast.list[21].dt_txt.slice(8, 10) }/${ responseForcast.list[21].dt_txt.slice(0, 4) }</h5>
          `)

          $(`#day4`).html(`
              <h5>${ responseForcast.list[29].dt_txt.slice(5, 7) }/${ responseForcast.list[29].dt_txt.slice(8, 10) }/${ responseForcast.list[29].dt_txt.slice(0, 4) }</h5>
          `)

          $(`#day5`).html(`
              <h5>${ responseForcast.list[37].dt_txt.slice(5, 7) }/${ responseForcast.list[37].dt_txt.slice(8, 10) }/${ responseForcast.list[37].dt_txt.slice(0, 4) }</h5>
          `)
      });
  }
});


      
    