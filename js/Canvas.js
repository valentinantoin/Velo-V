
// STRICT MODE
"use strict";

//---VARIABLE DECLARATIONS
var canvas = document.getElementById("signatureCanvas"),
    ctx = canvas.getContext("2d");
var buttonClear = document.getElementById("buttonClear");
var buttonAccept = document.getElementById("buttonAccept");
var resa = document.getElementById("resa");
var signWarning = document.getElementById("signWarning");
var form = document.querySelector("form");
var map_on = document.getElementById("map");
var touchX;
var touchY;


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

    //---GET TOUCHES POSITION
    function touches(e) {
        var canvasCss = e.target.getBoundingClientRect();
         touchX = e.targetTouches[0].clientX - canvasCss.left;
         touchY = e.targetTouches[0].clientY - canvasCss.top;
    };

    //---ADD MOTION DETECTION
    function touchDown(e) {
        ctx.beginPath();
        touches(e);
        ctx.moveTo(touchX, touchY);
        canvas.addEventListener("touchmove", paint);
        e.preventDefault();
    };

    function touchUp(e) {
        canvas.removeEventListener("touchmove", paint);
        paint(e);
    };

    function paint(e) {
        touches(e);
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





//---ADD RESERVATION CHECKING METHOD

Canvas.prototype.reservation = function() {

    var reservation = sessionStorage.getItem("reservation");

    if(reservation == 1) {

        canvasContainer.classList.replace("canvasOff", "canvas");
        form.classList.replace("info","showinfo_onresa");
        map.classList.replace("map_on","map_off");

        var distance = sessionStorage.getItem("timer");

        calculate();
};
};


//---ADD VALIDATE METHOD
Canvas.prototype.validate = function(validate) {

    if(Canvas.signature !== 1) {

        signWarning.innerHTML = "<p>Votre signature est obligatoire afin de valider la réservation.</p>";
   
    }else {

        var reservation = sessionStorage.setItem("reservation", 1);


        canvasContainer.classList.replace("canvasOff", "canvas");
        form.classList.replace("showinfo","showinfo_onresa");
        map.classList.replace("map_on","map_off");


        var now = new Date().getTime();
        var delay = 20 * 60 * 1000;
        var countDownDate = new Date().getTime() + delay;
        var expiration = sessionStorage.setItem("expiration", countDownDate);
        var distance = expiration - now;
        var timer = sessionStorage.setItem("timer", distance);

        calculate();
};

   validate.preventDefault();
};

buttonAccept.addEventListener("click", Canvas.prototype.validate);


//---CREATE TIMER FUNCTION

    function calculate() {

        var lastName = localStorage.getItem("lastName");
        var firstName = localStorage.getItem("firstName");
        var stationName = sessionStorage.getItem("stationName");
        var expiration = sessionStorage.getItem("expiration");
        var x = setInterval(function() {

          // Get todays date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
         var distance = expiration - now;


          var timer = sessionStorage.setItem("timer", distance);

          // Time calculations for days, hours, minutes and seconds
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);


      if(distance > 0) {

          canvasContainer.innerHTML = "<p><strong>Votre demande a été prise en compte avec succés !<br><br>Détails de votre réservation ci-dessous.</strong></p><button href=\"#reservation\" class=\"button\" onClick=\"window.location.reload(), sessionStorage.clear()\">Effectuer une nouvelle réservation</button><p><em>La nouvelle réservation remplacera la précédente.</em></p>";
          resa.innerHTML = "<p>Votre réservation au nom de : " + lastName + " " + firstName + "," + " est valable à la station " + stationName +" pendant : <br><br>" +  minutes + "min et " + seconds + "s.</p>" ;
          dispo.innerHTML = "";
          var reservation = sessionStorage.setItem("reservation", 1);
          
        }else {

          canvasContainer.innerHTML = "<p><strong>Votre demande a été prise en compte avec succés !<br><br>Détails de votre réservation ci-dessous.</strong></p><button href=\"#reservation\" class=\"button\" onClick=\"window.location.reload()\">Effectuer une nouvelle réservation</button><p><em>La nouvelle réservation remplacera la précédente.</em></p>";
          resa.innerHTML = "<p>Votre réservation a expirée !</p>";
          var reservation = sessionStorage.setItem("reservation", 0);
          clearInterval(x);
        }


    } ,1000);

}