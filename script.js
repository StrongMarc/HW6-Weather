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
              <p>Temperature: ${ response.main.temp }</p>
            `)

            $(`#humidity`).html(`
              <p>Humidity: ${ response.main.humidity }</p>
            `)
            
            $(`#wind`).html(`
              <p>Wind Speed: ${ response.wind.speed }</p>
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
    }
});
      
    