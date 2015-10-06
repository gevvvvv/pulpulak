
$(document).ready(function(){/* google maps -----------------------------------------------------*/
  var my_lat = 0;
  var my_lng = 0;
  var legs;
  var map = new GMaps({
    div: '#map-canvas',
    lat: 0,
    lng: 0,
    disableDefaultUI: true
  });





  GMaps.geolocate({
    success: function(position) {
      my_lat = position.coords.latitude,
          my_lng = position.coords.longitude,

          map.addMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            icon: "/images/you.png"
          });

      $.get( "http://pulpulak.club/locations?lat="+my_lat+"&lon="+my_lng, function( data ) {

        map.addControl({
          position: 'top_right',
          content: '<img src="/images/refresh.png" />',
          style: {
            margin: '10px 0',
            'border-radius': '20px',
            'box-shadow': '2px 2px 2px #666'

          },
          events: {
            click: function(){
              map.cleanRoute();
              map.removeOverlays();
              if(data[0].image != undefined && data[0].image !='')
                var image = data[0].image;
              else
                var image = '/location_images/images/default.jpg';
              $('#spotInfo .itemImage').html("<img src='http://pulpulak.club"+image+"' />");
              $('#spotInfo .itemName').html(data[0].name);
              $('#spotInfo .itemLocationText').html(data[0].address);
              $('#spotInfo .itemInfoText').html(data[0].description);
              var gCoordinates = [
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                new google.maps.LatLng(data[0].lat, data[0].lon)
              ];
              console.log(gCoordinates);
              map.fitLatLngBounds(gCoordinates);

              map.drawRoute({
                origin: [position.coords.latitude, position.coords.longitude],
                destination: [data[0].lat, data[0].lon],
                travelMode: 'walking',
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6,
                callback: function(e) {
                  legs = e.legs[0];
                  var distance = legs.distance.text;
                  var duration = legs.duration.text;
                  var steps = Math.round(legs.steps.length/2);
                  var middlePoint = legs.steps[steps];
                  console.log(position.coords.latitude,data[0].lat,'entered');
                  map.drawOverlay({
                    lat: (position.coords.latitude + parseFloat(data[0].lat))/2,
                    lng: (position.coords.longitude + parseFloat(data[0].lon))/2,
                    content: '<div class="overlay">' + distance + '<br/>' + duration + '</div>'
                  });
                }
              });
            }
          }
        });

        if (data.length != 0) {

          map.setCenter((position.coords.latitude + parseFloat(data[0].lat))/2, (position.coords.longitude + parseFloat(data[0].lon))/2);
          console.log('test',data[0].lat, data[0].lon);
          var route = map.drawRoute({
            origin: [position.coords.latitude, position.coords.longitude],
            destination: [data[0].lat, data[0].lon],
            travelMode: 'walking',
            strokeColor: '#131540',
            strokeOpacity: 0.6,
            strokeWeight: 6,
            callback: function(e) {
              legs = e.legs[0];
              var distance = legs.distance.text;
              var duration = legs.duration.text;
              var steps = Math.round(legs.steps.length/2);
              var middlePoint = legs.steps[steps];
              map.drawOverlay({
                lat: (position.coords.latitude + parseFloat(data[0].lat))/2,
                lng: (position.coords.longitude + parseFloat(data[0].lon))/2,
                content: '<div class="overlay">' + distance + '<br/>' + duration + '</div>'
              });
            }
          });
          //http://pulpulak.club/locations
          if(data[0].image != undefined && data[0].image !='')
            var image = data[0].image;
          else
            var image = '/location_images/images/default.jpg';
          $('#spotInfo .itemImage').html("<img src='http://pulpulak.club"+image+"' />");
          $('#spotInfo .itemName').html(data[0].name);
          $('#spotInfo .itemLocationText').html(data[0].address);
          $('#spotInfo .itemInfoText').html(data[0].description);
          $.each(data, function(k, v){
            map.addMarker({
              lat: v.lat,
              lng: v.lon,
              icon: "/images/pul_redsm.png",
              click: function(e) {
                map.cleanRoute();
                map.removeOverlays();
                if(v.image != undefined && v.image !='')
                  var image = v.image;
                else
                  var image = '/location_images/images/default.jpg';
                $('#spotInfo .itemImage').html("<img src='http://pulpulak.club"+image+"' />");
                $('#spotInfo .itemName').html(v.name);
                $('#spotInfo .itemLocationText').html(v.address);
                $('#spotInfo .itemInfoText').html(v.description);
                //$('.overlay').remove();
                console.log(e.position,'testing');
                var clickedPosition = e.position;
                map.drawRoute({
                  origin: [position.coords.latitude, position.coords.longitude],
                  destination: [e.position.H, e.position.L],
                  travelMode: 'walking',
                  strokeColor: '#131540',
                  strokeOpacity: 0.6,
                  strokeWeight: 6,
                  callback: function(e) {
                    legs = e.legs[0];
                    var distance = legs.distance.text;
                    var duration = legs.duration.text;
                    var steps = Math.round(legs.steps.length/2);
                    var middlePoint = legs.steps[steps];
                    map.drawOverlay({
                      lat: (position.coords.latitude + clickedPosition.H)/2,
                      lng: (position.coords.longitude + clickedPosition.L)/2,
                      content: '<div class="overlay">' + distance + '<br/>' + duration + '</div>'
                    });
                    var flagLatlng = new google.maps.LatLng(clickedPosition.H, clickedPosition.L);
                  }
                });
              }
            });
          });


          var gCoordinates = [
            new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            new google.maps.LatLng(data[0].lat, data[0].lon)
          ];
          console.log(gCoordinates);
          map.fitLatLngBounds(gCoordinates);
        };

      });






    },
    error: function(error) {
      alert('Geolocation failed: '+ error.message);
    },
    not_supported: function() {
      alert("Your browser does not support geolocation");
    },
    always: function() {
      // alert("Done!");
    }
  });



  // google.maps.event.addDomListener(window, 'load', initialize);

  // function initialize() {

  //   /* position Amsterdam */
  //   var latlng = new google.maps.LatLng(52.3731, 4.8922);

  //   var mapOptions = {
  //     center: latlng,
  //     scrollWheel: false,
  //     zoom: 13
  //   };

  //   var marker = new google.maps.Marker({
  //     position: latlng,
  //     url: '/',
  //     animation: google.maps.Animation.DROP
  //   });

  //   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  //   marker.setMap(map);

  // };

});