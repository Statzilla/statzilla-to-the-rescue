var game = new Phaser.Game(window.width, window.height, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

function PRELOAD() {
    game.load.image('sky', 'assets/back4.jpg');
    game.load.image('ground', 'assets/ox.png');
    game.load.image('histo', 'assets/histo.svg');
    game.load.image('monster', 'assets/human.png');  
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
}

function CREATE() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

    // this.game.stage.backgroundColor = '#ffffff';

    createWorld();
    createPlayer();
    createHistos(); 
    createMonsters();
        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
    game.input.onDown.add(flipGravity);
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    player.animations.play('right'); //Constantly "moving" to the right 
    updateMonstersPerTick();
    updateHistoPerTick();
}

function RENDER() {
}