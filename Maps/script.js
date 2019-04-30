var mymap = L.map('mapid').setView([52.408, 16.937], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoib3NraWJvc2tpaXQiLCJhIjoiY2p1dXU5NDR3MGt3bTN5b2doeHp3eTFtbiJ9.RQCW_Cgh2KWxAW3BlF6OZQ'
}).addTo(mymap);


var i = 1;
// DRAGGING MARKER
mymap.on('click',
  function mapClickListen(e) {
    var pos = e.latlng;

    var marker = L.marker(
      pos, {
        draggable: true
      }
    );

    var hei = marker._latlng.lat;
    var wid = marker._latlng.lng;

    // ADDING MARKER TO TABLE
    $('#myTable tr:last').after(`<tr><th scope="row">${i}</th><td>${hei}</td><td>${wid}</td></tr>`);
    i++;

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the marker at " + e.latlng.toString())
        .openOn(mymap);
    }

    marker.on('click', onMapClick);
    marker.on('dragstart', function(e) {
      mymap.off('click', mapClickListen);
    });
    marker.on('dragend', function(e) {
      setTimeout(function() {
        mymap.on('click', mapClickListen);
      }, 10);
    });
    marker.addTo(mymap);
  }
);

$(window).resize(function() {
  alert("You resized your window. This site is going to be reloaded")
  location.reload();
});
