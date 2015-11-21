var theGame = function(game){};
theGame.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/ox.png');
        for (var i = 0; i < 7; i++) {
            game.load.image('histo' + i, 'assets/histo' + i + '.svg');
        }
      game.load.image('monster', 'assets/human.png');  
      game.load.spritesheet('dino', 'assets/dinosprite2.png', PLAYER_WIDTH, PLAYER_HEIGHT); 
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE); //  We're going to be using physics, so enable the Arcade Physics system

        createWorld();
        createPlayer();
        createHistos(); 
        createMonsters();
            
        // Our controls.
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(flipGravity);
    },

     update: function() {
        game.physics.arcade.collide(player, platforms); //Collide player and ground
        player.animations.play('right'); //Constantly "moving" to the right 
        game.physics.arcade.collide(player, histo, collisionHandler, null, this);
        updateMonstersPerTick();
    },

    render: function() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(player, 32, 500);    
    }
}