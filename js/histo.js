////////////////////////
// Глобальные объекты //
////////////////////////
var histo;
var histos;


function createHistos() {
    var numberOfHistos = 100;
    histoLayer = game.add.group();
    histoLayer.enableBody = true; 

    for (var i = 0; i < numberOfHistos; i++) {
        var minCoordX = 50;
        var maxCoordX = 150;
        var randCoordX = 100 + i*200 + Math.floor(Math.random() * (maxCoordX - minCoordX + 1)) + minCoordX;
        var speed = 200;
        
        createHisto(randCoordX, speed);
    }
}

function createHisto(randCoordX, speed) {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    var randDirection = Math.floor(Math.random() * 2);
    var coordY = game.world.height / 2;
    var randCoordY;
    if (randDirection === 0) {
        randCoordY = coordY;
    } else {
        randCoordY = coordY - randFloor*20;
    }

    var randColor = Math.floor(Math.random() * 7);
    var histo = histoLayer.create(randCoordX, randCoordY, 'histo' + randColor);
    game.physics.arcade.enable(histo); 
    histo.scale.setTo(1, randFloor*2);
    histo.body.immovable = true;
    histo.body.velocity.set(-speed, 0);
    histo.body.bounce.y  = 0;
    return histo;
}

function updateHistoPerTick() {

    histoLayer.forEach(function(item) {

        // game.physics.arcade.collide(player, item);
        if (Phaser.Rectangle.intersects(player.getBounds(), item.getBounds())) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            item.body.velocity.set(500, plusOrMinus*500);
            item.alpha = 1;
            game.add.tween(item).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }
    });

}
