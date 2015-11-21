var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: PRELOAD, create: CREATE, update: UPDATE, render: RENDER});

function PRELOAD() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ox.png');

    game.load.image('histo', 'assets/histo.svg');
    game.load.spritesheet('dino', 'assets/dinosprite.png', PLAYER_WIDTH, PLAYER_HEIGHT); 


    for (var i = 0; i < 7; i++) {
        game.load.image('histo' + i, 'assets/histo' + i + '.svg');
    }
  game.load.image('monster', 'assets/human.png');  
  game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 

    game.load.image('histo', 'assets/histo.svg');
    game.load.image('obj1', 'assets/obj1.png');
    game.load.image('obj2', 'assets/obj2.png');
    game.load.image('obj3', 'assets/obj3.png');
    game.load.image('obj4', 'assets/obj4.png');
    game.load.image('obj5', 'assets/obj5.png');
    game.load.image('obj6', 'assets/obj6.png');
    game.load.image('obj7', 'assets/obj7.png');
    game.load.image('obj8', 'assets/obj8.png');
    game.load.spritesheet('dino', 'assets/dinosprite.png', PLAYER_WIDTH, PLAYER_HEIGHT); 


}

function CREATE() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

    createWorld();
    createPlayer();
    createHistos(); 

    createMonsters();

        
    // Our controls.
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(flipGravity);
}

function UPDATE() {
    game.physics.arcade.collide(player, platforms); //Collide player and ground

    player.animations.play('right'); //Constantly "moving" to the right 
    game.physics.arcade.collide(player, histo, collisionHandler, null, this);
    updateMonstersPerTick();

    player.animations.play('right'); //Constantli "moving" to the right 
   
    // game.physics.arcade.collide(obj, leftWall, function() {obj.x = 600;});
   // object's moving

   movingObjects(obj);
    
}

function RENDER() {

}
