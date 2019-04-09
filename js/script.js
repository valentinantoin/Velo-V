// STRICT MODE
"use strict";


document.addEventListener('DOMContentLoaded', function() {
 
 //---SLIDER INIT 
    var slider = new Slider();
    slider.next();

//---MAP INIT
    var myMap = new Map();
    myMap.init()

//---CANVAS INIT
    var myCanvas = new Canvas();
    myCanvas.initMouse();
    myCanvas.initTouch();    
});
