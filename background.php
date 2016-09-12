<?php
	header("Content-Type: application/json; charset=UTF-8");
	
	$latitude = rawurlencode($_REQUEST['lat']);
	$longitude = rawurlencode($_REQUEST['lng']);
	
	$forecast = html_entity_decode(file_get_contents('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8e3898c6c1e0152d23bd11e119d2f205&privacy_filter=1&accuracy=11&safe_search=1&content_type=1&lat=' . $latitude . '&lon=' . longitude .'&format=json&nojsoncallback=1'));
	
	echo $forecast
?> 