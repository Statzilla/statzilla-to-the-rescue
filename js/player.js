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
  console.log("SPACEBAR pressed: gravity flip");
  console.log("Y before gravity flip: " + player.body.position.y);
  player.body.gravity.y = -player.body.gravity.y; 
  var new_y = 0;
  if (player.body.gravity.y > 0) {
    new_y = ground.body.position.y - 200;
  } else {
    new_y = ground.body.position.y + 200;
  }
  player.reset(player.body.position.x, new_y);
  console.log("Y after gravity flip: " + player.body.position.y);
  player.scale.y *= -1; // зеркально отобразить спрайт относительно y
}