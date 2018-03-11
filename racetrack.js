var text = require("./text");
var racetrackManager = require("./racetrackManager");
var currentText = new text();

// racetrack objects manage players
function racetrack() {
    this.players = [];
    // Time the game has started for (in seconds)
    this.time = 0;
    // Time before the game begins (countdown)
    this.timeLeft = 5000;
    // This stores the order in which players win
    this.order = [];
    this.currentText = currentText.getRandomText();
};

// Adds player to racetrack
racetrack.prototype.joinRace = function(player){
    this.players.push(player);
    if(this.players.length >= 2){
        console.log("b1");
        var countdown = setInterval(function(){
            console.log("b2");
            if(this.timeLeft > 0){
                this.timeLeft -= 1000;
            } else {
                clearInterval(countdown);
                setInterval(function(){
                    this.time += 1;
                }.bind(this), 1000);
            }
        }.bind(this), 1000);
    }
    return true;
}

// Sets the currentText of the racetrack
racetrack.prototype.setText = function(text){
    this.currentText = text;
}

// Checks if the character in currentText matches the keypress and returns the result
racetrack.prototype.checkKeyPress = function(index, keypress){

    if(this.currentText.charAt(index) == keypress){
        console.log("correct --keypressed: " + keypress + ", correct key: " + this.currentText.charAt(index) + ", index: " + index);
        return true;
    }
    console.log(" wrong -- keypressed: " + keypress + ", correct key: " + this.currentText.charAt(index) + ", index: " + index);
    return false
}

// Returns a serialized form of all current players's names
racetrack.prototype.getAllPlayers = function() {
    var allPlayers = "";
    this.players.forEach(function(e){
        allPlayers += e.name + "\n";
    });
    return allPlayers;
}

// Stores the order of players
racetrack.prototype.finish = function(player){
    this.order.push(player);
};


module.exports = racetrack;

