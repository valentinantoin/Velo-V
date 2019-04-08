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