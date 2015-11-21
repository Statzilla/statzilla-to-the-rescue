////////////////////////
// Глобальные объекты //
////////////////////////
var player;

///////////////
// Константы //
///////////////
var PLAYER_WIDTH = 48;
var PLAYER_HEIGHT = 62;

// The player and its settings
function createPlayer() {
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

function flipGravity() {
    player.position.y += PLAYER_HEIGHT;
    player.body.gravity.y = -player.body.gravity.y; 
}