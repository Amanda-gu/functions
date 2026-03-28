
// Below is for the grolocation api
// live example: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation

const locationName = document.getElementById("location");
const findmeButton = document.getElementById('find-me');


findmeButton.addEventListener('click', () => {   
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        } else { 
            locationName.innerHTML = "Geolocation is not supported by this browser."
        }
        }

    function success(position) {
        locationName.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude
        console.log("Your current position is:")
        }

    function error() {
        locationName.innerHTML = "No location."
        }
//in the w3school example onclick function is in the html, so i moved it to my script.js, but then it was not working. 
//i asked claude why that is. it was because i never told the click function to do the getLocation()
//the three functions above were just setting it up but not actually running it...it can exist outside of the click funtion too
//https://claude.ai/share/bb8f94ee-4a35-4cd7-b5f3-e308d2ad448f

    getLocation()
})


// function getWeatherConditions(position) { 
//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;






