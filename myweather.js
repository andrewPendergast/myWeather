/*Gets the weather from OpenWeatherMap*/
function getWeather(pos1, pos2) {
	var request;


	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} 
	else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if((pos1 != 'null')&&(pos2 != 'null')){

		request.onreadystatechange = function() {
			if ((request.readyState===4) &&(request.status===200)){
				
				
				var weatherResults = JSON.parse(request.responseText);
		
				for (var i = 0; i < weatherResults.list.length; i++) {
				
					if (i==0) {
						createBackground(weatherResults.list[i].temp.day);
						getGraphic(weatherResults.list[i].weather[0].icon, i);
						document.getElementById("city").innerHTML = "<h1> Today in " + weatherResults.city.name + "</h1>";
						document.getElementById("temperature").innerHTML = toFahrenheit(weatherResults.list[i].temp.day) + "&deg;F";
						document.getElementById("high"+ i).innerHTML = "<h5> High: " + toFahrenheit(weatherResults.list[i].temp.max) + "&deg;F </h5>";
						document.getElementById("low"+ i).innerHTML = "<h5> Low: " + toFahrenheit(weatherResults.list[i].temp.min) + "&deg;F </h5>";
						document.getElementById("description").innerHTML = "<h4>" + weatherResults.list[i].weather[0].description + "</h4>";
						if(typeof weatherResults.list[i].rain == "undefined"){
							document.getElementById("precipitation").innerHTML = "Precipitation: " + "0%";
						}
						else {
							document.getElementById("precipitation").innerHTML = "Precipitation: " + weatherResults.list[i].rain + "%";
						}
						document.getElementById("humidity").innerHTML = "Humidity: " + weatherResults.list[i].humidity + "%";
						document.getElementById("wind").innerHTML = "Wind: " + weatherResults.list[i].speed;
					}
					else {
						day(i);
						getGraphic(weatherResults.list[i].weather[0].icon, i);
						document.getElementById("high"+ i).innerHTML = toFahrenheit(weatherResults.list[i].temp.max) + "&deg;F";
						document.getElementById("low"+ i).innerHTML = toFahrenheit(weatherResults.list[i].temp.min) + "&deg;F";
					}
				}
				
			}
		}
		request.open("GET", "myweather.php?lat=" + pos1 + "&lng=" + pos2, true);
		request.send();
	}
		
}
/*Creates a background color based on the temperature*/
function createBackground(temperature) {
	var hex;
	if (temperature > -3) {
		hex = "#779ECB";
	}
	if (temperature > 10) {
		hex = "#77DD77";
	}
	if (temperature > 21) {
		hex = "#FFB347";
	}
	if (temperature > 27.5) {
		hex = "#FF6961";
	}
	document.body.style.background = hex;
}
/*gets the day.  Code edited from w3schools
http://www.w3schools.com/jsref/jsref_getday.asp
*/
function day(dayNum) {
	var d = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var position = d.getDay() + dayNum;
	if (position > 6) {
		position -= weekday.length;
	}
	var n = weekday[position];
	document.getElementById("day" + dayNum).innerHTML = n;
}
/*gets the graphic associated with the weather*/
function getGraphic(oldGraphic, graphicNum) {
	var path = "images/" + oldGraphic + ".svg";
	var obj = document.createElement("object");
	obj.data = path;
	obj.type="image/svg+xml";
	
	document.getElementById("graphic" + graphicNum).appendChild(obj);
}
/*converts celcius to fahrenheit*/
function toFahrenheit(celcius) {
	celcius = parseFloat(celcius * (9/5) + 32).toFixed(2);
	return celcius;
}
/*Gets user's location*/
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(sendPosition);
    }
	else {
		document.getElementById('graphic0').innerHTML = "Geolocation is not supported by this browser.";
	}
	
}
/*Sends position to getWeather() function*/
function sendPosition(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	getWeather(lat, lng);
}
$( document ).ready(function() {
    getLocation();
});