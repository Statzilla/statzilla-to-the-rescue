var MONSTER_SPEED = 164;
var MONSTER_DIRECTION_CHANGE_CHANCE = 0.3;
var MONSTER_AWARENESS_RANGE = 128;
var MONSTER_UPDATE_TIME = 64;
var MONSTER_SPAWN_CHANCE = 0.11;
var LEVEL_SPEED = 128;

var monsters = new Array();
var monstersTimer;

function createMonsters() {
  monstersTimer = game.time.create(false);
  monstersTimer.loop(MONSTER_UPDATE_TIME, updateMonsters, this);
  monstersTimer.start();
}

function updateMonstersPerTick() {
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
                             1000, // ???
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
                             1000, // ???
                             true);

  timer = game.time.create(false);
  timer.add(disappearDelay,
            function() { 
              removeMonster(monster);
            });
  timer.start();
}


function createMonster() {
  monster = game.add.sprite(game.world.width / 2, 
                            0, 
                            'monster');

  game.physics.arcade.enable(monster); 
  monster.body.bounce.y  = 0;
  monster.body.gravity.y = 1000;
  monster.body.collideWorldBounds = true;

  monster.moveDirection = true;
  monster.shouldChangeDirection = function() {
    // If player is close, monster will turn back from him
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
