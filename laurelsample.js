//Google Maps Yelp Boys Night and Random Events and Outdoor/festival
///////////////////////////////////////////////////////////////////////////////////////////
//GENERAL FLOW
//
//User will enter a query in the form of a location 
//I want to pass that query through maps API (geocoding) to bring up a map of the area in a new div 
//
//
//
//
//
/////////////////////////////////////////////////////////////////////////////////////////


// GOOGLE MAPS GEOCODE-- 

var map = new.google.maps.Map(docuemnt.getLementById("sample"), mapoptions);
//test code function 
function loadMap() {
 var mapOptions = {
 	//specificies the location where we want to center the map
 center:new google.maps.LatLng(17.240498, 82.287598),
	 //specifies the zoom level of the map 
	 zoom:9,
	 //specifies the type of map -- roadmap, satellite (photographic), hybrid(phto plus roads/city names). terrain (Mts, rivers etc.)
 	mapTypeId:google.maps.MapTypeId.ROADMAP
 };




////////////////////////////////////////////////////////////////////////////////////////

//YELP
var yelpapiKey =
var yelpqueryURL = "https://api.yelp.com/v3/businesses/search"
// var searchQuery = 
//
//
//calling the search API from YELP       
//     //ajax call 
//     $.ajax({
//         url: (yelpqueryURL + searchQuery + yelpapiKey),
//         method: "GET"
//     }).done(function(response) {
// 	    //see what matches up 
// 	    console.log(response);
// 
///////////////////////////////////////////////////////////////////////////////////////


//EVENTS AND CALLS 








///////////////////////////////////////////////////////////////////////////////////////
//TASKS TO FINISH










///////////////////////////////////////////////////////////////////////////////////////
//RESOURCES
//
//Key Yelp 
////Client ID
// ImyIU6DHaqlzfq2Y-v7UPw
// Client Secret
// SOC31MI8AVBkGCnk6At0ScKs8qxdhl3CWtDfX7BF1OoTgSPBUbGONwhNb1i8Ozy1
//
//Key Google Maps
//https://developers.google.com/maps/documentation/geocoding/start
//https://developers.google.com/maps/documentation/javascript/
//https://stackoverflow.com/questions/21411358/google-maps-geocoding-a-string
// http://en.marnoto.com/2015/06/aprende-google-maps-geocoding-exemplos.html
// http://www.wikihow.com/Geocode-an-Address-in-Google-Maps-Javascript
//https://hpneo.github.io/gmaps/examples/geocoding.html




//You already have credentials that are suitable for this purpose
// Server key (auto created by Google Service)
// Key	
// AIzaSyC8nCjKsy9EIVkmqrCTberMfRtiCA_wHQE
// Type	
// None
// Creation date	
// Jul 7, 2017, 9:45:48 PM
// Browser key (auto created by Google Service)

// Key	
// AIzaSyDJBPs135vP7VHNPJKzdMZ39fRMXeyd8dY
// Type	
// None
// Creation date	
// Jul 7, 2017, 