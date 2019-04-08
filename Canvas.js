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
