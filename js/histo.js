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

// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

function createHisto(randCoordX, speed) {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    var randDirection = Math.floor(Math.random() * 2);
    var coordY = game.world.height / 2;
    var randCoordY;
    if (randDirection === 0) {
        randCoordY = coordY + 11;
    } else {
        randCoordY = coordY - randFloor*20 + 8;
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

    var flag = 0;
    histoLayer.forEach(function(item) {

        // game.physics.arcade.collide(player, item);
        if (Phaser.Rectangle.intersects(player.getBounds(), item.getBounds()) & !flag) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
            item.body.velocity.set(plusOrMinus*500, plusOrMinus2*500);
            item.alpha = 1;
            game.add.tween(item).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            var flag = 1;
            
        }
    });

}

function growHisto(){
    // histoLayer.
}