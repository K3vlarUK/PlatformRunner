/**
 * Created by b00237669 on 03/04/2015.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-page', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'Images/forest.jpg');
    game.load.image('ground', 'Images/ground.png');
    game.load.image('platform', 'Images/platform.png');
    game.load.image('star', 'Images/star.png');
    game.load.image('finish', 'Images/finish.png');
    game.load.spritesheet('player', 'Sprites/dude.png', 32, 48);
}

var player;
var platforms;
var score = 0;
var scoreText;
var background;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //Enabling Physics

    game.world.setBounds(0, 0, 2000, 600);

    background = game.add.tileSprite(0, 0, 800, 600, 'sky');
    background.fixedToCamera = true;

    platforms = game.add.group();   //Platform group

    platforms.enableBody = true;    //Enable physics for the group

    var ground = platforms.create(0, game.world.height - 64, 'ground');     //The Ground
    ground.scale.setTo(3.5,1);    //Scale the ground
    ground.body.immovable = true;

    ground = platforms.create(game.world.width/2, game.world.height - 64, 'ground');
    ground.scale.setTo(3.5,1);    //Scale the ground
    ground.body.immovable = true;

//Platforms
    var ledge = platforms.create(400, 425, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 310, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 190, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 425, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(1080, 310, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 425, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(1600, 310, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(1850, 190, 'platform');
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

    game.camera.follow(player);

    stars = game.add.group();
    stars.enableBody = true;

    var collect = stars.create(700, 390, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0.7 + Math.random() * 0.2;

    collect = stars.create(100, 290, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0.7 + Math.random() * 0.2;

    collect = stars.create(650, 190, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0.7 + Math.random() * 0.2;

    collect = stars.create(50, 90, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0.7 + Math.random() * 0.2;

    collect = stars.create(770, -10, 'star');
    collect.body.gravity.y = 100;
    collect.body.bounce.y = 0.7 + Math.random() * 0.2;

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
        player.body.velocity.y = -280;
    }

    background.tilePosition.x = -game.camera.x;
    background.tilePosition.y = -game.camera.y;

    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    function collectStar(player, star){
        star.kill();

        score += 10;
        scoreText.text = 'Score: ' + score;
    }
}
