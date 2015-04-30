/**
 * Created by Kevano on 29/04/2015.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-page');

//States
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

//Start with Load
game.state.start('load');

//Globals
var player;
var enemySpeed = 50;
var platforms;
var score = 0;
var lives = 3;
var background;