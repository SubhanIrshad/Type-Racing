var racetrack = require("./racetrack");

// Manages racetrack objects in allRacetracks
function racetrackManager() {
    this.MAX_USERS = 6;
    this.allRacetracks = [];
}

// Looks for a race with room and returns it
racetrackManager.prototype.findRace = function() {

    // If allRacetracks is empty create a new racetrack
    if(this.allRacetracks.length <= 0){
        var track = new racetrack();
        this.allRacetracks.push(track);
        return track;
    }

    // If last racetrack has room then it will return it
    if(this.allRacetracks[this.allRacetracks.length - 1].players.length < this.MAX_USERS)
    {
        return this.allRacetracks[this.allRacetracks.length - 1];
    }

    // If all racetracks are full create a new racetrack
    var track = new racetrack();
    this.allRacetracks.push(track);
    return track;
}

module.exports = racetrackManager;