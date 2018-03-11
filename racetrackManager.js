var racetrack = require("./racetrack");

var MAX_USERS = 2;

// Manages racetrack objects in allRacetracks
function racetrackManager() {
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
    if(this.allRacetracks[this.allRacetracks.length - 1].players.length < MAX_USERS)
    {
        return this.allRacetracks[this.allRacetracks.length - 1];
    }

    // If all racetracks are full create a new racetrack
    var track = new racetrack();
    this.allRacetracks.push(track);
    return track;
}

module.exports = racetrackManager;
module.exports.MAX_USERS = MAX_USERS;