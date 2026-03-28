
// Below is for the grolocation api
// live example: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation

const findmeButton = document.getElementById('find-me')
const weatherGot = document.getElementById('location')


findmeButton.addEventListener('click', () => {   
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        } else { 
            locationName.innerHTML = "Geolocation is not supported by this browser."
        }
        }

    function success(position) {
        //in this function, i link location data to meteo api

        //to get the current weather i found this open source api: https://open-meteo.com/en/docs?forecast_days=1&hourly=&current=temperature_2m,relative_humidity_2m,weather_code&latitude=40.7143&longitude=-74.006

        //since it does not have js or json api response im reasearching how to link the api to my site
        
        //found this how-to: https://www.omi.me/blogs/api-guides/how-to-fetch-weather-data-using-open-meteo-api-in-javascript

        weatherGot.innerHTML = "Weather data recieived! "

        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&forecast_days=1`;    
        //params i need for current moment: weather code, temp, location
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        //^ this is for cases when network fails like no internet.i asked claude to explain more for me https://claude.ai/share/927032b1-77e5-425a-aa0a-404bf1fb4f9a
        .then(data => {
            console.log('Weather data:', data);
        })
        .catch(error => {
            console.error('There has been a problem with the weather fetch operation:', error);
        });
        
        }

    function error() {
        locationName.innerHTML = "No location."
        }

    getLocation()
    //^
    //in the w3school example onclick function is in the html, so i moved it to my script.js, but then it was not working. 
    //i asked claude why that is. it was because i never told the click function to do the getLocation()
    //the three functions above were just setting it up but not actually running it...it can exist outside of the click funtion too
    //https://claude.ai/share/bb8f94ee-4a35-4cd7-b5f3-e308d2ad448f
        
})

