////////////////////////
// Глобальные объедки //
////////////////////////
var histo;
var histos;
var HISTOS_SPAWN_CHANCE = 1.0;
var HISTOS_SPAWN_TRIAL_RATE = 100;
var HISTOS_CHANCE_INCREASE_RATE = 0.02;
var histosSpawnTimer;

function createHistos() {
    var numberOfHistos = 100;
    histoLayer = game.add.group();
    histoLayer.enableBody = true; 

    // histosSpawnTimer = game.time.create(false);
    // histosSpawnTimer.loop(HISTOS_SPAWN_TRIAL_RATE, 
    //                       function() {
    //                           HISTOS_SPAWN_CHANCE += HISTOS_CHANCE_INCREASE_RATE;
    //                           if (Math.random() < HISTOS_SPAWN_CHANCE) {
    //                               createHisto(game.world.width, LEVEL_SPEED);
    //                               HISTOS_SPAWN_CHANCE = 0.0;
    //                           }
    //                       }, 
    //                       this);
    // histosSpawnTimer.start();

    
    for (var i = 0; i < numberOfHistos; i++) {
        var minCoordX = 50;
        var maxCoordX = 150;
        var randCoordX = 400 + i*200 + Math.floor(Math.random() * (maxCoordX - minCoordX + 1)) + minCoordX;
        var speed = 200;
        
        createHisto(randCoordX, speed);
    }
}

function createHisto(randCoordX, speed) {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    var randDirection = Math.floor(Math.random() * 2);
    var coordY = game.world.height / 2;
    var randCoordY;
    if (randDirection === 0) {
        randCoordY = coordY + 1;
    } else {
        randCoordY = coordY - randFloor*20 - 2;
    }

    var randColor = Math.floor(Math.random() * 7);
    var histo = histoLayer.create(randCoordX, randCoordY, 'histo');
    game.physics.arcade.enable(histo); 
    histo.scale.setTo(1, randFloor*2);
    histo.body.immovable = true;
    histo.body.velocity.set(-speed, 0);
    histo.body.bounce.y  = 0;

    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    histo.tint = color;

    return histo;
}

function updateHistoPerTick() {

    histoLayer.forEach(function(item) {
        // game.physics.arcade.collide(player, item);
        if (Phaser.Rectangle.intersects(player.getBounds(), item.getBounds())) {
            if (item.height <= 50){
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                item.body.velocity.set(500, plusOrMinus*500);
                item.alpha = 1;
                game.add.tween(item).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
                counter = counter + item.height*10; // get points for kill histo
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
    sky = platforms.create(0, 0, 'ooops');
    ground = platforms.create(0, game.world.height / 2 - 10, 'ground');
    timer.stop();
    player.animations.stop(null, true);
    histoLayer.forEach(function(item) {
        item.body.velocity.set(0, 0);
    });
    killAllMonstersAndPreventFromSpawning();
    $('#points').val(counter);
    $('#points_show').html(counter);
    $('#name').focus();
    $('.form').fadeIn(100);
}

