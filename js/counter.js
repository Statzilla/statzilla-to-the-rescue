var counter = 0;
var counterText;
var timer;

function timer() {  
    timer = game.time.create(false);
    timer.loop(COUNTER_TIMESTEP, updateCounter);
    timer.start();

    counterText = game.add.bitmapText(0, 0, 'carrier_command', 'Hi!', 64);
}

function updateCounter() {
    counter++;   
}