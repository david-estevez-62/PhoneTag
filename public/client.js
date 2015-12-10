






$(function(){



function initialize() {

  

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Map options here
      var mapOptions = {
        center: { lat:position.coords.latitude, lng:position.coords.longitude},
        zoom: 19,
        disableDefaultUI:true
      };


      $.post('/locate', {latitude:latitude, longitude:longitude}, function (data) {
        console.log(data);
      });


      // Create a new map that gets injected into #map in our HTML
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions); 
  }



  //////////////
  // Scan btn //
  //////////////
  $("#scanbtn").on("click", function(){


      $.get("/scan", function(data){

        // console.log(data);

          for (var i = 0; i < data.length; i++) {
            console.log('data: ' + [i]);
            console.log(data[i].location.coordinates)

            var coords = (new google.maps.LatLng(Number(data[i].location.coordinates[0]), Number(data[i].location.coordinates[1])))

            console.log(coords);
            addMarker(coords);
          }; 

      });


  });




  // addMarker function 
  function addMarker(location) {
    // console.log(location);
    // Create new marker at event click location and inject into map
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

  }

  getLocation();

  // window.setInterval(getLocation, 30000);


  

}

// Load it into DOM
google.maps.event.addDomListener(window, 'load', initialize);




});
