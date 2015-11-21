////////////////////////
// Глобальные объекты //
////////////////////////
var platforms;
var spacebar;
var ground;

//  The platforms group contains the ground
function createWorld() {
    platforms = game.add.group();
    platforms.enableBody = true; //  We will enable physics for any object that is created in this group

    var sky = platforms.create(0, 0, 'sky');
    sky.scale.setTo(1, 1);
    sky.body.immovable = true;

    ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.body.immovable = true; //  This stops it from falling away when you jump on it
    ground.body.setSize(800, 1);
    ground.anchor.setTo(0, 0.5);
}