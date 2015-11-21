var game = new Phaser.Game(1200, 600, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

function PRELOAD() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
}

function CREATE() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

    createWorld();
    createPlayer();
    createHistos(); 
        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    player.animations.play('right'); //Constantli "moving" to the right 
}

function RENDER() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);     
}
