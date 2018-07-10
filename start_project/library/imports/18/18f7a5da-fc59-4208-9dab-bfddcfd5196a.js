"use strict";
cc._RF.push(module, '18f7aXa/FlCCJ2rv93P1Rlq', 'Player');
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
        accel: 0,

        // Jump audio
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    setJumpAction: function setJumpAction() {
        // Jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        // Jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // Add a callback function to invoke other defined methods after the action is finished
        var callback = cc.callFunc(this.playJumpSound, this);

        // Repeat
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    setInputControl: function setInputControl() {
        var self = this;

        // Add keyboard event listener
        // When there is a key being pressed down, judge if it's the designated directional button and set up
        // acceleration in the corresponding direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.KEY.d:
                    self.accRight = true;
                    break;
            }
        });

        // When releasing the button, stop acceleration in this direction
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
            }
        });
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad is called immediately after loading the scene--put initialization logic here.
    onLoad: function onLoad() {

        // Initialize jump action
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // Turn off acceleration direction
        this.accLeft = false;
        this.accRight = false;

        // Current horizontal speed of main character
        this.xSpeed = 0;

        // Initialize keyboard input listender
        this.setInputControl();
    },

    /*
    start () {
     },
    */

    // Update is called for each frame after the loading scene.
    // Put logic that needs to be frequently calculated or updated here.
    update: function update(dt) {
        // Update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        // Restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // If speed reaches its limit, use the max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // Update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
    }
});

cc._RF.pop();