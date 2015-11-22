var counter = 0;
var timeStep = 10;
var counterText;
var timer;


function timer() {  
    timer = game.time.create(false);
    timer.loop(timeStep, updateCounter);
    // timer.loop(1000, checkGrowth);
    timer.start();


    counterText = game.add.bitmapText(0, 0, 'carrier_command', 'Hi!', 64);
}

function updateCounter() {
    counter++;   
}

function checkGrowth() {
    if (counter > 1000 && counter < 2000) {
        playerGrows(1.2);
    }
}