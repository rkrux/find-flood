		$(document).ready(function() {
		geolocate();
		})
		
		var directionsService, directionsDisplay, map, userloc, start, end, wpt1 = "", wpt2 = "";
		var rendererOptions = {
			draggable: true
		};		
		
		function geolocationSuccess(position) {
			directionsService = new google.maps.DirectionsService();
			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
			userloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
			zoom: 8,
			center: userloc
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			service = new google.maps.places.PlacesService(map);   //for places
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('directions'));
		}
		function geolocationError(positionError) {
			document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
		}		
		function geolocate() {
			 if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
			}
			else
			document.getElementById('error').innerHTML += "Your browser doesn't support the Geolocation API";
			//Default Address
		}
				