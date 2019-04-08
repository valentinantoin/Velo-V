// STRICT MODE
"use strict";


//---VARIABLE DECLARATIONS
var canvas = document.getElementById("signatureCanvas"),
    ctx = canvas.getContext("2d");
var buttonClear = document.getElementById("buttonClear");
var buttonAccept = document.getElementById("buttonAccept");
var resa = document.getElementById("resa");
var signWarning = document.getElementById("signWarning");


//---CANVAS OBJECT CREATION
class Canvas {
    constructor() {
        this.initMouse,
        this.initTouch,
        this.clearing,
        this.validate,
        this.signature;
    }
};


//---ADD MOUSE DRAWING METHOD
Canvas.prototype.initMouse = function() {

    //---ADD EVENT LISTENERS
    canvas.addEventListener("mousedown", pointerDown);
    canvas.addEventListener("mouseup", pointerUp);   


    //---ADD MOTION DETECTION
    function pointerDown(e) {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        canvas.addEventListener("mousemove", paint);
    };
 
    function pointerUp(e) {
        canvas.removeEventListener("mousemove", paint);
        paint(e);
    };
 
    function paint(e) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        Canvas.signature = 1;
    };
};


//---ADD TOUCH DRAWING METHOD
Canvas.prototype.initTouch = function() {

    //---ADD EVENT LISTENERS
    canvas.addEventListener("touchstart", touchDown);
    canvas.addEventListener("touchend", touchUp);

    //---ADD MOTION DETECTION
    function touchDown(e) {
        ctx.beginPath();
        var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        var touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        ctx.moveTo(touchX, touchY);
        canvas.addEventListener("touchmove", paint);
        e.preventDefault();
    };

    function touchUp(e) {
        canvas.removeEventListener("touchmove", paint);
        paint(e);
    };

    function paint(e) {
        var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        var touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        ctx.lineTo(touchX, touchY);
        ctx.stroke();
        Canvas.signature = 1;
    };
};


//---ADD CLEARING METHOD
Canvas.prototype.clearing = function(clearing) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    Canvas.signature = 0;
    clearing.preventDefault();
};

buttonClear.addEventListener("click", Canvas.prototype.clearing);


//---ADD VALIDATE METHOD
Canvas.prototype.validate = function(validate) {

    var lastName = localStorage.getItem("lastName");
    var firstName = localStorage.getItem("firstName");
    var stationName = sessionStorage.getItem("stationName");

    var timeRemaining = 1200;

    if(Canvas.signature !== 1) {

        signWarning.innerHTML = "<p>Votre signature est obligatoire afin de valider la réservation.</p>";
   
    }else {

    setInterval(calculate, 1000);

    function calculate() {

	  if(timeRemaining >= 0) {

          var minutes = parseInt(timeRemaining / 60);
 
          var seconds = parseInt(timeRemaining % 60)

          canvasContainer.innerHTML = "<p><strong>Votre demande a été prise en compte avec succés !<br><br>Détails de votre réservation ci-dessous.</strong></p><button class=\"button\" onClick=\"window.location.reload()\">Effectuer une nouvelle réservation</button><p><em>La nouvelle réservation remplacera la précédente.</em></p>";
          resa.innerHTML = "<p>Votre réservation au nom de : " + lastName + " " + firstName + "," + " est valable à la station " + stationName +" pendant : <br><br>" +  minutes + "min et " + seconds + "s.</p>" ;
          resa.classList.replace("resa", "resa_on");
          dispo.innerHTML = "";
          
        }else {

          canvasContainer.innerHTML = "<p><strong>Votre demande a été prise en compte avec succés !<br><br>Détails de votre réservation ci-dessous.</strong></p><button class=\"button\" onClick=\"window.location.reload()\">Effectuer une nouvelle réservation</button><p><em>La nouvelle réservation remplacera la précédente.</em></p>";
           resa.innerHTML = "<p>Votre réservation a expirée !</p>";
           resa.classList.replace("resa", "resa_on");
        }

        timeRemaining--;
    };
};
   validate.preventDefault();
};

buttonAccept.addEventListener("click", Canvas.prototype.validate);
