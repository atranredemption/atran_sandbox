(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e5ce2yiOU5Daq6rAgKrP0t2', 'Star', __filename);
// scripts/Star.js

"use strict";

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

    getPlayerDistance: function getPlayerDistance() {
        // Judge the the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();

        // Calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function onPicked() {
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
    update: function update(dt) {
        // Judge if the distance between the star and main character is shorter than 
        // the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            // Invoke collecting behavior
            this.onPicked();
            return;
        }

        // Update the transparency of the star according to how much life is left
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
        //# sourceMappingURL=Star.js.map
        