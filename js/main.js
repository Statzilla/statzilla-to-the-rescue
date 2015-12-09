function autoPhasertype(){
    if (navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
    ) {
        return Phaser.CANVAS;
    } else {
        return Phaser.WEBGL;
    }
}

var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, autoPhasertype(), '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});
var music;
var text;

function PRELOAD() {
    game.load.image('sky', 'assets/ny-back3.png');
    game.load.image('ground', 'assets/ny-ground.png');
    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    game.load.spritesheet('monster', 'assets/human.png', MONSTER_WIDTH, MONSTER_HEIGHT);  
    game.load.image('ooops', 'assets/ooops.png');
    // game.load.audio('music', ['assets/music.mp3']);

    for (var i = 1; i < 15; i++) {
        game.load.image('formula' + i, 'assets/formula' + i + '.png');
    }
    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
}

function CREATE() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

    // music = game.add.audio('music');
    // music.play();

    createWorld();
    createPlayer();
    createHistos();
    createMonsters(); 
        
    controlsOn();

    player.animations.play('right'); //Constantly "moving" to the right
    timer(); // timer on
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    updateMonstersPerTick();
    updateHistoPerTick();
    counterText.text = counter; // counter of points
    histoGrow(HISTO_GROWTH_HEIGHT); // histo is growing when monster collides histo
}

function RENDER() {
}

