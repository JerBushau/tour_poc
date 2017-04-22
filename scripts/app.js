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
    info: 'Nice spot to get some work done, on the crowded side at times. Nord\'s bakery is right next door! \nArtisan sustainable kombucha butcher literally brunch. Cray PBR&B ugh church-key pug. Wolf pinterest raclette, flexitarian +1 listicle kale chips live-edge. Ugh locavore hammock blog austin tousled tumblr, food truck synth vice kale chips try-hard etsy banh mi cronut. Scenester brunch banh mi vape, fam selfies green juice tacos put a bird on it tumblr. Succulents street art single-origin coffee keffiyeh, kitsch green juice organic cornhole direct trade woke chia.'
  },
  {
    name: '2) Sunergos on 5th',
    location: '231 S 5th St, Louisville, KY 40202',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/54e96bd8e4b0feaa477006ef/1480515415116/?format=750w',
    info: 'Best coffee of the three loactions, they have a SLAYER(slayerespresso.com)! no seating area. Chicharrones vaporware everyday carry lomo, quinoa aute pop-up assumenda food truck tacos neutra artisan. Cold-pressed fam mixtape, anim fap voluptate williamsburg artisan consectetur ullamco selfies portland. Selvage edison bulb echo park accusamus chicharrones, twee butcher XOXO assumenda distillery. Proident crucifix fanny pack, pork belly nulla vexillologist qui pinterest raclette jean shorts etsy anim wolf magna austin. Est locavore microdosin. Chips four dollar toast typewriter, ut cold-pressed franzen iPhone.'
  },
  {
    name: '3) Sunergos on Woodlawn',
    location: '306 W Woodlawn Ave, Louisville, KY 40214',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/54cd32f5e4b03ca9e80fc66f/1422734114254/Sunergos-4+copy.jpg?format=750w',
    info: 'Plenty of seating, southside location. Succulents coloring book air plant, put a bird on it pok pok roof party pitchfork glossier everyday carry gentrify proident. Pour-over roof party edison bulb, consectetur ramps activated charcoal yuccie butcher bicycle rights culpa anim ullamco quinoa flannel. Tilde dolore labore magna godard hexagon single-origin coffee. Microdosing snackwave kale chips, intelligentsia plaid laborum nisi photo booth venmo pabst est id food truck hoodie pok pok.'
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

