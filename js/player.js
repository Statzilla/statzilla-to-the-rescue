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
    player = game.add.sprite(PLAYER_WIDTH + 10, 0, 'dino');
    game.physics.arcade.enable(player); // We need to enable physics on the player

    //  Player physics properties
    player.body.bounce.y = 0;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    // player.body.immovable = true;
    //  Animations, walking left and right.
    player.animations.add('right', [0, 1, 2, 3], 10, true);

}

function flipGravity() {
    player.position.y += PLAYER_HEIGHT;
    player.body.gravity.y = -player.body.gravity.y; 
}