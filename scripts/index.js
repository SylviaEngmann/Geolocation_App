﻿(function() {
	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady() {
		alert('My device is ready');
		
		document.getElementById("geolocationbtn").addEventListener("click", function() {
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {
				enableHighAccuracy : true
			});

		});

		var watchID = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, {
			timeout : 30000
		});

		document.getElementById("clearWatchBtn").addEventListener("click", function() {
			navigator.geolocation.clearWatch(watchID);
		});
	};

	var onSuccess = function(position) {
		var lat= position.coords.latitude;
		var lang= position.coords.latitude;

		//alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
		var myLatlng = new google.maps.LatLng(lat,lang);
		var mapOptions = {zoom: 4,center: myLatlng}
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var marker = new google.maps.Marker({position: myLatlng,map: map});
	};

	function onError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};

	google.maps.event.addDomListener(window, 'load', onSuccess);

	function onWatchSuccess(position) {
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br/' + 'Longitude:' + position.coords.longitude + '<br/' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};
})();
