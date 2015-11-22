function isiPhone(){
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}

if (isiPhone()){
    var Phasertype = 'Phaser.CANVAS';
} else {
    var Phasertype = 'Phaser.WEBGL';
}

var game = new Phaser.Game(800, 600, Phasertype, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

var music;
var text;

function PRELOAD() {
    game.load.image('sky', 'assets/back4.jpg');
    game.load.image('ground', 'assets/ox.png');
    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    game.load.spritesheet('monster', 'assets/human.png', MONSTER_WIDTH, MONSTER_HEIGHT);  
    game.load.image('ooops', 'assets/ooops.png');
    // game.load.audio('music', ['assets/music.mp3']);

    for (var i = 1; i < 15; i++) {
        game.load.image('obj' + i, 'assets/obj' + i + '.png');
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
        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
    game.input.onDown.add(flipGravity);

    player.animations.play('right'); //Constantly "moving" to the right
    timer(); // timer on

    //Loading
    game.load.onLoadStart.add(console.log("Loading..."), this);
    // game.load.onFileComplete.add(fileComplete);
    game.load.onLoadComplete.add(console.log("Load cimplete"), this);
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    updateMonstersPerTick();
    updateHistoPerTick();
    counterText.text = counter; // counter of points
    movingObjects(obj); // object's moving
    histoGrow(5); // histo is growing when monster collides histo
}

function RENDER() {
}

