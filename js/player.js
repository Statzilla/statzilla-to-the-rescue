var player;

// The player and its settings
function createPlayer() {
    player = game.add.sprite(30, 0, 'dino');
    game.physics.arcade.enable(player); // enable physics on the player

    //  Player physics properties
    player.body.bounce.y = 0;
    player.body.gravity.y = PLAYER_GRAVITY;
    player.body.collideWorldBounds = false;
    player.animations.add('right', [0, 1, 2, 3], 10, true); //  Animations, walking right.
}

function flipGravity() {
    player.body.gravity.y *= -1;

    var new_y = 0;
    if (player.body.gravity.y > 0) {
        new_y = ground.body.position.y - player.body.height / 2;
    } else {
        new_y = ground.body.position.y + player.body.height / 2;
        player.anchor.setTo(0, 0.5);
    }
    player.reset(player.body.position.x, new_y);
    player.scale.y *= -1; // зеркально отобразить спрайт относительно y
}

// Controls
function controlsOn() {
    var spacebar;
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
    game.input.onDown.add(flipGravity);
}

function growPlayer(factor) {
  // player.reset(player.body.x + 100, player.body.y);
  player.scale.x *= factor;
  player.scale.y *= factor;
  // player.scale.setTo(1, 1);
}