var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});


function PRELOAD() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ox.png');
    for (var i = 0; i < 7; i++) {
        game.load.image('histo' + i, 'assets/histo' + i + '.svg');
    }
    game.load.image('monster', 'assets/human.png');  
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    game.load.image('ooops', 'assets/ooops.png');
}

function CREATE() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

    createWorld();
    createPlayer();
    createHistos(); 
    createMonsters();
        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    player.animations.play('right'); //Constantly "moving" to the right 
    updateMonstersPerTick();
    updateHistoPerTick();
}

function RENDER() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);    
}