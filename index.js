var express = require("express");
var app = express();
var text = require("./text");
var racetrackManager = require("./racetrackManager");
var racetrack = require("./racetrack");

var player = require("./player");
var socket = require("socket.io");

var text = new text();
var manager = new racetrackManager();

var server = app.listen(process.env.PORT || 3000,function() {
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

            setInterval(function (){
                var people = client.currentRacetrack.getAllPlayers()
                client.socket.emit("players", people);
                if(client.currentRacetrack.players.length < racetrackManager.MAX_USERS){
                    client.socket.emit("confirm", "Waiting for " + (racetrackManager.MAX_USERS -
                        client.currentRacetrack.players.length) + " more players");
                }else{
                    var countdown = setInterval(function(){
                        if(client.currentRacetrack.timeLeft > 0) {
                            client.socket.emit("confirm", "Game starting in "
                                + client.currentRacetrack.timeLeft/1000 + " seconds");
                        } else {
                            client.socket.emit("confirm", client.currentRacetrack.currentText);
                            clearInterval(countdown);
                        }
                    }, 1000/30);
                }
            },1000/30);

            // Updates and sends confirmation to client and players in racetrack
            client.currentRacetrack = track;
            client.socket.emit("players", client.currentRacetrack.getAllPlayers());
            client.socket.broadcast.emit("players", client.currentRacetrack.getAllPlayers());
        }

    });

    // Checks keypresses according to racetrack's current text
    client.socket.on("keypress", function(message){

        if(client.currentRacetrack.players.length < racetrackManager.MAX_USERS || client.currentRacetrack.timeLeft > 0){
            return;
        }

        if(client.currentRacetrack.checkKeyPress(client.index, message.keypress) && client.playing) {

            if(client.errorStack.length <= 0){
                client.correctChars++;
            }

            // Error stack is used to keep track of errors
            console.log(client.errorStack);
            // Clears input area if space bar is pressed and no errors
            if(message.keypress == " " && client.errorStack.length <= 0){
                client.socket.emit("clearInput");
                client.lowestIndex = client.index + 1;
                console.log("lowest set to " + client.lowestIndex);
            }

            // Sends finished single when player enters the last character of the text
            if(client.index == client.currentRacetrack.currentText.length - 1){
                console.log("finished race!");
                client.currentRacetrack.order.push(client);
                client.socket.emit("finished", "You came in " + client.currentRacetrack.order.length + " Place!"
                + " \nWords per minute: " + Math.floor(client.currentRacetrack.currentText.length/5 * 60 /
                    client.currentRacetrack.time));
                client.playing = false;
            }
            client.index++;
        } else {
            // Pushes index number of incorrect keypress to errorStack
            client.errorStack.push(client.index);
            console.log(client.errorStack);
            client.index++;
        }

        client.sendStatus();
    });

    client.socket.on("backspace", function(message){

        if(client.currentRacetrack.players.length < racetrackManager.MAX_USERS || client.currentRacetrack.timeLeft > 0){
            return;
        }

        console.log("C Index: " + client.index + " Low Index: " + client.lowestIndex);
        // Prevents client from deleting correct inputs
        if (client.index > client.lowestIndex) {
            client.index -= 1;
        }
        console.log("backspaced - current index:" + client.index)
        // If error has been fixed, remove error from errorStack

        if (client.errorStack[client.errorStack.length - 1] == client.index) {
            console.log("error fixed");
            client.errorStack.pop();
            } else {
            if (client.correctChars > client.lowestIndex && client.errorStack.length <= 0) {
                client.correctChars--;
            }
        }
            client.sendStatus();
    });
});

// Allows client to access html, js, and css files
app.use(express.static("public"));
