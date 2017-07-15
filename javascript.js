//This is the final javascript page for the NIGHTOUT application 
//triggers the carousel function on the landing page 

//controls the carousel on the landing page/index
$(document).ready(function () {

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    //timer for the carousel
    $('.carousel').carousel({
        padding: 200
    });
    autoplay()

    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 3500);
    }
    $('.parallax').parallax();

});

//firebase config with key

var config = {
    apiKey: "AIzaSyDJBPs135vP7VHNPJKzdMZ39fRMXeyd8dY",
    authDomain: "nightout-81410.firebaseapp.com",
    databaseURL: "https://nightout-81410.firebaseio.com",
    projectId: "nightout-81410",
    storageBucket: "nightout-81410.appspot.com",
    messagingSenderId: "1000413859626"
  };

//global vars

var userCity = "";
var userLat = "";
var userLong = "";
var firebaseUser;
var map;

//api.openweathermap.org/data/2.5/weather?q={city name}

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

function printUserCity() {
    $("#preferredCity").html("City: " + userCity);
    $("#weather").html("");
}
//firebase call with this 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    firebaseUser = user;

    // Try to read preferred city
    database.ref('/users/' + firebaseUser.uid).once('value').then(function(snapshot) {
       userCity = snapshot.val().city;
       printUserCity();
    });

    // Hide all sign in and sign up
    $(".omb_login").hide();

    // Show logout button
    $(".omb_logout").show();
    
  } else {
    // No user is signed in.

    $(".omb_logout").hide();
    $(".omb_login").show();
  }
});


//This call captures the city and state value from the location modal
// $("#cityInputForm").submit(function(){
//     event.preventDefault();
//     userCity = $("#cityInput").val().trim();
//     printUserCity();

//     if (firebaseUser != undefined) {
//         database.ref("users/" + firebaseUser.uid).set({
//             city: userCity
//         });
//     }
// });

//captures the userCity information from the let's go button to pass through the weather api

$("#modalButton").click(function(){
    event.preventDefault();
    //make a new variable called usercity based on the the trimmed value of the "city input" box
    userCity = $("#cityInput").val().trim();
    //see what the value logged is
    console.log(userCity);
    //run the function Print user city to print the city in the preferred city div
    printUserCity();

    if(firebaseUser != undefined) {

        database.ref("users/" + firebaseUser.uid).set({
            city: userCity
        })
    }

});


// eventbrite button will show events in selected cities when button is clicked
$("#eventBriteButton").click(function(){
    var token = "R6QQVF4RQTZXWE5XVPC5";
    // https://www.eventbriteapi.com/v3/events/search/?location.address=Raleigh&token=R6QQVF4RQTZXWE5XVPC5
    var queryURL = `https://www.eventbriteapi.com/v3/events/search/?location.address=${userCity}&start_date.keyword=today&token=${token}`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(data){
        console.log(data);
        //empty the eventBrite results div  
        $("#eventBriteResults").empty();
        for (var i = 0; i < data.events.length; i++) {
            var newDiv=`<div>${data.events[i].name.html}</div>`
            $("#eventBriteResults").append(newDiv);
        }
    });
});


$("#fourSquareFoodButton").click(function(){
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);

    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=food`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        console.log(data);
    });
});

//sets up the push of fourSquareFood content to the user
// $("fourSquareFood").innerHTML();

$("#fourSquareTrendingButton").click(function(){

    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);

    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=trending`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        console.log(data);
    });
});

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

//sets up the push of fourSquareTrends content to the user
// $("fourSquareTrends").innerHTML() = ;


$("#googlePlacesButton").click(function(){

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': userCity}, function(results, status) {
      if (status == 'OK') {
        console.log(results);
        userLat = results["0"].geometry.location.lat();
        userLong = results["0"].geometry.location.lng();

        var pyrmont = new google.maps.LatLng(userLat,userLong);
        var request = {
            location: pyrmont,
            radius: '500',
            type: ['restaurant']
        };
        map = new google.maps.Map(document.getElementById('map'), {
            center: results["0"].geometry.location,
            zoom: 15
        });
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
            console.log(results);
            $("#googleResults").empty();
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length && i < 5; i++) {
                    createMarker(results[i]);
                    var newDiv=`<div>${results[i].name}</div>`
                    $("#googleResults").append(newDiv);
                }
            }
        });
      }
      else {

      }
    });
});

//event for clicking the sign-up link on the nav menu-- for now the a hrefs are # placeholders, call modal?
$("#signUpButton").click(function(){
    var email = $("#emailInput").val().trim();
    var password = $("#passwordInput").val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  // ...
    });

});
//aka Log out on the nav menu
$("#signOut").click(function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    firebaseUser = undefined;
    }).catch(function(error) {
    // An error happened.
    });
});

$("#signInForm").submit(function(event){
    event.preventDefault();
    var email = $("#emailInput").val().trim();
    var password = $("#passwordInput").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
});

$("#signInFaceBook").click(function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

});

$("#signInTwitter").click(function(){
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

$("#signInGoogle").click(function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;

        // ...
        console.log("signed in with google");
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

 

//updated weather api function 
function weatherQuery()
{
   var queryURL = `https://api.apixu.com/v1/current.json?key=fabc133684694665aae31230171407&q=${encodeURIComponent(userCity)}`;
   $.ajax({
       url: queryURL
   })
   .done(function(data){
       //console.log(data);
       $("#preferredWeather").html(`${data.current.temp_f} Degrees ${data.current.condition.text}`);
   })
   .fail(function(jqXHR, textStatus)
   {
       console.log(textStatus);
   })
}


//this API only uses http, it will be BLOCKED by chrome 
// $("#weatherButton").click(function(){
//     event.preventDefault();
//     //api.openweathermap.org/data/2.5/weather?q={city name}
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userCity +
//     "&units=imperial&APPID=1f696d92481f8b09a45310a970c0b486";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).done(function(data){
//         console.log(data);
//         console.log(data.main.temp);
//         console.log(data.weather[0].description);
//         //http://openweathermap.org/img/w/10d.png
//         var weatherHtml = `The weather is ${data.main.temp} F <img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png' alt='${data.weather[0].description}'>`;
//         $("#weather").html(weatherHtml);
//     });
// });

// $("#meetUpButton").click(function(){
//     // api key for meetup 67126c723a751b543f227367b1f5954
//     var queryURL = "https://api.meetup.com/2/events?key=67126c723a751b543f227367b1f5954&group_urlname=ny-tech&sign=true";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//          }).done(function(data){
//              console.log(data);
//          });
// });


// $(".dateNightButton").click(function(){

// })

// Client ID
// ImyIU6DHaqlzfq2Y-v7UPw
// Client Secret
// SOC31MI8AVBkGCnk6At0ScKs8qxdhl3CWtDfX7BF1OoTgSPBUbGONwhNb1i8Ozy1

// $(".dateNightButton").click(function(){
//     var queryURL = "";
// });


//  function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }


// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.onAuth(function(authData) {
//   if (authData && isNewUser) {
//     // save the user's profile into Firebase so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child("users").child(authData.uid).set({
//       provider: authData.provider,
//       name: getName(authData)
//     });
//   }
// });

// $("#yelpButton").click(function(){
//     // Client ID
// // ImyIU6DHaqlzfq2Y-v7UPw
// // Client Secret
// // SOC31MI8AVBkGCnk6At0ScKs8qxdhl3CWtDfX7BF1OoTgSPBUbGONwhNb1i8Ozy1

// // $ curl -d "grant_type=client_credentials&client_id=ImyIU6DHaqlzfq2Y-v7UPw&client_secret=SOC31MI8AVBkGCnk6At0ScKs8qxdhl3CWtDfX7BF1OoTgSPBUbGONwhNb1i8Ozy1" -X POST https://api.yelp.com/oauth2/token
// // {"access_token": "8vBb2_Y61wo65MJ4u5jFEo489N4-aL6GKPYYhB8qZ59Sip_9ppmymC-Bo-j5maeBUrgT0Q78u4jTDz3LKxpm2oVq1QWOwwdfKsne69qVPidZh2Nu3dPBGRIhwylkWXYx", "expires_in": 15551999, "token_type": "Bearer"}
//     //  var token = "8vBb2_Y61wo65MJ4u5jFEo489N4-aL6GKPYYhB8qZ59Sip_9ppmymC-Bo-j5maeBUrgT0Q78u4jTDz3LKxpm2oVq1QWOwwdfKsne69qVPidZh2Nu3dPBGRIhwylkWXYx";
//     //  var queryURL = "https://api.yelp.com/v3/businesses/search/?term=food&location=Raleigh"
//     //  $.ajax({
//     //     url: queryURL,
//     //     headers: {"Authorization": "Bearer " + token}
//     // })           
//     // .done(function (data) {
//     //   console.log(data);
//     // })
//     // .fail(function (jqXHR, textStatus) {
//     //   alert("error: " + textStatus);
//     // });

//     // $.ajax({
//     // url      : 'http://api.yelp.com/business_review_search',
//     // dataType : 'jsonp',
//     // data     : {term : 'restaurant', lat : xxx, long : xxx}, // callback is not necessary
//     // success  : function(data) {
//     //     // data is a normal response shown on yelp's API page
//     //     console.log(data)
//     // }
//     // });
// });

//////////////////////TASKS//////////////////////
// Attach events to the login buttons/out buttons (,ake sure the ids match all of them)
// hamburger button for the nav bar?
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 