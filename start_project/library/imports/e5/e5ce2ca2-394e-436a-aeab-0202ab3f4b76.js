"use strict";
cc._RF.push(module, 'e5ce2yiOU5Daq6rAgKrP0t2', 'Star');
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

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();