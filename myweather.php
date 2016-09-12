<?php
	header("Content-Type: application/json; charset=UTF-8");
	
	$latitude = rawurlencode($_REQUEST['lat']);
	$longitude = rawurlencode($_REQUEST['lng']);
	
	$forecast = html_entity_decode(file_get_contents('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' . $latitude . '&lon=' . $longitude . '&units=metric&cnt=7&mode=json' . '&APPID=59e3f8347dd9fb05e678cd627127782a'));
	
	echo $forecast
?> 