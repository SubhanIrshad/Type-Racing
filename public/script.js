// The max number of characters per line
var CHARS_PER_LINE = 50;

// Get DOM elements to add events to
var canvas = document.getElementById("canvas");

// Text player will type
var txt = [];
var correctCharIndex = 0;
var currentIndex = 0;
var playing = "";

// The object that will be passed to the server
var player = {
    "name":"default",
    "keypress":"",
}

// Establishes connection to server
var socket = io.connect();

// Informs client of their current index
socket.on("updateCharIndex", function(data){
    correctCharIndex = data.correctChars;
    currentIndex = data.currentIndex;
    console.log("correct char index:" + correctCharIndex + " current index" + currentIndex);
});

// Display text after successfully joining a room
socket.on("confirm", function(data){
    txt = data;

});

// Updates players in racetrack
socket.on("players", function(data){
    playing = data;
});

// Displays the player statistics after finishing a text
socket.on("finished", function(data){
    alert(data);
});

// Sends message object on enter key
canvas.addEventListener("keypress", function(e) {
    player.keypress = e.key;
    socket.emit("keypress", player);
});

// Keydown event for backspace key
canvas.addEventListener("keydown", function(e){
    if(e.keyCode == 8){
        socket.emit("backspace", player);
    }
});

// Asks for client's name after the page has loaded
window.onload = function (){
    player.name = prompt("Type in your name");
    socket.emit("join", player);
    console.log("window fully loaded");

};