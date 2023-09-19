const headers = new Headers();
headers.append('Authorization', 'Bearer SOME-VALUE');

fetch('https://location-dum-dum.free.beeceptor.com/todos', {
    method: 'GET',
    headers: headers,
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  
document.addEventListener("DOMContentLoaded", function () {
    var getLocationButton = document.getElementById("getLocationButton");
    var locationInfo = document.getElementById("locationInfo");

    getLocationButton.addEventListener("click", function () {
        // Check if geolocation is available in the browser
        if ("geolocation" in navigator) {
            // Get the user's location
            navigator.geolocation.getCurrentPosition(function (position) {
                // Extract latitude and longitude from the position object
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Display the location information
                locationInfo.textContent = "Latitude: " + latitude + ", Longitude: " + longitude;

                // Send the location data to your server
                sendLocationDataToServer(latitude, longitude);
            }, function (error) {
                // Handle errors, if any
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationInfo.textContent = "User denied the request for geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationInfo.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        locationInfo.textContent = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        locationInfo.textContent = "An unknown error occurred.";
                        break;
                }
            });
        } else {
            // Geolocation is not available in this browser
            locationInfo.textContent = "Geolocation is not supported in your browser.";
        }
    });

    // Function to send location data to your server
    function sendLocationDataToServer(latitude, longitude) {
        var xhr = new XMLHttpRequest();
        var url = "https://location-dum-dum.free.beeceptor.com"; // Replace with your server endpoint
        var data = JSON.stringify({ latitude: latitude, longitude: longitude });

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Location data sent successfully.");
            }
        };

        xhr.send(data);
    }
});
