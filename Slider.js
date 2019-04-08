// SRICT MODE
"use strict";

//---VARIABLES DECLARATION
var slide = document.querySelector("#slides img");
var prev = document.getElementById("control_prev");
var next = document.getElementById("control_next");
var pause = document.getElementById("pause");
var pauseIcon = document.getElementById("pauseIcon");
var presentation_l = document.getElementById("presentation_l");
var presentation_r = document.getElementById("presentation_r");


//---SLIDER OBJECT CREATION
var Slider = function() {
    this.slides = ["images/slide6.jpg", "images/slide1.jpg", "images/slide3.jpg", "images/slide0.jpg"];
    this.text = ["Bienvenue sur le site de réservation de vélo'v !", "Selectionnez simplement une station sur la carte pour obtenir les informations et disponibilités de celle-ci", "Indiquez vos nom et prénom, signez et nous réservons juste pour vous un vélo'v pendant 20 minutes.", "Bonne balade à vous !!"];
    this.index = -1;
    this.timer = window.setInterval(this.play.bind(this), 5000);

    //---ADD EVENT LISTENER
    prev.addEventListener("click", this.prev.bind(this));
    next.addEventListener("click", this.next.bind(this));
    pause.addEventListener("click", this.pause.bind(this));
    document.addEventListener("keydown", this.keyControl.bind(this));
};


//---ADD PLAY METHOD
Slider.prototype.play = function() {
    this.index++;
    if(this.index === this.slides.length) {
        this.index = 0;
    }
    this.refresh();
};