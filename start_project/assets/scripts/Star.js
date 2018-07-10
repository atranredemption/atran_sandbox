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

    start () {

    },

    // update (dt) {},
});
