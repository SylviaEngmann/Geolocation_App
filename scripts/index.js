(function() {
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

		document.getElementById("barcode").addEventListener("click", function(){
 	 		cordova.plugins.barcodeScanner.scan(scanSuccess, scanError,
 				{prompt:"Place a barcode inside the scan area" 
          		formats:QR_CODE,PDF_417, 
         		orientation:landscape 
		 });
	};

	var onSuccess = function(position) {
		alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
	};

	function onError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};

	function onWatchSuccess(position) {
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br/' + 'Longitude:' + position.coords.longitude + '<br/' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};
	function scanSuccess(result) {
        alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
     };
    function scanError (error) {
        alert("Scanning failed: " + error);
          
     };
})();
