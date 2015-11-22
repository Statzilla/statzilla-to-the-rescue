var sprite;
var emitter;
var path;
var index;

function createParticleEmitter() {

    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3'] );

    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);
    emitter.setScale(0.4, 0, 0.4, 0, 3000);

    emitter.start(false, 3000, 5);

    sprite = game.add.sprite(25, game.world.height / 2 - 25, 'ball', 0);

    game.physics.arcade.enable(sprite);
    game.physics.arcade.gravity.y = 110;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;


    sprite.body.setSize(20, 20, 0, 0);
    sprite.body.collideWorldBounds = true;
    //sprite.body.bounce.set(1);
    sprite.body.velocity.set(300, 200);

    sprite.checkWorldBounds = true;
    sprite.outOfBoundsKill = true;

    sprite.scale.set(0.5);

    sprite.inputEnabled = true;

    sprite.input.enableDrag();
    sprite.events.onDragStart.add(onDragStart, this);
    sprite.events.onDragStop.add(onDragStop, this);

    sprite.animations.add('pulse');
    sprite.play('pulse', 30, true);
    sprite.anchor.set(0.5);

    //createText(16, 16, 'If you can catch the fireball, drag it around');

}

function updateParticleEmitter() {
    var px = sprite.body.velocity.x;
    var py = sprite.body.velocity.y;
    px *= -1;
    py *= -1;
    emitter.minParticleSpeed.set(px, py);
    emitter.maxParticleSpeed.set(px, py);
    emitter.emitX = sprite.x;
    emitter.emitY = sprite.y;
    // emitter.forEachExists(game.world.wrap, game.world);
    game.world.wrap(sprite, 64);
}

function onDragStart() {
    sprite.body.moves = false;
}

function onDragStop() {
    sprite.body.moves = true;
}
