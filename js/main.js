
///////////////
// Константы //
///////////////

var PLAYER_WIDTH = 48;
var PLAYER_HEIGHT = 62;

////////////////////////
// Глобальные объекты //
////////////////////////
var player;
var platforms;
var spacebar;
var histo;



var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { 
  preload: function() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('dino', 'assets/dinosprite.png', 
                          PLAYER_WIDTH, PLAYER_HEIGHT); 
  }, 
  create: function() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createWorld();
    createPlayer();
    createHistos();
        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
  }, 
  update: function() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground
    player.animations.play('right'); //Constantli "moving" to the right 

    //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down) {
    //   player.body.velocity.y = -350;
    // }
  }, 
  render: function() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
    game.debug.geom(histo,'#0fffff');
  }
});

function flipGravity() {
  player.position.y += PLAYER_HEIGHT;
  player.body.gravity.y = -player.body.gravity.y; 
  // player.scale.y *= -1; // зеркально отобразить спрайт относительно y
}

//  The platforms group contains the ground
function createWorld() {
    platforms = game.add.group();
    platforms.enableBody = true; //  We will enable physics for any object that is created in this group

    var sky = platforms.create(0, 0, 'sky');
    sky.scale.setTo(2, 1);
    sky.body.immovable = true;

    var ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    ground.scale.setTo(2, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.body.immovable = true; //  This stops it from falling away when you jump on it
}

// The player and its settings
function createPlayer() {
  // player = game.add.sprite(game.world.centerX - PLAYER_WIDTH / 2, 0, 'dino');
  player = game.add.sprite(PLAYER_WIDTH + 10, 0, 'dino');
  game.physics.arcade.enable(player); // We need to enable physics on the player

  //  Player physics properties
  player.body.bounce.y = 0;
  player.body.gravity.y = 1000;
  player.body.collideWorldBounds = true;

  //  Animations, walking left and right.
  player.animations.add('left', [4, 5, 6, 7], 10, true);
  player.animations.add('right', [8, 9, 10, 11], 10, true);
}

function createHistos() {
    for (var )
}

function createHisto() {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;
    var floorHeight = 50;
    var histoHeight = -randFloor*floorHeight;

    var minCoordX = 100;
    var maxCoordX = 800;
    var randCoordX = Math.floor(Math.random() * (maxCoordX - minCoordX + 1)) + minCoordX;

    var coordY = game.world.height / 2;
    
    // new Phaser.Rectangle(coordXofLeftBottomCorner, coordYofLeftBottomCorner, widthOfRectangle, heightOfRectangle);
    histo = new Phaser.Rectangle(randCoordX, coordY, 40, histoHeight);   
}