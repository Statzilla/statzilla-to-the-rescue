function collisionHandler (obj1, obj2) {
    game.stage.backgroundColor = '#992d2d';
    histo.body.velocity.set(500, 500);
    histo.alpha = 1;
    game.add.tween(histo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}