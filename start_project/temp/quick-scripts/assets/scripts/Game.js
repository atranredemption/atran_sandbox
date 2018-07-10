(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '024c9baw8pCvYrl9XpiUcCM', 'Game', __filename);
// scripts/Game.js

'use strict';

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // Obtain the anchor point of ground level on the y-axis
        this.groundY = this.ground.y + this.ground.height / 2; // this.ground.top may also work

        // Generate a new star
        this.spawnNewStar();

        // Initialize score
        this.score = 0;
    },

    spawnNewStar: function spawnNewStar() {
        // Generate a new node in the scene with a preset template
        var newStar = cc.instantiate(this.starPrefab);

        // Put the newly added node under the Canvas node
        this.node.addChild(newStar);

        // Set up a random position for the star
        newStar.setPosition(this.getNewStarPosition());

        // Deliver the concrete example of the Game component into the star component
        newStar.getComponent('Star').game = this;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;

        // According to the position of the ground level and the main character's jump height, 
        // randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;

        // According to the width of the screen, randomly obain an anchor point of star on the x axis.
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;

        // Return to the anchor point of the star
        return cc.p(randX, randY);
    },

    /*
    start () {
     },
    */

    // update (dt) {},
    gainScore: function gainScore() {
        this.score += 1;

        // Update the scoreDisplay label
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        //this.scoreDisplay.string = 'Cheese';
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        