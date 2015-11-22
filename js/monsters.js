var MONSTER_SPEED = 164;
var MONSTER_DIRECTION_CHANGE_CHANCE = 0.3;
var MONSTER_AWARENESS_RANGE = 128;
var MONSTER_UPDATE_TIME = 64;
var MONSTER_SPAWN_CHANCE = 0.11;
var LEVEL_SPEED = 200;
var MONSTER_SPAWN_HEIGHT = 32;
var MONSTER_KNOCK_OUT_POWER = 64;
var MONSTER_WIDTH = 10;
var MONSTER_HEIGHT = 16;

var monsters = new Array();
var monstersTimer;

function createMonsters() {
  monstersTimer = game.time.create(false);
  monstersTimer.loop(MONSTER_UPDATE_TIME, updateMonsters, this);
  monstersTimer.start();
}

function killAllMonstersAndPreventFromSpawning() {
    monstersTimer.destroy();
    monsters.map(function(monster) { monster.die(monsterDeathAnimationFall); });
}

function updateMonstersPerTick() {
  monsters.map( function(monster) { 
    if (!monster.dead) {
      monster.animations.play('runr'); 

      game.physics.arcade.collide(monster, platforms);
      if (Phaser.Rectangle.intersects(player.getBounds(), monster.getBounds())) {
        var animation = (Math.random() < 0.5) ? monsterDeathAnimationSplat
                                              : monsterDeathAnimationFall;
        monster.die(animation);
      }
    }
  });
}

function monsterDeathAnimationSplat(monster) {
  monster.scale.y = 0.6;
  monster.scale.x = 2;
  monster.body.position.y += MONSTER_HEIGHT / 2;
  monster.body.velocity.x = -LEVEL_SPEED;
  monster.body.velocity.y = 0;
  monster.body.immovable = true;
  monster.body.gravity.y = 0;
  monster.fadeoutAndDestroy(1600);
}

function monsterDeathAnimationFall(monster) {
    monster.body.velocity.x = MONSTER_KNOCK_OUT_POWER;
    monster.fadeoutAndDestroy(600);
}

function createMonster() {
  monster = game.add.sprite(game.world.width - 10, 
                            game.world.height / 2 - MONSTER_SPAWN_HEIGHT, 
                            'monster');
  game.physics.arcade.enable(monster); 
  monster.body.bounce.y  = 0;
  monster.body.gravity.y = 1000;
  monster.moveDirection = true;
  monster.scale.y = 0.6 + Math.random() * 0.8;
  monster.animations.add('runr', [0, 1], 10, true);
  monster.tint = COLORS[Math.floor(Math.random() * COLORS.length)];
  monster.shouldChangeDirection = function() {
    // If player is close, monster will turn back from him
    if (player.position.distance(this.position) < MONSTER_AWARENESS_RANGE) {
      return true;
    }
    return (Math.random() < MONSTER_DIRECTION_CHANGE_CHANCE)
  };

  monster.dead = false;
  monster.die = function(animation) {
    game.physics.arcade.collide(monster, platforms);
    monster.dead = true;
    monster.enableBody = false;
    this.body.velocity.x = 0;
    animation(this);
  };
  
  monster.fadeoutAndDestroy = function(disappearDelay) {
    game.add.tween(this).to({alpha: 0}, 
                             disappearDelay, 
                             Phaser.Easing.Linear.None, 
                             true, 
                             0, 
                             1000, // ???
                             true);
    var timer = game.time.create(false);
    var currentMonster = this;
    timer.add(disappearDelay,
              function() { 
                  var i = monsters.indexOf(currentMonster);
                  monsters.splice(i, 1);
                  currentMonster.destroy();
              });
    timer.start();
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
