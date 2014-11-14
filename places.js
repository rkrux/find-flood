var temp, autocomplete, directionsService, directionsDisplay, userloc, mapOptions, map, service, infowindow, typesarray =[], markers =[], radiusVal, stateIndex, districtIndex, districtCentre, districtMarker, districtCircle;
var messageOptions = {HorizontalPosition : 'center', VerticalPosition : 'center'};
var districts = [
		"<option value='0'>Khanauri</option><option value='1'>Rajpura</option><option value='2'>Sangrur</option><option value='3'>Kharar</option><option value='4'>Banur</option><option value='5'>Patiala</option><option value='6'>Ludhiana</option><option value='7'>Jalandhar</option><option value='8'>Ferozepur</option><option value='9'>Chandigarh</option>",
        "<option value='0'>Ambala</option><option value='1'>Kiathal</option><option value='2'>Rohtak</option><option value='3'>Bhiwani</option><option value='4'>Sonepat</option><option value='5'>Jind</option><option value='6'>Hisar</option><option value='7'>Faridabad</option>",
        "<option value='0'>Gorakhpur</option><option value='1'>Allahabad</option><option value='2'>Varanasi</option><option value='3'>Mirzapur</option><option value='4'>Gonda</option><option value='5'>Jaunpur</option><option value='6'>Ghazipur</option><option value='7'>Bahraich</option><option value='8'>Barabanki</option><option value='9'>Bulandshahr</option><option value='10'>Farrukhabad</option><option value='11'>Kannauj</option><option value='12'>Mathura</option><option value='13'>Bijnor</option><option value='14'>Kanpur</option><option value='15'>Raebareli</option><option value='16'>Lakhimpur</option>",
		"<option value='0'>Vaishali</option><option value='1'>Samastipur</option><option value='2'>Begusarai</option><option value='3'>Khagaria</option><option value='4'>Nalanda</option><option value='5'>Munger</option><option value='6'>Bhojpur</option><option value='7'>Buxar</option><option value='8'>Saran</option><option value='9'>Bhagalpur</option><option value='10'>Kishanganj</option><option value='11'>Madhubani</option><option value='12'>Supaul</option><option value='13'>Madhepura</option><option value='14'>Sitamarhi</option><option value='15'>Champaran</option>",
		"<option value='0'>Midnapore</option><option value='1'>Bankura</option><option value='2'>Howrah</option><option value='3'>Hooghly</option><option value='4'>Birbhum</option><option value='5'>Burdwan</option><option value='6'>Jalpaiguri</option>",
		"<option value='0'>Majuli</option><option value='1'>Dhubri</option><option value='2'>Guwahati</option><option value='3'>Dibrugarh</option><option value='4'>Tezpur</option><option value='5'>Sibsagar</option><option value='6'>Nowgong</option><option value='7'>Darrang</option><option value='8'>Goalpara</option><option value='9'>Cachar</option>",
		"<option value='0'>Gajapati</option><option value='1'>Ganjam</option><option value='2'>Kandhamal</option><option value='3'>Khurda</option><option value='4'>Puri</option><option value='5'>Cuttack</option><option value='6'>Jagatsinghpur</option><option value='7'>Kendrapara</option><option value='8'>Bhadrak</option><option value='9'>Balasore</option><option value='10'>Nayagarh</option><option value='11'>Mayurbhanj</option><option value='12'>Bauda</option><option value='13'>Jajpur</option><option value='14'>Keonjhar</option><option value='15'>Koraput</option>",
		"<option value='0'>Srikakulam</option><option value='1'>Guntur</option><option value='2'>Krishna</option><option value='3'>Prakasam</option><option value='4'>Nalgonda</option><option value='5'>Mahabubnagar</option><option value='6'>Vizianagaram</option><option value='7'>West Godavari</option>",
		"<option value='0'>Valsad</option><option value='1'>Bharuch</option><option value='2'>Vadodara</option><option value='3'>Navsari</option><option value='4'>Surat</option><option value='5'>Narmada</option><option value='6'>Ankleshwar</option>",
		"<option value='0'>Kannur</option><option value='1'>Ernakulam</option><option value='2'>Kozhikode</option><option value='3'>Kollam</option><option value='4'>Thrissur</option><option value='5'> Malappuram</option><option value='6'>Wayanad</option><option value='7'>Kasaragod</option><option value='8'>Alappuzha</option>"
//		"<option value='0'>Kedarnath</option><option value='1'>Rudraprayag</option><option value='2'>Chamoli</option><option value='3'>Uttarkashi</option><option value='4'>Pithoragarh</option><option value='5'>Dehradun</option><option value='6'>Rishikesh</option><option value='7'>Badrinath</option><option value='8'>Joshimath</option><option value='9'>Yamunotri</option><option value='10'>Gangotri</option>",
	];
	
var coordinates = [  //River name   {name: "", lat: , lon: }, 
		[{name: "Khanauri", lat: 29.8376986, lon: 76.11169970000003}, {name: "Rajpura", lat: 30.4831, lon: 76.59500000000003}, {name: "Sangrur", lat: 30.245796, lon: 75.842072}, {name: "Kharar", lat: 30.748882, lon: 76.641358}, {name: "Banur", lat: 30.550301, lon: 76.716812}, {name: "Patiala", lat: 30.320620, lon: 76.395126}, {name: "Ludhiana", lat: 30.900965, lon: 75.857276}, {name: "Jalandhar", lat: 31.326015, lon: 75.576183}, {name: "Ferozepur", lat: 30.918100, lon: 74.616142}, {name: "Chandigarh", lat: 30.733315, lon: 76.779418}], 
		[{name: "Ambala", lat: 30.378179, lon: 76.776697}, {name: "Kiathal", lat: 29.795441, lon: 76.399269}, {name: "Rohtak", lat: 28.892361, lon: 76.591240}, {name: "Bhiwani", lat: 28.799045, lon: 76.133511}, {name: "Sonepat", lat: 28.928574, lon: 77.091494}, {name: "Jind", lat: 29.316700, lon: 76.316700}, {name: "Hisar", lat: 29.149188, lon: 75.721653}, {name: "Faridabad", lat: 28.408912, lon: 77.317789}],
		[{name: "Gorakhpur", lat: 26.760555, lon: 83.373168}, {name: "Allahabad", lat: 25.435801, lon: 81.846311}, {name: "Varanasi", lat: 25.317645, lon: 82.973914}, {name: "Mirzapur", lat: 25.133699, lon: 82.564434}, {name: "Gonda", lat: 27.133991, lon: 81.961897}, {name: "Jaunpur", lat: 25.749003, lon: 82.698700}, {name: "Ghazipur", lat: 25.584042, lon: 83.577020}, {name: "Bahraich", lat: 27.572602, lon: 81.593872}, {name: "Barabanki", lat: 26.927166, lon: 81.191449}, {name: "Bulandshahr", lat: 28.406963, lon: 77.849829}, {name: "Farrukhabad", lat: 27.400000, lon: 79.566667}, {name: "Kannauj", lat: 27.055190, lon: 79.918080}, {name: "Mathura", lat: 27.492413, lon: 77.673673}, {name: "Bijnor", lat: 29.372442, lon: 78.135847}, {name: "Kanpur", lat: 26.449923, lon: 80.331874}, {name: "Raebareli", lat: 26.233318, lon: 81.233312}, {name: "Lakhimpur", lat: 27.949400, lon: 80.777489}],
		[{name: "Vaishali", lat: 26.003818, lon: 85.081783}, {name: "Samastipur", lat: 25.862968, lon: 85.781026}, {name: "Begusarai", lat: 25.413010, lon: 86.124077}, {name: "Khagaria", lat: 25.511152, lon: 86.476908}, {name: "Nalanda", lat: 25.124060, lon: 85.459475}, {name: "Munger", lat: 25.372620, lon: 86.490321}, {name: "Bhojpur", lat: 25.466155, lon: 84.522219}, {name: "Buxar", lat: 25.564710, lon: 83.977748}, {name: "Saran", lat: 25.9167, lon: 84.7500}, {name: "Bhagalpur", lat: 25.240030, lon: 86.984512}, {name: "Kishanganj", lat: 26.307792, lon: 87.776333}, {name: "Madhubani", lat: 26.346854, lon: 86.071547}, {name: "Supaul", lat: 26.108333, lon: 86.601111}, {name: "Madhepura", lat: 25.916944, lon: 86.778611}, {name: "Sitamarhi", lat: 26.598070, lon: 85.495323}, {name: "Champaran", lat: 21.035810, lon: 81.923471}],
		[{name: "Midnapore", lat: 22.420870, lon: 87.326088}, {name: "Bankura", lat: 23.237163, lon: 87.065222}, {name: "Howrah", lat: 22.595769, lon: 88.263639}, {name: "Hooghly", lat: 22.895600, lon: 88.402500}, {name: "Birbhum", lat: 24.357502, lon: 87.842697}, {name: "Burdwan", lat: 23.232430, lon: 87.863731}, {name: "Jalpaiguri", lat: 26.522020, lon: 88.717468}],
		[{name: "Majuli", lat: 27.001617, lon: 94.224298}, {name: "Dhubri", lat: 26.019648, lon: 89.987751}, {name: "Guwahati", lat: 26.147129, lon: 91.735551}, {name: "Dibrugarh", lat: 27.472833, lon: 94.911962}, {name: "Tezpur", lat: 26.652849, lon: 92.792559}, {name: "Sibsagar", lat: 26.983300, lon: 94.633300}, {name: "Nowgong", lat: 25.062253, lon: 79.439662}, {name: "Darrang", lat: 26.594352, lon: 91.988153}, {name: "Goalpara", lat: 26.166700, lon: 90.616700}, {name: "Cachar", lat: 24.782125, lon: 92.857710}],
		[{name: "Gajapati", lat: 19.191222, lon: 84.185712}, {name: "Ganjam", lat: 19.387389, lon: 85.051541}, {name: "Kandhamal", lat: 20.134204, lon: 84.016742}, {name: "Khurda", lat: 20.185640, lon: 85.627296}, {name: "Puri", lat: 19.813382, lon: 85.831465}, {name: "Cuttack", lat: 20.462521, lon: 85.882990}, {name: "Jagatsinghpur", lat: 20.254900, lon: 86.170622}, {name: "Kendrapara", lat: 20.500000, lon: 86.416700}, {name: "Bhadrak", lat: 21.058274, lon: 86.495840}, {name: "Balasore", lat: 21.494977, lon: 86.942658}, {name: "Nayagarh", lat: 20.123133, lon: 85.103843}, {name: "Mayurbhanj", lat: 21.925365, lon: 86.735955}, {name: "Bauda", lat: 20.833300, lon: 84.316700}, {name: "Jajpur", lat: 20.850000, lon: 86.333300}, {name: "Keonjhar", lat: 21.515120, lon: 85.684578}, {name: "Koraput", lat: 18.813487, lon: 82.712333}],
		[{name: "Srikakulam", lat: 18.296975, lon: 83.896781}, {name: "Guntur", lat: 16.306652, lon: 80.436540}, {name: "Krishna", lat: 16.166700, lon: 81.133300}, {name: "Prakasam", lat: 15.718793, lon: 79.560344}, {name: "Nalgonda", lat: 17.052389, lon: 79.267181}, {name: "Mahabubnagar", lat: 16.741638, lon: 77.985961}, {name: "Vizianagaram", lat: 18.106658, lon: 83.395551}, {name: "West Godavari", lat: 16.917418, lon: 81.339941}, {name: "Karimnagar", lat: 18.438555, lon: 79.128841}],
		[{name: "Valsad", lat: 20.610069, lon: 72.925858}, {name: "Bharuch", lat: 21.705136, lon: 72.995875}, {name: "Vadodara", lat: 22.307309, lon: 73.181098}, {name: "Navsari", lat: 20.951851, lon: 72.921463}, {name: "Surat", lat: 21.195000, lon: 72.819444}, {name: "Narmada", lat: 24.159284, lon: 71.676517}, {name: "Ankleshwar", lat: 21.626424, lon: 73.015198}],
		[{name: "Kannur", lat: 11.874477, lon: 75.370366}, {name: "Ernakulam", lat: 9.980000, lon: 76.280000}, {name: "Kozhikode", lat: 11.258753, lon: 75.780410}, {name: "Kollam", lat: 8.893212, lon: 76.614140}, {name: "Thrissur", lat: 10.527642, lon: 76.214435}, {name: "Malappuram", lat: 11.066700, lon: 76.066700}, {name: "Wayanad", lat: 11.709446, lon: 76.095537}, {name: "Kasaragod", lat: 12.492470, lon: 74.990623}, {name: "Alappuzha", lat: 9.498067, lon: 76.338848}]
//		[{name: "Kedarnath", lat: 30.734627, lon: 79.066894}, {name: "Rudraprayag", lat: 30.285067, lon: 78.982915}, {name: "Chamoli", lat: 30.404104, lon: 79.331769}, {name: "Uttarkashi", lat: 30.733299, lon: 78.439903}, {name: "Pithoragarh", lat: 29.582860, lon: 80.218188}, {name: "Dehradun", lat: 30.316495, lon: 78.032192}, {name: "Rishikesh", lat: 30.086928, lon: 78.267612}, {name: "Badrinath", lat: 30.743309, lon: 79.493763}, {name: "Joshimath", lat: 30.557887, lon: 79.559266}, {name: "Yamunotri", lat: 30.996866, lon: 78.461653}, {name: "Gangotri", lat: 30.994695, lon: 78.939840}],
	];
	
var data = [   //Casualties, Causes of Floods, Doc and Brief   || Excessive Rainfall, Cyclones, Earthquakes, Overflow, Dams
		{state: "Punjab", rivers :"Ghaggar, Satluj, Beas", years: "1988, 1993, 2010"},
		{state: "Haryana", rivers :"Yamuna, Ghaggar, Markanda ", years: "1995, 2004, 2010"},
		{state: "Uttar Pradesh", rivers :"Ganga, Sarada, Rapti, Gandak, Ghagra, Yamuna, Adhwara Group", years: "1971, 1980, 1981, 1985, 1992, 1993, 1998, 2000, 2005, 2007, 2008, 2013"},
		{state: "Bihar", rivers :"Ganga, Kosi, Burhi, Bagmati, Gandak, Ghaghra, Budhi Gandak, Mahananda, Kamla", years: "1985, 1986, 1987, 1995, 1996, 1998, 2000, 2002, 2004, 2007, 2008, 2013"},
		{state: "West Bengal", rivers :"Ganga, Teesta, Torsa, Jaldakha, Bhagirathi, Mahananda, Damodar, Ajay, Brahamputra, Barak", years: "1978, 1980, 1981, 1998, 1999, 2000, 2007, 2008"},
		{state: "Assam", rivers :"Brahamputra, Barak, Dihang, Dihing, Subansiri", years: "1954, 1962, 1966, 1972, 1974, 1978, 1983, 1986, 1988, 1996, 1998, 2000, 2003, 2012"},
		{state: "Odisha", rivers :"Mahanadi, Baitarni, Brahmani, Subarnarekha, Rushikulya, Budhabalanga, Vansadhara ", years: "1960, 1971, 1980, 1982, 1994, 1999, 2001, 2003, 2006, 2008, 2013"},
		{state: "Andhra Pradesh", rivers :"Godavari, Krishna, Kolleru Lake", years: "1953, 1977, 1979, 1986, 1990, 1996, 1998, 2010, 2013"},
		{state: "Gujarat", rivers :"Narmada, Tapi, Sabarmati, Vatrak, Shedhi", years: "1968, 1981, 1983, 1988, 1990, 1993, 1994, 2005, 2006"},
		{state: "Kerala", rivers :"Periyar", years: "1924, 1994"}
//		{rivers :"", years: ""},
	]

$(document).ready(function() {
	geolocate();
    $("#state").change(function() {
		var state = $(this).val();
		$("#district").html(districts[state]);
	})
	
	$("#getResults").click(function() {
		typesarray.length =0;
		clearMarkers();
		$('#directions').hide();
	//	directionsDisplay.setMap(null);
		
		radiusVal = $('#radius').val();
		stateIndex = $('#state').val();
		districtIndex = $('#district').val();
		
		if(radiusVal == ""  || stateIndex == "" || districtIndex=="")
		jNotify("You must fill all the parameters.", messageOptions);
		else {
			if(radiusVal > 50000)
				jError("No result was found for this request. You might wanna decrease the radius of your request(Maximum-50000m).", messageOptions);
			else{
				infowindow = new google.maps.InfoWindow();
				districtCentre = new google.maps.LatLng(coordinates[stateIndex][districtIndex].lat, coordinates[stateIndex][districtIndex].lon); 
				map.panTo(districtCentre);
				map.setZoom(13);
				districtMarker = new google.maps.Marker({
					position: districtCentre,
					map: map
				});
				google.maps.event.addListener(districtMarker, 'click', function() {
			//		console.log(this);
					var floodData = "";
					floodData += '<div id="name">' + coordinates[stateIndex][districtIndex].name + ", " + data[stateIndex].state + '</div>';
					floodData += '<div id="coord"><b>Latitude: </b>' + coordinates[stateIndex][districtIndex].lat.toFixed(4) + '<b> Longitude: </b>' + coordinates[stateIndex][districtIndex].lon.toFixed(4) + '</div>';
					floodData += '<div id="rivers">' + '<b>Flood Causing Rivers: </b>' + data[stateIndex].rivers + '</div>';
					floodData += '<div id="years">' + '<b>State Flood History: </b>' + data[stateIndex].years + '</div>';
					infowindow.setContent(floodData);
					infowindow.open(map, this);
				});
				
				var circleOptions = {
					strokeColor: '#FF0000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.10,
					map: map,
					center: districtCentre,
					radius: parseInt(radiusVal, 10) 
				};
				districtCircle = new google.maps.Circle(circleOptions);
				
				typesarray.push($('#place').val());
			//	console.log(typesarray);
				var request = {
					location: new google.maps.LatLng(coordinates[stateIndex][districtIndex].lat, coordinates[stateIndex][districtIndex].lon),
					radius: radiusVal,
					types: typesarray
				};
			//	console.log(request);
				service.nearbySearch(request, searchCallback);
			}
		}
	})
})	

function searchCallback(results, status) {
// console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
	jSuccess("Total " + results.length + " places found.", messageOptions);
    for (var i = 0; i < results.length; i++) 
      createMarker(results[i], i);
  }
  else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
	jError("No result was found for this request. You might want to increase the radius of your search.", messageOptions);
  else if (status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
	jError("This request was invalid.", messageOptions);
  else if (status == google.maps.places.PlacesServiceStatus.ERROR)
	jError("There was a problem contacting the Google servers.", messageOptions);
 // else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
 //	jError("You have gone over your request quota.", messageOptions);
  else if (status == google.maps.places.PlacesServiceStatus.REQUEST_DENIED)
	jError("The webpage is not allowed to use the PlacesService.", messageOptions);
  else if (status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR)
	jError("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.", messageOptions);
}

function createMarker(place, index) {   
  if (place.icon)
    var image = new google.maps.MarkerImage(place.icon, new google.maps.Size(71, 71), new google.maps.Point(0, 0), new google.maps.Point(17, 34), new google.maps.Size(25, 25));
   else
    var image = null;
  var requestPlace ={ reference: place.reference };
  infowindow = new google.maps.InfoWindow();
  
  service.getDetails(requestPlace, function(placeDetails, status) {
//	console.log(placeDetails);
    if (status == google.maps.places.PlacesServiceStatus.OK) {  
      markers[index] = new google.maps.Marker({
        map: map,
		icon: image,
		animation: google.maps.Animation.DROP,
        position: placeDetails.geometry.location
      });
      google.maps.event.addListener(markers[index], 'click', function() {
		console.log(this);
		if (place.photos) 
		var	placeContent = '<div id="thumbnail"><img src="' + place.photos[0].getUrl({'maxWidth': 200}) + '" border="1"</img></div>';
		else
		var placeContent = "";
		placeContent += '<div id="name">' + placeDetails.name + '</div><div id="address"><b>Address: </b>'+ placeDetails.formatted_address + '</div>';
        if (placeDetails.international_phone_number) 
			placeContent += '</div id="phone">' + '<b>Phone Number: </b>' + placeDetails.international_phone_number + '</div>';
		if (placeDetails.geometry) 																	//B, K are not fixed
			placeContent += '<div id="coord">' + '<b>Latitude: </b>' + placeDetails.geometry.location.B.toFixed(4) + '<b> Longitude: </b>' + placeDetails.geometry.location.k.toFixed(4) + '</div>';
        if (placeDetails.website) 
			placeContent += '<div id="website">' + '<b>Website: </b>' + '<a target="_blank" href="'+ placeDetails.website + '">' + placeDetails.website + '</a></div>';
		if (placeDetails.rating) 
			placeContent += '<div id="rating">' + '<b>Rating: </b>' + placeDetails.rating + '</div>';
		placeContent += '<input id="start" type="text" placeholder="Origin" />';
		placeContent += '<input id="getDirections" type="button" value="Get Directions" onclick="putDirections()"/>';
	//	temp = placeDetails.name;
		temp = placeDetails.geometry.location;
		infowindow.setContent(placeContent);
        infowindow.open(map, this);
      });
	 
    }
	else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
	  jError("No result was found for this request. You might want to increase the radius of your search(Maximum-50000m).", messageOptions);
	else if (status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
	  jError("This request was invalid.", messageOptions);
	else if (status == google.maps.places.PlacesServiceStatus.NOT_FOUND)
	  jError("The referenced location was not found in the Places database.", messageOptions);
	else if (status == google.maps.places.PlacesServiceStatus.ERROR)
	  jError("There was a problem contacting the Google servers.", messageOptions);
//	else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
//	  jError("You have gone over your request quota.", messageOptions);
	else if (status == google.maps.places.PlacesServiceStatus.REQUEST_DENIED)
	  jError("The webpage is not allowed to use the PlacesService.", messageOptions);
	else if (status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR)
	  jError("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.", messageOptions);
  });
}

function putDirections() {   //Add autocomplete, prob in adding start input and button
/*	autocomplete = new google.maps.places.Autocomplete(document.getElementById('start'));
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				var start = autocomplete.getPlace();
				if (!start.geometry)
					return;  
			});    */
//	document.getElementById('directions').style.display = "block";
	var start = $('#start').val();
	if(start == "")
		jNotify("Enter origin of the route.", messageOptions);
	else{
	//	var end = new google.maps.LatLng(coordinates[stateIndex][districtIndex].lat, coordinates[stateIndex][districtIndex].lon);//coordinates[stateIndex][districtIndex].name;
	//	console.log(start, temp);
		var request = {
			origin : start,
			destination : temp,
			travelMode : google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status){
		if (status == google.maps.DirectionsStatus.OK){
			$('#directions').show();
			directionsDisplay.setDirections(response);
		}
		else if (status == google.maps.DirectionsStatus.NOT_FOUND)
			jError("One of the locations could not be geocoded.", messageOptions);
		else if (status == google.maps.DirectionsStatus.ZERO_RESULTS)
			jError("No route found.", messageOptions);
		else if (status == google.maps.DirectionsStatus.INVALID_REQUEST)
			jError("One of the locations is not filled.", messageOptions);
		else if (status == google.maps.DirectionsStatus.UNKNOWN_ERROR)
			jError("The request could not be processed due to a server error. Please try again.", messageOptions);
		});
	//	google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {totalDistance(directionsDisplay.directions);}); If Waypoints
	}
}

function totalDistance(result) {
	var dist = 0, time = 0, hours, min;
	for (var i = 0; i < result.routes[0].legs.length; i++) {
		dist += result.routes[0].legs[i].distance.value;
		time += result.routes[0].legs[i].duration.value;
	}
	dist /= 1000;
	time /= 60;
	min = time % 60;
	hours = (time-min)/60;
	document.getElementById("directions").innerHTML = "Total : " + Math.round(dist) + " km - About " + Math.round(hours) + " hrs" + Math.round(min) + " mins";
}

function clearMarkers(){
    for (var i = 0; i < markers.length; i++)
		markers[i].setMap(null);
    markers.length = 0;
	if(districtMarker)
		districtMarker.setMap(null);
	if(districtCircle)
		districtCircle.setMap(null);
}

function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	}
	else {
		jError("Your browser doesn't support the Geolocation API", messageOptions);
		userloc = new google.maps.LatLng(28.635308, 77.22496);							//DELHI
		mapOptions = {
			center: userloc,
			zoom: 8
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		service = new google.maps.places.PlacesService(map);
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directions'));
	}
}

function geolocationSuccess(position) {
	userloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	mapOptions = {
		center: userloc,
		zoom: 8
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	service = new google.maps.places.PlacesService(map);
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('directions'));
//	autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'));
}

function geolocationError(positionError) {
	jError(positionError.message, messageOptions);
}						