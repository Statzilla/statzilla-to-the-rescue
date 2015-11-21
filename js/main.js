
///////////////
// Константы //
///////////////

var PLAYER_WIDTH = 48;
var PLAYER_HEIGHT = 62;
var MONSTER_SPEED = 164;
var MONSTER_DIRECTION_CHANGE_CHANCE = 0.3;
var MONSTER_AWARENESS_RANGE = 128;
var MONSTER_UPDATE_TIME = 64;
var MONSTER_SPAWN_CHANCE = 0.11;
var LEVEL_SPEED = 128;

////////////////////////
// Глобальные объекты //
////////////////////////
var player;
var platforms;
var spacebar;
var monsters = new Array();
var monstersTimer;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
  preload: function() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ox.png');
    game.load.image('monster', 'assets/human.png');
    game.load.spritesheet('dino', 'assets/dinosprite.png', 
                          PLAYER_WIDTH, PLAYER_HEIGHT); 
  }, 
  create: function() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    createSky();
    createPlatforms();
    createPlayer();

    monstersTimer = game.time.create(false);

    monstersTimer.loop(MONSTER_UPDATE_TIME, updateMonsters, this);
    monstersTimer.start();

    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);

    aKey = game.input.keyboard.addKey(Phaser.Keyboard.a);
    aKey.onDown.add(movePlayerLeft);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.d);
    dKey.onDown.add(movePlayerRight);


  }, 
  update: function() {
    game.physics.arcade.collide(player, platforms);//Collide player and ground
    player.animations.play('right'); //Constantly "moving" to the right 

    monsters.map( function(monster) { 
      if (!monster.dead) {
        game.physics.arcade.collide(monster, platforms);
        if (Phaser.Rectangle.intersects(player.getBounds(), monster.getBounds())) {
          monster.dead = true;
          monster.enableBody = false;
          var animation = (Math.random() < 0.5) ? monsterDeathAnimationSplat
                                                : monsterDeathAnimationFall;
          monster.die(animation);
        }
      }
    });

    //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down) {
    //   player.body.velocity.y = -350;
    // }
  }, 
  render: function() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
  }
});

function movePlayerLeft() {
  player.body.velocity.x = -LEVEL_SPEED;
}

function movePlayerRight() {
  player.body.velocity.x = LEVEL_SPEED;
}

function flipGravity() {
  player.position.y += PLAYER_HEIGHT;
  player.body.gravity.y = -player.body.gravity.y; 
  // player.scale.y *= -1; // зеркально отобразить спрайт относительно y
}

//  The platforms group contains the ground
function createPlatforms() {
  platforms = game.add.group();
  platforms.enableBody = true; //  We will enable physics for any object that is created in this group

  var ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
  ground.scale.setTo(2, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.body.immovable = true; //  This stops it from falling away when you jump on it
}

// A simple background for our game
function createSky() {
  game.add.sprite(0, 0, 'sky');
}

function removeMonster(monster) {
  var i = monsters.indexOf(monster);
  monsters.splice(i, 1);
  monster.destroy();
}

function monsterDeathAnimationSplat(monster)
{
  var disappearDelay = 1600;
  monster.scale.y = 0.3;
  monster.scale.x = 1.7;
  monster.body.velocity.x = -LEVEL_SPEED;
  monster.body.velocity.y = 0;
  monster.body.immovable = true;
  monster.body.gravity.y = 0;
  // fade out
  game.add.tween(monster).to({ alpha: 0 }, 
                             disappearDelay, 
                             Phaser.Easing.Linear.None, 
                             true, 
                             0, 
                             1000, 
                             true);
  timer = game.time.create(false);
  timer.add(disappearDelay,
            function() { 
              removeMonster(monster);
            });
  timer.start();
}

function monsterDeathAnimationFall(monster) {
  var disappearDelay = 600;
  // fade out
  game.add.tween(monster).to({ alpha: 0 }, 
                             disappearDelay, 
                             Phaser.Easing.Linear.None, 
                             true, 
                             0, 
                             1000, 
                             true);

  timer = game.time.create(false);
  timer.add(disappearDelay,
            function() { 
              removeMonster(monster);
            });
  timer.start();
}


function createMonster() {
  monster = game.add.sprite(game.world.width, 
                            0, 
                            'monster');

  game.physics.arcade.enable(monster); 
  monster.body.bounce.y  = 0;
  monster.body.gravity.y = 1000;
  monster.body.collideWorldBounds = true;

  monster.moveDirection = true;
  monster.shouldChangeDirection = function() {
    // If player is close, monster MAY turn back from him
    if (player.position.distance(this.position) < MONSTER_AWARENESS_RANGE) {
      return true;
    }
    return (Math.random() < MONSTER_DIRECTION_CHANGE_CHANCE)
  };

  monster.dead = false;
  monster.die = function(animation) {
    this.body.velocity.x = 0;
    this.dead.true;
    animation(this);
  };

  monsters.push(monster);

  return monster;
}


function updateMonster(monster) {
  if (monster.dead)
    return;
  if (Math.random() < MONSTER_DIRECTION_CHANGE_CHANCE)
  {
    monster.direction = !(monster.direction);

    if (monster.shouldChangeDirection()) {
        monster.body.velocity.x =  MONSTER_SPEED - LEVEL_SPEED;
    } else {
        monster.body.velocity.x = -MONSTER_SPEED - LEVEL_SPEED;
    }
  }
}



function updateMonsters() {
  // Spawn new monsters
  if (Math.random() < MONSTER_SPAWN_CHANCE) {
    createMonster();
  }
  monsters.map(updateMonster);
}

// The player and its settings
function createPlayer() {
  player = game.add.sprite(game.world.centerX - PLAYER_WIDTH / 2, 0, 'dino');
  game.physics.arcade.enable(player); // We need to enable physics on the player

  //  Player physics properties
  player.body.bounce.y  = 0;
  player.body.gravity.y = 1000;
  player.body.collideWorldBounds = true;

  //  Animations, walking left and right.
  player.animations.add('left', [4, 5, 6, 7], 10, true);
  player.animations.add('right', [8, 9, 10, 11], 10, true);
}

function createHisto() {

}
