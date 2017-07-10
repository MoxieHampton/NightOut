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
//AIzaSyDmZyph_0mPWdXM8yXSLT669Z_G3lttS_U
//This function gets the info about the city/state that the user enters
//may want to link with yelp api
//call geocode after the form!!!
//geocode();
//get location form
var locationForm = document.getElementById('location-form');

//listen for the submit here 
locationForm.addEventListener('submit', geocode);

    function geocode(event){
        //prevent actual submit
        event.preventDefault();
        var location = document.getElementById('location-input').value;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
            params:{
                address: location, 
                key:'AIzaSyDmZyph_0mPWdXM8yXSLT669Z_G3lttS_U'
            }

        })
        .then(function(response){
            //logging the full response
            console.log(response);

            //formatting the address from the data object, then dive into array for a single object
            console.log(response.data.results[0].formatted_address);
            var formattedAddress = response.data.results[0].formatted_address;
            //can use back ticks to great a templatte with multiple lines!!!
            var formattedAddressOutput = `
                <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
                </ul>

            `;

            //address components 
            var addressComponents = response.data.results[0].address_components;
            //loop through that array to get the rest of the address info 
            var addressComponentsOutput = '<ul class="list-group">';
            for(var i = 0; i < addressComponents.length; i++){
                //have to add to output variable; also add to template, ${} is just a variable/selector 
                addressComponentsOutput += `
                <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>:${addressComponents[i].long_name}</li>
                `;
            }
            addressComponentsOutput += '</ul>';
            //geometry Info
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var geometryOutput = `<li class="list-group-item"><strong>Latitude</strong>:${lat}</li>
            <li class="list-group-item"><strong>Longitude</strong>:${lng}</li>

            `;

            //output to the mapSpace, address-components,  div
            document.getElementById('mapSpace').innerHTML = formattedAddressOutput;
            document.getElementById('address-components').innerHTML = addressComponentsOutput;
            document.getElementById('geometryInfo').innerHTML = geometryOutput;

        })
        .catch(function(error){
            console.log("error!!!");
        });

        }





////////////////////////////////////////////////////////////////////////////////////////

//YELP
// var yelpapiKey =
// var yelpqueryURL = "https://api.yelp.com/v3/businesses/search"
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
// $(document).ready(function(){
// 	console.log("document is ready");
// 	loadMap();
// 	console.log("map is setting up");
// 	var mapOptions = {
// 		//specificies the location where we want to center the map
// 	 	center:new google.maps.LatLng(17.240498, 82.287598),
// 		 //specifies the zoom level of the map 
// 		 zoom:9,
// 		 //specifies the type of map -- roadmap, satellite (photographic), hybrid(phto plus roads/city names). terrain (Mts, rivers etc.)
// 	 	mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
// 	var map = new google.maps.Map(document.getElementById("mapspace"), mapOptions);
// }
// loadMap();
	
// });

// $(document).ready(function(){

// 	$('a').on('click', function(e){
// 		console.log("you clicked me");
// 	})
// });




///////////////////////////////////////////////////////////////////////////////////////
//TASKS TO FINISH OR QUESTIONS FOR THE GROUP
//1.  What is supposed to be displayed via map?  The city or the location of an actual event etc.? 
//2.  Makign an ajax call via axios (different tech), it is promised-based, I assume it still counts?
//3.  Connect Yelp API to mark businesses-- does it connect with google maps? Check if I can preset the categories from the google doc! Potentially could be markers for those top 5/10







///////////////////////////////////////////////////////////////////////////////////////
//RESOURCES
//
//YELP 
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
//explains what comes back from the response -- revese is entering Lon and Lat
//https://youtu.be/pRiQeo17u6c
//https://github.com/mzabriskie/axios for use with Postman account 
//https://www.youtube.com/watch?v=Zxf1mnP5zcw
//stopped at 12:15
//https://developers.google.com/maps/documentation/javascript/custom-markers





//API Google maps JS API
//AIzaSyDmZyph_0mPWdXM8yXSLT669Z_G3lttS_U

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