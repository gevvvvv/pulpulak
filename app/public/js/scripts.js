$(document).ready(function(){
	var map = new GMaps({
		div: '#map-canvas',
		disableDefaultUI: true
	});

	GMaps.geolocate({
	    success: function(position) {

			map.addMarker({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				icon: "/images/you.png"
			});
			drawTargets(position.coords.latitude, position.coords.longitude);
		},
		error: function(error) {
			alert('Geolocation failed: '+ error.message);
			drawTargets(0, 0);
		},
		not_supported: function() {
			alert("Your browser does not support geolocation");
		},
		always: function() {
		}
	});
	pulpulakDestination = function (originLat, originLon, lat, lon){
		if(originLat !=0 && originLon != 0)
		map.drawRoute({
			origin: [originLat, originLon],
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
					lat: (originLat + parseFloat(lat))/2,
					lng: (originLon + parseFloat(lon))/2,
					content: '<div class="overlay">' + distance + '<br/>' + duration + '</div>'
				});
			}
		});
	}
	drawTargetDescription = function (target){
		if(target.image != undefined && target.image != '')
			var image = target.image;
		else
			var image = '/location_images/images/default.jpg';
		$('#spotInfo .itemImage').html("<img src='http://pulpulak.club" + image + "' />");
		$('#spotInfo .itemName').html(target.name);
		$('#spotInfo .itemLocationText').html(target.address);
		$('#spotInfo .itemInfoText').html(target.description);
	}
	drawTargets = function (latitude, longitude){
		$.get( "http://pulpulak.club/locations?lat=" + latitude + "&lon=" + longitude, 
		function( data ) {

	        if (data.length != 0) {
				pulpulakDestination(latitude, longitude, data[0].lat, data[0].lon);
				drawTargetDescription(data[0]);
				var targets = [];
				$.each(data, function(k, v){
					map.addMarker({
						lat: v.lat,
						lng: v.lon,
						icon: "/images/pul_redsm.png",
						click: function(e) {
							map.cleanRoute();
							map.removeOverlays();
							drawTargetDescription(v);
							pulpulakDestination(latitude, longitude, e.position.lat(), e.position.lng());
						}
					});
					targets.push(new google.maps.LatLng(v.lat, v.lon));
				});

				map.fitLatLngBounds(targets);
			}
		});
	}
});