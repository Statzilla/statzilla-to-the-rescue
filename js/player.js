////////////////////////
// Глобальные объекты //
////////////////////////
var player;

///////////////
// Константы //
///////////////
var PLAYER_WIDTH = 48;
var PLAYER_HEIGHT = 50;

// The player and its settings
function createPlayer() {
    player = game.add.sprite(0, 0, 'dino');
    game.physics.arcade.enable(player); // We need to enable physics on the player

    //  Player physics properties
    player.body.bounce.y = 0;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = false;
    // player.body.immovable = true;
    player.animations.add('right', [0, 1, 2, 3], 10, true); //  Animations, walking right.
}

function flipGravity() {
    player.body.gravity.y *= -1; 
    var new_y = 0;
    if (player.body.gravity.y > 0) {
        new_y = ground.body.position.y - 25;
    } else {
        new_y = ground.body.position.y + 25;
        player.anchor.setTo(0, 0.5);
    }
    player.reset(player.body.position.x, new_y);
    player.scale.y *= -1; // зеркально отобразить спрайт относительно y
}

function playerGrows(coeff) {
    player.height = player.height*coeff;
    player.width = player.width*coeff;
    if (player.body.gravity.y > 0) {
        player.body.y -= player.height*(coeff - 1);
    }
    else {
        player.body.y += player.height*(coeff - 1);
    }
}