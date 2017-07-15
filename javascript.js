//This is the final javascript page for the NIGHTOUT application 

//triggers the carousel function 
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

    $("#results").hide();
    $(".logoutButtonClass").hide();
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
var nightType = "random";
var numEventsPicked = 0;

//api.openweathermap.org/data/2.5/weather?q={city name}

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    firebaseUser = user;

    // Try to read preferred city
    database.ref('/users/' + firebaseUser.uid).once('value').then(function(snapshot) {
       userCity = snapshot.val().city;
    });

    // Hide all sign in and sign up
    $(".loginButtonClass").hide();
    $(".signUpButtonClass").hide();

    // Show logout button
    $(".logoutButtonClass").show();
    
  } else {
    // No user is signed in.

    $(".loginButtonClass").show();
    $(".signUpButtonClass").show();
    $(".logoutButtonClass").hide();
  }
});

function eventButtonClicked(button) {
    if ($(button).hasClass("eventClicked")) {
        $(button).removeClass("eventClicked");
        numEventsPicked--;
    }
    else {
        $(button).addClass("eventClicked");
        numEventsPicked++;
    }

    if (numEventsPicked == 3) {
        $(".eventClicked").each(function(index){
            $("#results"+index).html($(this).html());
        })
        $("#doneModal").modal('open');
    }
}

function eventBriteQuery() {
    var token = "R6QQVF4RQTZXWE5XVPC5";
    // https://www.eventbriteapi.com/v3/events/search/?location.address=Raleigh&token=R6QQVF4RQTZXWE5XVPC5
    var queryURL = `https://www.eventbriteapi.com/v3/events/search/?location.address=${userCity}&start_date.keyword=today&token=${token}`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(data){
        console.log(data);
        $("#eventBriteResults").empty();
        var maxResults = 0;

        if (nightType == "random") {
            maxResults = 2;
        }
        for (var i = 0; i < data.events.length && i < maxResults; i++) {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Event - ${data.events[i].name.html}</button>`;
            $("#eventBriteResults").append(newDiv);
        }
    });
}

function fourSquareDrinks()
{
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);
    //can update this with other elements 
    //for exmaple change the part below for the button for girls night to drinks instead of food
    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=drinks`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        //console.log(data);
         var maxResults = 5;
                
        if (nightType == "girls") {
            maxResults = 2;
        }
        else if (nightType == "guys") {
            maxResults = 2;
        }
        else if (nightType == "random") {
            maxResults = 2;
        }
        else if (nightType == "date") {
            maxResults = 1;
        }

        for (var i = 0; i < data.response.groups[0].items.length && i < maxResults; i++)
        {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Drinks - ${data.response.groups[0].items[i].venue.name}</button>`;
            $("#fourSquareDrinks").append(newDiv);
        }
    });
}

function fourSquareTrending()
{
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);

    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=trending`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        //console.log(data);
        var maxResults = 0;
                
        if (nightType == "girls") {
            maxResults = 3;
        }
        else if (nightType == "guys") {
            maxResults = 0;
        }
        else if (nightType == "random") {
            maxResults = 0;
        }

        for (var i = 0; i < data.response.groups[0].items.length && i < maxResults; i++)
        {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Trendy Spot - ${data.response.groups[0].items[i].venue.name}</button>`;
            $("#fourSquareTrending").append(newDiv);
        }
    });
}

function fourSquareSights()
{
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);
    //can update this with other elements 
    //for exmaple change the part below for the button for girls night to drinks instead of food
    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=sights`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        //console.log(data);
         var maxResults = 0;
                
        if (nightType == "girls") {
            maxResults = 0;
        }
        else if (nightType == "guys") {
            maxResults = 3;
        }
        else if (nightType == "random") {
            maxResults = 2;
        }
        else if (nightType == "date") {
            maxResults = 4;
        }

        for (var i = 0; i < data.response.groups[0].items.length && i < maxResults; i++)
        {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Sights - ${data.response.groups[0].items[i].venue.name}</button>`;
            $("#fourSquareSights").append(newDiv);
        }
    });
}

function fourSquareCoffee()
{
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);
    //can update this with other elements 
    //for exmaple change the part below for the button for girls night to drinks instead of food
    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=coffee`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        //console.log(data);
         var maxResults = 0;
                
        if (nightType == "girls") {
            maxResults = 0;
        }
        else if (nightType == "guys") {
            maxResults = 0;
        }
        else if (nightType == "random") {
            maxResults = 2;
        }

        for (var i = 0; i < data.response.groups[0].items.length && i < maxResults; i++)
        {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Coffee - ${data.response.groups[0].items[i].venue.name}</button>`;
            $("#fourSquareCoffee").append(newDiv);
        }
    });
}

function fourSquareArts()
{
    var clientId = "E2ASPJ0FPTMTQUB1RGYFICEWYIGTT2NG3CJXTREL4WXGQVZO";
    var clientSecret = "EHEV5ED4QETVAL5QAS3EEKGBXZELL5QVG5XAPWQJY2R11HFO";

    var location = encodeURIComponent(userCity);
    //can update this with other elements 
    //for exmaple change the part below for the button for girls night to drinks instead of food
    var queryURL = `https://api.foursquare.com/v2/venues/explore?v=20170101&client_id=${clientId}&client_secret=${clientSecret}&near=${location}&intent=browse&section=arts`;

    console.log(queryURL);
    $.ajax({
         url: queryURL
    })
    .done(function(data){
        //console.log(data);
         var maxResults = 0;
                
        if (nightType == "date") {
            maxResults = 2;
        }

        for (var i = 0; i < data.response.groups[0].items.length && i < maxResults; i++)
        {
            var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Arts - ${data.response.groups[0].items[i].venue.name}</button>`;
            $("#fourSquareArts").append(newDiv);
        }
    });
}

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

function googlePlacesQuery()
{
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
        map = new google.maps.Map(document.getElementById('googleMaps'), {
            center: results["0"].geometry.location,
            zoom: 15
        });
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
            //console.log(results);
            $("#googleResults").empty();
            //returns up to 5 restaurnts potentially fewer 
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var maxResults = 5;
                
                if (nightType == "girls") {
                    maxResults = 5;
                }
                else if (nightType == "guys") {
                    maxResults = 5;
                }
                else if (nightType == "random") {
                    maxResults = 2;
                }
                else if (nightType == "date") {
                    maxResults = 3;
                }

                for (var i = 0; i < results.length && i < maxResults; i++) {
                    createMarker(results[i]);
                    var newDiv=`<button onclick='eventButtonClicked(this)' class="eventDiv black-text">Eat - ${results[i].name}</button>`;
                    $("#googleResults").append(newDiv);
                }
            }
        });
      }
      else {

      }
    });
}

//these are the signin-out authentication buttons for the modals (for one modal, link it to the ones on the menu)
//double check from the slack convo 
$("#modalCreate").click(function(){
    var email = $("#modalEmailSignUp").val().trim();
    var password = $("#modalPassSignUp").val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        console.log("created account");
        $("#signUpModal").modal('close');
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signUpErrorText").html(error.message);
  // ...
    });

});

$(".logOut").click(function(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        firebaseUser = undefined;
    }).catch(function(error) {
        
    });
});

$("#modalSignIn").click(function(event){
    event.preventDefault();
    var email = $("#modalEmail").val().trim();
    var password = $("#modalPass").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
        $("#signInModal").modal('close');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInErrorText").html(error.message);
    });
});

$(".signInFaceBook").click(function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $("#signInModal").modal('close');
        $("#signUpModal").modal('close');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInErrorText").html(error.message);
        $("#signUpErrorText").html(error.message);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

$(".signInTwitter").click(function(){
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $("#signInModal").modal('close');
        $("#signUpModal").modal('close');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInErrorText").html(error.message);
        $("#signUpErrorText").html(error.message);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

$(".signInGoogle").click(function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        $("#signInModal").modal('close');
        $("#signUpModal").modal('close');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInErrorText").html(error.message);
        $("#signUpErrorText").html(error.message);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

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

$( document ).ready(function() {
    $("#introPage").show();
    $("#howItWorksWrapper").hide();
    $("#results").hide();
});

$("#experienceButton").click(function(){
    $("#howItWorksWrapper").show();
    $("#results").hide();
    $("#introPage").hide();
});

$("#letsGoButton").click(function(){
    userCity = $("#userCity").val().trim();

    var letterOnly = /^([^0-9]*)$/.test(userCity);
    if (!letterOnly) {
        $("#enterCity").html("Enter Your City - Numbers Are Not Allowed In City Names");
        return;
    }

    if (userCity.length == 0) {
        $("#enterCity").html("Enter Your City - Please Enter A City");
        return;
    }

    $("#enterCity").html("Enter Your City");

    $("#howItWorks").hide();
    $("#results").show();
    $("#modalLocation").modal('close');


    // Save userCity to the database
    if (firebaseUser != undefined) {
        database.ref("users/" + firebaseUser.uid).set({
            city: userCity
        });
    }

    $("#preferredCity").html(userCity);
    weatherQuery();
    googlePlacesQuery();
    
    fourSquareDrinks();
    
    fourSquareTrending();

    fourSquareCoffee();
    
    fourSquareSights();

    fourSquareArts();

    eventBriteQuery();
})

$("#girlsNight").click(function(){
    nightType = "girls";
    $("#userCity").val(userCity);
    if (userCity != undefined && userCity != "") {
        Materialize.updateTextFields();
    }
})
$("#guysNight").click(function(){
    nightType = "guys";
    $("#userCity").val(userCity);
    if (userCity != undefined && userCity != "") {
        Materialize.updateTextFields();
    }
})
$("#dateNight").click(function(){
    nightType = "date";
    $("#userCity").val(userCity);
    if (userCity != undefined && userCity != "") {
        Materialize.updateTextFields();
    }
})
$("#randomNight").click(function(){
    nightType = "random";
    $("#userCity").val(userCity);
    if (userCity != undefined && userCity != "") {
        Materialize.updateTextFields();
    }
})

//https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

$("#clipboard").click(function(){
    var clipText = "";
    $(".eventClicked").each(function(item){
        clipText += $(this).html() + "\n";
    })
    copyTextToClipboard(clipText);
})

$("#close").click(function(){
    $("#howItWorks").show();
    $("#results").hide();
    $("#doneModal").modal('close');
    numEventsPicked = 0;
    $("#googleResults").empty();
    $("#fourSquareDrinks").empty();
    $("#fourSquareTrending").empty();
    $("#fourSquareSights").empty();
    $("#fourSquareCoffee").empty();
    $("#fourSquareArts").empty();
    $("#eventBriteResults").empty();
})