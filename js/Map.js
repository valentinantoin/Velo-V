
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


//---VARIABLES DECLARATION
  var form = document.querySelector("form");
  var title = document.getElementById("title");
  var address = document.getElementById("address");
  var places = document.getElementById("places");
  var bikes = document.getElementById("bikes");
  var dispo = document.getElementById("dispo");


  //---CALL AJAX GET FUNCTION
  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=1328d2932ef5b44f742e45744429937adb04b5d2", function(reponse){
      var stations = JSON.parse(reponse);
      stations.forEach(function(station){

          //---GET STATION DATA FROM JCDECAUX
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

          //---CREATE N0 DISPO MARKER
          var redMarker = L.icon({
          iconUrl: "images/redPlaceholder.png",

          iconSize : [25, 38],
          iconAnchor: [22, 94],
          popupAnchor: [-10, -95]
          });

          //---CREATE AND PLACE MARKERS ON MAP
          if(station.available_bikes !== 0) {
            var marker = L.marker(station.position).on("click", pop).addTo(Map.tile);
          }else {
            var marker = L.marker(station.position, {icon: redMarker}).on("click", pop).addTo(Map.tile);
          };           
      });
  });
};

//---CREATE P FOR RESERVATION MESSAGE
var attention = document.createElement("p");
dispo.appendChild(attention);

//---ADD RESERVATION FUNCTION
Map.prototype.reservation = function(e) {

//---GET VALUE OF INPUTS
    var lastName = document.getElementById("yourLastName").value;
    var firstName = document.getElementById("yourFirstName").value;
    var canvasContainer = document.getElementById("canvasContainer");
    

    //---VERIFY INPUTS VALUE
    if((lastName !== "") && (firstName !== "")) {

      //---SET VALUES IN LOCALSTORAGE
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      //---DISPLAY THE CANVAS
      canvasContainer.classList.replace("canvasOff", "canvas");
      dispo.classList.replace("dispo_on", "dispo_off");


    }else {
      attention.innerHTML = "Veuillez saisir vos Nom et Prénom svp";
      
    };
  
    e.preventDefault();

};
//---SET THE EVENT FOR SCRIPT.JS
var button = document.getElementById("button");

//---RESERVATION INIT
button.addEventListener("click", Map.prototype.reservation);
