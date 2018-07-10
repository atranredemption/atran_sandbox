cc.Class({
    extends: cc.Component,

    properties: {
        // When the distance between the star and main character is less than this value,
        // collection of the point will be completed.
        pickRadius: 0,

        // The game object
        game: {
            default: null,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance: function() {
        // Judge the the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();

        // Calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script
        // to generate a new star
        this.game.spawnNewStar();

        // Score a point
        this.game.gainScore();

        // Destroy current star's node
        this.node.destroy();
    },

    /*
    start () {

    },
    */

    // update (dt) {},
    update: function (dt) {
        // Judge if the distance between the star and main character is shorter than 
        // the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            // Invoke collecting behavior
            this.onPicked();
            return;
        }
    },
});
