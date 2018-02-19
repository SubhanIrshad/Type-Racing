var text = require("./text.js");
var currentText = new text();

// racetrack objects manage players
function racetrack() {
    this.players = [];
    // This stores the order in which players win
    this.order = [];
    this.currentText = currentText.getRandomText();
};

// Adds player to racetrack
racetrack.prototype.joinRace = function(player){
    this.players.push(player);
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

