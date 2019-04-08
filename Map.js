// STRICT MODE
"use strict";


//---MAP OBJECT CREATION
class Map {
    constructor() {
        this.init,
        this.tile,
        this.reservation;
    }
};

//---ADD MAP INIT FUNCTION
Map.prototype.init = function() {


  Map.tile = L.map('map').setView([45.759636, 4.832471], 14);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidmFsZGVtb3V0ZSIsImEiOiJjanRlcTFkeGMwNmk0M3lteHVkNzhhdHZ3In0.1N29IeN-haZtuuqiaFAvpw'
  }).addTo(Map.tile);


//---POSITION DATA FROM JCDECAUX
  var form = document.querySelector("form");
  var title = document.getElementById("title");
  var address = document.getElementById("address");
  var places = document.getElementById("places");
  var bikes = document.getElementById("bikes");
  var dispo = document.getElementById("dispo");


//---CREATE N0 DISPO MARKER
var redMarker = L.icon({
  iconUrl: "images/redPlaceholder.png",

  iconSize : [25, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-10, -95]
});


  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=1328d2932ef5b44f742e45744429937adb04b5d2", function(reponse){
      var stations = JSON.parse(reponse);
      stations.forEach(function(station){


          var pop =  function(){

              form.classList.replace("info","showinfo");
              marker.bindPopup(station.name).openPopup();
              sessionStorage.setItem("stationName", station.name);

              title.innerHTML = "<strong>Nom de la station</strong> : " + station.name;
              address.innerHTML = "<strong>Adresse</strong> : " + station.address;
              places.innerHTML = "<strong>Place(s) disponible(s)</strong> : " + station.available_bike_stands;
              bikes.innerHTML = "<strong>Vélo(s) disponible(s)</strong> : " + station.available_bikes;


              if(station.available_bikes === 0) {
                dispo.classList.replace("dispo_on", "dispo_off");
              }else {
                dispo.classList.replace("dispo_off", "dispo_on");
              };

          };

          if(station.available_bikes !== 0) {
            var marker = L.marker(station.position).on("click", pop).addTo(Map.tile);
          }else {
            var marker = L.marker(station.position, {icon: redMarker}).on("click", pop).addTo(Map.tile);
          };           
      });
  });
};