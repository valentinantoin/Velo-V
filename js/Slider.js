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
    this.alt = ["Jeune femme à vélo", "Vélo'v vue de près", "Rangée de Vélo'v", "Femme qui prend un Vélo'v"];
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


//---ADD NEXT SLIDE METHOD
Slider.prototype.next = function() {
    this.index++;
    if(this.index === this.slides.length) {
        this.index = 0;
    }
    this.refresh();
    if(this.timer !== null) {
        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.play.bind(this), 5000);
    };
};


//---ADD PREVIOUS SLIDE METHOD
Slider.prototype.prev = function() {
    this.index--;
    if(this.index < 0){
        this.index = this.slides.length - 1;
    }
    this.refresh();
    if(this.timer !== null) {
        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.play.bind(this), 5000);
    };
};


//---ADD PAUSE METHOD
Slider.prototype.pause = function(pause) {
    if(this.timer == null) {
        this.timer = window.setInterval(this.play.bind(this), 5000);
        pauseIcon.classList.replace("fa-play", "fa-pause");
    }else {
        window.clearInterval(this.timer);
        this.timer = null;
        pauseIcon.classList.replace("fa-pause", "fa-play");
    };
    pause.preventDefault();
};


//---ADD REFRESH METHOD
Slider.prototype.refresh = function() {
    slide.src = this.slides[this.index];
    slide.alt = this.alt[this.index];

    if(this.index === 0 || this.index === 3) {
        presentation_l.innerHTML = this.text[this.index];
        presentation_l.classList.replace("presentation", "presentation_l");
        presentation_r.classList.replace("presentation_r", "presentation");
    }else {
        presentation_r.innerHTML = this.text[this.index];
        presentation_r.classList.replace("presentation", "presentation_r");
        presentation_l.classList.replace("presentation_l", "presentation");
    }   
};


//---ADD KEYCONTROL
Slider.prototype.keyControl = function(e) {
        if(e.keyCode === 37){
            this.prev();
        } else if(e.keyCode === 39){
            this.next();
        };
};