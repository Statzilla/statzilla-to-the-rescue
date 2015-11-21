////////////////////////
// Глобальные объекты //
////////////////////////
var histo;
var histos;


function createHistos() {
    var numberOfHistos = 5;
    histoLayer = game.add.group();
    histoLayer.enableBody = true; 

    for (var i = 0; i < numberOfHistos; i++) {
        var minCoordX = 100;
        var maxCoordX = 800;
        var randCoordX = i * (Math.floor(Math.random() * (maxCoordX - minCoordX + 1)) + minCoordX);
        createHisto(randCoordX);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createHisto(randCoordX) {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    var randDirection = Math.floor(Math.random() * 2) ;   

    var coordY = game.world.height / 2;

    var randCoordY = coordY - randDirection*randFloor*10;

    var histo = histoLayer.create(randCoordX, randCoordY, 'histo');
    histo.scale.setTo(1, randFloor);
    game.physics.enable(histo, Phaser.Physics.ARCADE);
    histo.body.velocity.set(-50, 0);
    return histo;
}