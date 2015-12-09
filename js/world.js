var platforms;
var ground;
var sky;
var leftWall;
var formulas;
var formula = [];
var yDiff = [];

//  The platforms group contains the ground
function createWorld() {
    platforms = game.add.group();
    platforms.enableBody = true; //  We will enable physics for any formulaect that is created in this group

    sky = platforms.create(0, 0, 'sky');
    sky.scale.setTo(1, 1);
    sky.body.immovable = true;

    ground = platforms.create(0, game.world.height / 2 + 100, 'ground'); // Here we create the ground. 
    ground.scale.setTo(1, 1); //  Scale it to fit the width of the game 
    ground.body.immovable = true; //  This stops it from falling away when you jump on it
    ground.body.setSize(WINDOW_WIDTH, 1);
    ground.anchor.setTo(0, 0.5);

    formulas = game.add.group();
    formulas.enableBody = true;
    formula[1] = formulas.create(650,170, 'formula1');
    formula[2] = formulas.create(650,100, 'formula2');
    formula[3] = formulas.create(450,110, 'formula3');
    formula[4] = formulas.create(300,170, 'formula4');
    formula[5] = formulas.create(600 ,40, 'formula5');
    formula[6] = formulas.create(330 ,50, 'formula6');
    formula[7] = formulas.create(100,110, 'formula7');
    for (var i = 8; i < 15; i++){
        formula[i] = formulas.create(formula[i - 7].x , formula[i - 7].y + 300, 'formula'+i )
        yDiff[i - 7] = formula[i -7].y;
    }
    moveFormulas(formula);

    leftWall = game.add.sprite(0, game.world.height / 2 + 100, 'ground');
    leftWall.scale.setTo(10, 0.1);
}


function moveFormulas(formula) {
    for (var j = 1; j < 8; j++) {
        formula[j].body.velocity.set(-50 ,0);
        formula[j + 7].body.velocity.set(-50 ,0);
        if (formula[j].x < -100){
            var n1 = getRandomInt(1,14);
            formula[j] = formulas.create(800 ,yDiff[j], 'formula' + n1);
        }
        if (formula[j + 7].x < -100){
            var n2 = getRandomInt(1,14);
            formula[j+7] = formulas.create(800 ,yDiff[j] + 300, 'formula' + n2);
        }
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
