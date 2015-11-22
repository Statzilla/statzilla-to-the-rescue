var counter = 0;
var timeStep = 10;
var counterText;


function timer() {  
    var timer = game.time.create(false);
    timer.loop(timeStep, updateCounter);
    timer.start();

    counterText = game.add.bitmapText(0, 0, 'carrier_command', 'Hi!', 64);
}

function updateCounter() {
    counter++;
}