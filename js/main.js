var game = new Phaser.Game(window.width, window.height, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

function PRELOAD() {
    game.load.image('sky', 'assets/back4.jpg');
    game.load.image('ground', 'assets/ox.png');

    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    game.load.spritesheet('monster', 'assets/human.png', MONSTER_WIDTH, MONSTER_HEIGHT);  
    game.load.image('ooops', 'assets/ooops.png');

    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    game.load.image('obj1', 'assets/obj1.png');
    game.load.image('obj2', 'assets/obj2.png');
    game.load.image('obj3', 'assets/obj3.png');
    game.load.image('obj4', 'assets/obj4.png');
    game.load.image('obj5', 'assets/obj5.png');
    game.load.image('obj6', 'assets/obj6.png');
    game.load.image('obj7', 'assets/obj7.png');
    game.load.image('obj8', 'assets/obj8.png');
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
    timer(); 
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground

    player.animations.play('right'); //Constantly "moving" to the right 
    updateMonstersPerTick();
    updateHistoPerTick();
    counterText.text = counter;
   // object's moving

   movingObjects(obj);
    
}

function RENDER() {
}
