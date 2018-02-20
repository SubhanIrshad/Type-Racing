// Player constructor
function player(socket){
    this.index = 0;
    this.correctChars = 0;
    this.socket = socket;
    this.playing = true;
    this.name = "default";
    // Will be used as a stack
    this.errorStack = [];
    this.currentRacetrack;
    this.lowestIndex = 0;
}

// Sends player information to client
player.prototype.sendStatus = function() {
    this.socket.emit("updateCharIndex", {"correctChars":this.correctChars, "currentIndex": this.index});
}

module.exports = player;