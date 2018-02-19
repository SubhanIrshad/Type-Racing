// Player constructor
function player(socket){
    this.index = 0,
    this.position = 0,
    this.socket = socket;
    this.name = "default",
    // Will be used as a stack
    this.errorStack = [];
    this.currentRacetrack;
    this.lowestIndex;
}

// Sends flags to client based on number of errors
player.prototype.sendStatus = function() {
    if(this.errorStack.length > 0){
        this.socket.emit("wrongInput");
    } else {
        this.socket.emit("correctInput");
    }

}

module.exports = player;