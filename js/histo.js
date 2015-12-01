var histo;
var histoLayer;
var histosSpawnTimer;

function createHistos() {
    histoLayer = game.add.group();
    histoLayer.enableBody = true; 

    histosSpawnTimer = game.time.create(false);
    histosSpawnTimer.loop(HISTOS_SPAWN_TRIAL_RATE, 
        function() {
            if (Math.random() < HISTOS_SPAWN_CHANCE) {
                createHisto(game.world.width, LEVEL_SPEED);
            }
            increaseLevelSpeed();
            histosSpawnTimer.events[0].delay = HISTOS_SPAWN_TRIAL_RATE + Math.floor(Math.random() * 500);
        }, this);
    histosSpawnTimer.start();
}

function increaseLevelSpeed() {
    LEVEL_SPEED += LEVEL_SPEED_INCREASE;
    histoLayer.forEach(function(histo) {
        histo.body.velocity.x = -LEVEL_SPEED;
    });
}

function stopSpawningHistos() {
    histosSpawnTimer.events = [];
    histosSpawnTimer.destroy();
}

function createHisto(randCoordX, speed) {
    var randFloor = Math.floor(Math.random() * (MAXFLOOR - MINFLOOR + 1)) + MINFLOOR;

    var randDirection = Math.floor(Math.random() * 2);
    var coordY = game.world.height / 2;
    var randCoordY;
    if (randDirection === 0) {
        randCoordY = coordY + 1;
    } else {
        randCoordY = coordY - randFloor*20 - 2;
    }

    var histo = histoLayer.create(randCoordX, randCoordY, 'histo');
    game.physics.arcade.enable(histo); 
    histo.scale.setTo(1, randFloor*2);
    histo.body.immovable = true;
    histo.body.velocity.set(-speed, 0);
    histo.body.bounce.y = 0;

    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    histo.tint = color;

    return histo;
}

function updateHistoPerTick() {
    
   
    histoLayer.forEach(function(item) {
        var boundsHisto = item.getBounds();
        var leftBoundHisto = new Phaser.Rectangle(boundsHisto.x, boundsHisto.y, 3, boundsHisto.height);
             
        if (Phaser.Rectangle.intersects(player.getBounds(), leftBoundHisto)) {
            if (item.height <= player.body.height){
                
                item.body.velocity.set(500, plusOrMinus*500);
                var disappearDelay = 1000;
                var coordY = game.world.height / 2 - item.height;
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

                game.add.tween(item).to({alpha: 0}, 1000,  Phaser.Easing.Linear.None,  true,  0,  1000,  true);
                
                counter += item.height*10;

                var plusText = game.add.bitmapText(player.x + player.width, coordY, 'carrier_command', 'plus', 6);
                plusText.text = "+" + item.height*10;
                game.add.tween(plusText).to({alpha: 0}, disappearDelay,  Phaser.Easing.Linear.None,  true,  0,  1000,  true);

                if (Math.floor(counter / 5000) > GROW_COUNTER){
                    GROW_COUNTER = Math.floor(counter / 5000);
                    growPlayer(PLAYER_GROW_FACTOR);
                    console.log(GROW_COUNTER);
                }

                var timerplusText = game.time.create(false);
                timerplusText.add(disappearDelay,
                    function() { 
                      plusText.destroy();
                    });
                timerplusText.start();
                
                
            } else {
                 endGame();
            }  
        }
    });
}

function histoGrow(increase) {
    histoLayer.forEach(function(item) {
        monsters.map( function(monster){
            if (Phaser.Rectangle.intersects(monster.getBounds(), item.getBounds())) {
                if (item.y < game.world.height / 2 && item.tint === monster.tint) {
                    item.height += increase;
                    item.y -= increase;
                    monster.die(monsterDeathAnimationBlink);
                }
            }
        });
    });
}

function endGame() {
    var ooops = platforms.create(0, 0, 'ooops');
    ooops.body.immovable = true;
    ground = platforms.create(0, game.world.height / 2 - 10, 'ground');

    timer.stop();
    player.animations.stop(null, true);
    histoLayer.forEach(function(item) {
        item.body.velocity.set(0, 0);
    });
    killAllMonstersAndPreventFromSpawning();
    stopSpawningHistos();

    showRatingWindow();
}

function showRatingWindow() {
    $('#points').val(counter);
    $('#points_show').html(counter);
    $('#name').focus();
    $('.form').fadeIn(100);
}


function createStars() {
    var coordY = game.world.height / 2;
    console.log(player.y - player.height);
    // stars = game.add.sprite(player.x, player.y - player.height, 'stars');
    stars = game.add.sprite(player.x + player.width/2, coordY - player.height - 20, 'stars');
    // game.physics.arcade.enable(player); 

    // var shine = stars.animations.add('shine');
    // stars.animations.play('shine', 30, true);
    stars.animations.add('shine', [0, 1], 3, true);
    // player.animations.add('shine', [0, 1], 10, true); 

}
