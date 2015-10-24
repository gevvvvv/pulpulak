
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
            margin: '10px',
            'border-radius': '20px',
            'box-shadow': '2px 2px 2px #666',
            'display' : 'none'

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

              pulpulakDestination(data[0].lat, data[0].lon);
            }
          }
        });

        if (data.length != 0) {

          map.setCenter((position.coords.latitude + parseFloat(data[0].lat))/2, (position.coords.longitude + parseFloat(data[0].lon))/2);
          
          pulpulakDestination(data[0].lat, data[0].lon);
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
                pulpulakDestination(e.position.H, e.position.L);
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

pulpulakDestination = function (lat, lon){
	map.drawRoute({
		origin: [position.coords.latitude, position.coords.longitude],
		destination: [lat, lon],
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
				lat: (position.coords.latitude + parseFloat(lat))/2,
				lng: (position.coords.longitude + parseFloat(lon))/2,
				content: '<div class="overlay">' + distance + '<br/>' + duration + '</div>'
			});
		}
	});
}

});