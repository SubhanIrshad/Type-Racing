var express = require("express");
var app = express();
var text = require("./text");
var racetrackManager = require("./racetrackManager");
var racetrack = require("./racetrack");

var player = require("./player");
var socket = require("socket.io");

var text = new text();
var manager = new racetrackManager();

var server = app.listen(3000, function() {
    console.log("listening");
});

var io = socket(server);

// Establishes a connection
io.on("connection", function(socket){

    // Creates new player object on connection
    var client = new player(socket);

    // On join signal updates client name and adds them to a racetrack
    client.socket.on("join", function(message){
        client.name = message.name;

        // Finds a valid racetrack and add client
        var track = manager.findRace();

        if(track.joinRace(client)){

            // Update client regarding players in racetrack every second
            setInterval(function (){
                var people = client.currentRacetrack.getAllPlayers()
                client.socket.emit("players", people);
               // client.socket.broadcast.emit("players", people);
            },1000);

            // Updates and sends confirmation to client and players in racetrack
            client.socket.emit("confirm", track.currentText);
            client.currentRacetrack = track;
            client.socket.emit("players", client.currentRacetrack.getAllPlayers());
            client.socket.broadcast.emit("players", client.currentRacetrack.getAllPlayers());
        }

    });

    // Checks keypresses according to racetrack's current text
    client.socket.on("keypress", function(message){

        if(client.currentRacetrack.checkKeyPress(client.index, message.keypress)) {

            // Error stack is used to keep track of errors
            console.log(client.errorStack);

            // Clears input area if space bar is pressed and no errors
            if(message.keypress == " " && client.errorStack.length <= 0){
                client.socket.emit("clearInput");
                client.lowestIndex = client.index + 1;
                console.log("lowest set to " + client.index + 1);
            }

            // Sends finished single when player enters the last character of the text
            if(client.index == client.currentRacetrack.currentText.length - 1){
                console.log("finished race!");
                client.currentRacetrack.order.push(client);
                client.socket.emit("finished", "You came in " + client.currentRacetrack.order.length + " Place!");
            }

        } else {
            // Pushes index number of incorrect keypress to errorStack
            client.errorStack.push(client.index);
            console.log(client.errorStack);
        }

        client.index++;
        // Sends the client's text color
        client.sendStatus()
    });

    client.socket.on("backspace", function(message){;

        // Prevents client from deleting correct inputs
        if(client.index > client.lowestIndex){
            client.index -= 1;
        }

        console.log("backspaced - current index:" + client.index)

        // If error has been fixed, remove error from errorStack
        if(client.errorStack[client.errorStack.length - 1] == client.index){
            console.log("error fixed");
            client.errorStack.pop();
        }

        // Sends the client's text color
        client.sendStatus();
    });

});

// Allows client to access html, js, and css files
app.use(express.static("public"));
