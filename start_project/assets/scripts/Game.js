cc.Class({
    extends: cc.Component,

    properties: {
        // This property quotes the PreFab resource of stars
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        // The random scale of disappearing time for stars
        maxStarDuration: 0,
        minStarDuration: 0,

        // Ground node for confirming the height of the generated star's position
        ground: {
            default: null,
            type: cc.Node
        },

        // Player node for obtaining the jump height of the main character and controlling the
        // movement switch of the main character.
        player: {
            default: null,
            type: cc.Node
        },

        // Player score
        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        // Scoring audio
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // Obtain the anchor point of ground level on the y-axis
        this.groundY = this.ground.y + this.ground.height/2; // this.ground.top may also work

        // Initialize lifetime of stars
        this.timer = 0;
        this.starDuration = 0;

        // Generate a new star
        this.spawnNewStar();

        // Initialize score
        this.score = 0;
    },

    spawnNewStar: function() {
        // Generate a new node in the scene with a preset template
        var newStar = cc.instantiate(this.starPrefab);

        // Put the newly added node under the Canvas node
        this.node.addChild(newStar);

        // Set up a random position for the star
        newStar.setPosition(this.getNewStarPosition());

        // Deliver the concrete example of the Game component into the star component
        newStar.getComponent('Star').game = this;

        // Reset timer, randomly choose a value according to the scale of star duration
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function() {
        var randX = 0;

        // According to the position of the ground level and the main character's jump height, 
        // randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;

        // According to the width of the screen, randomly obain an anchor point of star on the x axis.
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;

        // Return to the anchor point of the star
        return cc.p(randX, randY);
    },

    /*
    start () {

    },
    */

    // update (dt) {},
    update: function (dt) {
        // Update timer for each frame, when a new star is not generated after exceeding duration
        // invoke the logic of game failure
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }

        this.timer += dt;
    },

    gainScore: function() {
        this.score += 1;

        // Update the scoreDisplay label
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        
        // Play point score audio
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function() {
        this.player.stopAllActions(); // Stop the player from jumping
        cc.director.loadScene('game');
    },
});
