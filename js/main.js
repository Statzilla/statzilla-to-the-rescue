var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

function PRELOAD() {
    game.load.image('sky', 'assets/back4.jpg');
    game.load.image('ground', 'assets/ox.png');
    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    game.load.spritesheet('monster', 'assets/human.png', MONSTER_WIDTH, MONSTER_HEIGHT);  
    game.load.image('ooops', 'assets/ooops.png');
    for (var i = 1; i < 9; i++) {
        game.load.image('obj' + i, 'assets/obj' + i + '.png');
    }
    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
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
    game.input.onDown.add(flipGravity);

    player.animations.play('right'); //Constantly "moving" to the right
    timer(); // timer on
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    updateMonstersPerTick();
    updateHistoPerTick();
    counterText.text = counter; // counter of points
    movingObjects(obj); // object's moving
    // histoGrow(5); // histo is growing when monster collides histo
}

function RENDER() {
}

