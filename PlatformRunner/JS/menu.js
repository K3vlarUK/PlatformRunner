/**
 * Created by Kevano on 29/04/2015.
 */
var menu_state = {
    create: function(){
        //Start game when spacebar pressed
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        //Defining variables
        var style = {font: "30px Arial", fill: "#ffffff"};
        var x = game.world.width / 2, y = game.world.height / 2;

        //Centred Text on screen
        var text = this.game.add.text(x, y - 50, "Press Space to Start", style);
        text.anchor.setTo(0.5, 0.5);
    },

    start: function(){
        this.game.state.start('play');
    }
};