/**
 * Created by b00237669 on 03/04/2015.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'Images/sky.png');
    game.load.image('ground', 'Images/platform.png');
    game.load.image('star', 'Images/star.png');
    game.load.spritesheet('player', 'Sprites/dude.png', 32, 48);
}

var platforms;
var score = 0;
var scoreText;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //Enabling Physics

    game.add.sprite(0, 0, 'sky'); //Simple Background

    platforms = game.add.group();   //Platform group

    platforms.enableBody = true;    //Enable physics for the group

    var ground = platforms.create(0, game.world.height - 64, 'ground');     //The Ground

    ground.scale.setTo(2,2);    //Scale the ground

    ground.body.immovable = true;

    //Platforms
    var ledge = platforms.create(400, 450, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 350, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 250, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 150, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 50, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'player');    //The player

    game.physics.arcade.enable(player);     //Player Physics

    //  Player physics properties.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Walking left and right
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    stars = game.add.group();
    stars.enableBody = true;

    var collect = stars.create(700, 390, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0;

scoreText = game.add.text(16, 16, 'score: 0', { fontsize: '32px', fill: '#000'});
}

function update() {
    //  Collide the player with the platforms
    game.physics.arcade.collide(player, platforms);

    cursors = game.input.keyboard.createCursorKeys();

    //Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //Move left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //Move right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //Allow the player to jump if touching ground
    if(cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -250;
    }

    game.physics.arcade.collide(platforms);

    game.physics.arcade.overlap(player, stars, null, this);
}
