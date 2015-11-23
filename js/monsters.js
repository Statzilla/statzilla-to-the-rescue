var monsters = [];
var monstersTimer;

function createMonsters() {
    monstersTimer = game.time.create(false);
    monstersTimer.loop(MONSTER_UPDATE_TIME, updateMonsters, this);
    monstersTimer.start();
}

function killAllMonstersAndPreventFromSpawning() {
    monstersTimer.destroy();
    monsters.map(function(monster) {
        monster.die(monsterDeathAnimationFall); 
    });
}

function updateMonstersPerTick() {
    monsters.map( function(monster) { 
        if (!monster.dead) {
            monster.animations.play('runr'); 

            game.physics.arcade.collide(monster, platforms);
            if (Phaser.Rectangle.intersects(player.getBounds(), monster.getBounds())) {
                var animation = (Math.random() < 0.5) ? monsterDeathAnimationSplat : monsterDeathAnimationFall;
                monster.die(animation);
                counter += 50; // get points for kill monster

                // Текст с очками за раздаваленного монстра
                var plusText = 
                game.add.bitmapText(player.x + player.width, player.y, 'carrier_command', 'plus', 6);
                plusText.text = "+" + 50;
                var disappearDelay = 1000;
                game.add.tween(plusText).to({alpha: 0}, disappearDelay,  Phaser.Easing.Linear.None,  true,  0,  1000,  true);
                var timerplusText = game.time.create(false);
                timerplusText.add(disappearDelay,
                    function() { 
                        plusText.destroy();
                    });
                timerplusText.start();
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

function monsterDeathAnimationBlink(monster) {
    monster.body.velocity.x = MONSTER_KNOCK_OUT_POWER;
    var i = monsters.indexOf(monster);
    monsters.splice(i, 1);
    monster.destroy();
}

function createMonster() {
    monster = game.add.sprite(game.world.width - 10, 
        game.world.height / 2 - MONSTER_SPAWN_HEIGHT, 
        'monster');
    game.physics.arcade.enable(monster); 
    monster.body.bounce.y  = 0;
    monster.body.gravity.y = MONSTER_GRAVITY;
    monster.moveDirection = true;
    monster.scale.y = 0.6 + Math.random() * 0.8;
    monster.animations.add('runr', [0, 1], 10, true);
    monster.tint = COLORS[Math.floor(Math.random() * COLORS.length)];

    monster.dead = false;
    monsters.push(monster);

    // If player is close, monster will turn back from him
    monster.shouldChangeDirection = function() { 
        if (player.position.distance(this.position) < MONSTER_AWARENESS_RANGE) {
            return true;
        }
        return (Math.random() < MONSTER_DIRECTION_CHANGE_CHANCE);
    };

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

    return monster;
}

function updateMonster(monster) {
    if (monster.dead) 
        return;
    if (Math.random() < MONSTER_DIRECTION_CHANGE_CHANCE) {
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
