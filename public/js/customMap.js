(g=>{
  var h,a,k,p="The Google Maps JavaScript API",
  c="google",
  l="importLibrary",
  q="__ib__",
  m=document,
  b=window;
  b=b[c]||(b[c]={});
  var d=b.maps||(b.maps={}),
  r=new Set,
  e=new URLSearchParams,
  u=()=>h||(h=new Promise(async(f,n)=>{
    await (a=m.createElement("script"));
    e.set("libraries",[...r]+"");
    for(k in g)e.set(k.replace(/[A-Z]/g,
    t=>"_"+t[0].toLowerCase()),g[k]);
    e.set(
      "callback",
    c+".maps."+q
    );
    a.src=`https://maps.${c}apis.com/maps/api/js?`+e;
    d[q]=f;
    a.onerror=()=>h=n(Error(p+" could not load."));
    a.nonce=m.querySelector("script[nonce]")?.nonce||"";
    m.head.append(a)
  }));
    d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))
})    
({
  key: "AIzaSyCK94DLgakAstmA3rMBn5oMWF2hYtFI8n0", 
  v: "weekly"
});

/**
 * Finds the user's current location using the Geolocation API and centers the map on that location.
 * If successful, a marker is placed at the user's location on the map.
 * @function findUserLocation
 * @global
 * @returns {void}
 */
function findUserLocation() {
  // Check if geolocation is supported
  if (navigator.geolocation) {
console.log('geolocation',navigator.geolocation);




      // Get user's current position
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('position',position);
          const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              Accuracy: position.coords.accuracy
          };
          console.log('userLocation',userLocation);

          // Center the map on the user's location
          map.setCenter(userLocation);

          // You can also add a marker at the user's location
          const marker = new google.maps.Marker({
              position: userLocation,
              map: map,
              title: 'Your Location'
          });
      }, function() {
          // Handle error if user's location cannot be retrieved
          alert('Error: The Geolocation service failed.');
      });
  } else {
      // Browser doesn't support Geolocation
      alert('Error: Your browser does not support geolocation.');
  }
}

/**
 * Finds the user's current location using the Geolocation API and centers the map on that location.
 * If successful, a marker is placed at the user's location on the map.
 * @function initMap
 * @global parentFunction
 * @returns {void}
 */
let map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
console.log(map)

findUserLocation();
// console.log(navigator.geolocation)
}
initMap();

