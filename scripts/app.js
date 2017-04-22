'use strict'

// CLEAN UP THIS MESS
var directionsService;
var directionsDisplay;
var currentLocation;
var currentDestination;
var currentIndex = 0;
var travelMode;

// JSON stops
var tourStops = [
  {
    name: '1) Sunergos on preston',
    location: '2122 S Preston St, Louisville, KY 40217',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/54e96c65e4b0a4e937ac1237/1424584349432/?format=750w',
    info: 'Chill spot to get some work done, on the crowded side at times. Nord\'s bakery is right next door!'
  },
  {
    name: '2) Sunergos on 5th',
    location: '231 S 5th St, Louisville, KY 40202',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/54e96bd8e4b0feaa477006ef/1480515415116/?format=750w',
    info: 'Best coffee of the three loactions, they have a SLAYER(slayerespresso.com)! no seating area.'
  },
  {
    name: '3) Sunergos on Woodlawn',
    location: '306 W Woodlawn Ave, Louisville, KY 40214',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/54cd32f5e4b03ca9e80fc66f/1422734114254/Sunergos-4+copy.jpg?format=750w',
    info: 'Plenty of seating, southside location.'
  }
];

// set default destination view
setDestination();

// check for geolocation
if ("geolocation" in navigator) {
  findCurrentLocation();
} else {
  currentLocation = 'louisville, ky';
};

// get user current location
function findCurrentLocation() {
  navigator.geolocation.watchPosition((pos) => {
    currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }, (error) => {
    // if they deny, give generic location
    if (error.code == error.PERMISSION_DENIED) {
      currentLocation = 'louisville, ky';
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
  });
}

// set and render destination view
function setDestination() {
  let stop = tourStops[currentIndex];
  currentDestination = stop.location;
  document.getElementById('name').textContent = stop.name;
  document.getElementById('info').textContent = stop.info;
  document.getElementById('photo').src = stop.img;
}

// view next 'stop'
function nextStop() {
  (currentIndex >= tourStops.length - 1) ? currentIndex = 0 : currentIndex++;

  setDestination();
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

// init google map
function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    scrollwheel: false
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('panel'));
}

// calculate and render directions
function calculateAndDisplayRoute() {
  var travelMode = document.getElementById('mode').value;

  directionsService.route({
    origin: currentLocation,
    destination: currentDestination,
    travelMode: google.maps.TravelMode[travelMode],
  }, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      console.log('Directions request failed due to ' + status);
    };
  });
}

