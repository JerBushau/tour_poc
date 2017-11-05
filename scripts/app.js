'use strict'

let map;
let directionsService;
let directionsDisplay;
let currentLocation;
let currentDestination;
let travelMode;
let currentIndex = 0;

// JSON stops
let tourStops = [
  {
    name: 'Sunergos on preston',
    location: '2122 S Preston St, Louisville, KY 40217',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/59c93036e9bfdfecd27ec3ea/1506357320082/IMG_5680.jpg?format=500w',
    info: 'Nice spot to get some work done, on the crowded side at times. Nord\'s bakery is right next door! \nArtisan sustainable kombucha butcher literally brunch. Cray PBR&B ugh church-key pug. Wolf pinterest raclette, flexitarian +1 listicle kale chips live-edge. Ugh locavore hammock blog austin tousled tumblr, food truck synth vice kale chips try-hard etsy banh mi cronut. Scenester brunch banh mi vape, fam selfies green juice tacos put a bird on it tumblr. Succulents street art single-origin coffee keffiyeh, kitsch green juice organic cornhole direct trade woke chia.'
  },
  {
    name: 'Sunergos on 5th',
    location: '231 S 5th St, Louisville, KY 40202',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/59c93081f5e231573fe5e2b8/1506357455396/2017_8_Sungergos_jk_16.jpg?format=500w',
    info: 'Best coffee of the three loactions, they have a SLAYER(slayerespresso.com)! no seating area. Chicharrones vaporware everyday carry lomo, quinoa aute pop-up assumenda food truck tacos neutra artisan. Cold-pressed fam mixtape, anim fap voluptate williamsburg artisan consectetur ullamco selfies portland. Selvage edison bulb echo park accusamus chicharrones, twee butcher XOXO assumenda distillery. Proident crucifix fanny pack, pork belly nulla vexillologist qui pinterest raclette jean shorts etsy anim wolf magna austin. Est locavore microdosin. Chips four dollar toast typewriter, ut cold-pressed franzen iPhone.'
  },
  {
    name: 'Sunergos on Woodlawn',
    location: '306 W Woodlawn Ave, Louisville, KY 40214',
    img: 'https://static1.squarespace.com/static/54c6434de4b0badc93af5fb8/t/59c9314ea9db0992707e6821/1509459546810/IMG_5785.jpg?format=500w',
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
    document.getElementById('map-btn').style.display = 'flex';
  }, (error) => {
    // if they deny, give them generic location
    if (error.code == error.PERMISSION_DENIED) {
      currentLocation = 'louisville, ky';
      document.getElementById('map-btn').style.display = 'flex';
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
}

// view prev 'stop'
function prevStop() {
  (currentIndex <= 0) ? currentIndex = (tourStops.length - 1) : currentIndex--;
  setDestination();
}

// show map view
function toggleMap() {
  let mapWrap = document.getElementById('map-wrap');
  let infoWrap = document.getElementById('info-wrap');

  if (mapWrap.style.display === '' || mapWrap.style.display === 'none') {
    mapWrap.style.display = 'flex';
    infoWrap.style.display = 'none';
    google.maps.event.trigger(map, 'resize');
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  } else {
    mapWrap.style.display = 'none';
    infoWrap.style.display = 'flex';
  };

}

// init google map
function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    scrollwheel: false,
    disableDefaultUI: true,
    mapTypeControl: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('panel'));
}

// calculate and render directions
function calculateAndDisplayRoute() {
  let travelMode = document.getElementById('mode').value;

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
