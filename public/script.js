// Get DOM elements to add events to
var clientInput = document.getElementById("clientMessage");
var playing = document.getElementById("playing");
var chatLog = document.getElementById("chat");
chatLog.rows = 20;

// The object that will be passed to the server
var player = {
    "name":"default",
    "keypress":"",
    "index":0,
}

// Establishes connection to server
var socket = io.connect();

// Add events listener to socket
socket.on("wrongInput", setColorWrong);
socket.on("correctInput", setColorCorrect);

// Clears client input
socket.on("clearInput", function(){
    clientInput.value = "";
});

// Display text after successfully joining a room
socket.on("confirm", function(data){
    chatLog.value += (data + "\n");
});

// Updates players in racetrack
socket.on("players", function(data){
    playing.value = data;
})

// Displays the player statistics after finishing a text
socket.on("finished", function(data){
    chatLog.value = data;
    clientInput.value = "";
    clientInput.readOnly = true;
});

// Clears and sends message object on enter key
clientInput.addEventListener("keypress", function(e) {
    player.keypress = e.key;
    socket.emit("keypress", player);
});

// Keydown event for backspace key
clientInput.addEventListener("keydown", function(e){
    if(e.keyCode == 8){
        socket.emit("backspace", player);
    }
});

// Sets client input text color red if incorrect text is submitted
function setColorWrong(){
    clientInput.style.color = "red";
}

// Sets client input text color black if correct text is submitted
function setColorCorrect(){
    clientInput.style.color = "black";
}


// Asks for client's name after the page has loaded
window.onload = function (){
    player.name = prompt("Type in your name");
    socket.emit("join", player);
    console.log("window fully loaded");
}