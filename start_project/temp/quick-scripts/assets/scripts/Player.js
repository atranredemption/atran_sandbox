(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18f7aXa/FlCCJ2rv93P1Rlq', 'Player', __filename);
// scripts/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // Main character's jump height
        jumpHeight: 0,

        // Main character's jump duration
        jumpDuration: 0,

        // Maximum movement speed
        maxMoveSpeed: 0,

        // Acceleration
        accel: 0

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    setJumpAction: function setJumpAction() {
        // Jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        // Jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // Repeat
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad is called immediately after loading the scene--put initialization logic here.
    onLoad: function onLoad() {
        // Initialize jump action
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    }

    /*
    start () {
     },
    */
    // update (dt) {},
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
        //# sourceMappingURL=Player.js.map
        