/**
 * Created by Kevano on 29/04/2015.
 */
var load_state = {
    preload: function(){
        game.load.image('sky', 'Images/sky.png');
        game.load.image('ground', 'Images/ground.png');
        game.load.image('platform', 'Images/platform.png');
        game.load.image('star', 'Images/star.png');
        game.load.image('finish', 'Images/finish.png');
        game.load.image('enemy', 'Images/enemy.png');
        game.load.spritesheet('player', 'Sprites/dude.png', 32, 48);
    },

    create: function(){
        //go to menu when loaded
        this.game.state.start('menu');
    }
};