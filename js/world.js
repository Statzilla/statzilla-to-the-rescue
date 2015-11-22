////////////////////////
// Глобальные объекты //
////////////////////////
var platforms;
var spacebar;
var ground;
var objects;
var yDiff = new Array();

var ground;
var sky;
var obj = new Array();

var objGroup = 1;
var leftWall;


//  The platforms group contains the ground
function createWorld() {
    platforms = game.add.group();
    platforms.enableBody = true; //  We will enable physics for any object that is created in this group

    sky = platforms.create(0, 0, 'sky');
    sky.scale.setTo(1, 1);
    sky.body.immovable = true;

    ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.body.immovable = true; //  This stops it from falling away when you jump on it
    ground.body.setSize(800, 1);
    ground.anchor.setTo(0, 0.5);

    objects = game.add.group();
    objects.enableBody = true;

    obj[1] = objects.create(650,170, 'obj1');
    obj[2] = objects.create(650,100, 'obj2');
    obj[3] = objects.create(450,110, 'obj3');
    obj[4] = objects.create(300,170, 'obj4');
    obj[5] = objects.create(600 ,40, 'obj5');
    obj[6] = objects.create(330 ,50, 'obj6');
    obj[7] = objects.create(100,110, 'obj7');

    for (var i = 8; i < 15; i++){
        obj[i] = objects.create(obj[i - 7].x , obj[i - 7].y + 300, 'obj'+i )
        yDiff[i - 7] = obj[i -7].y;
    }



    // var ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create tDhe ground. 
    // ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.body.immovable = true; //  This stops it from falling away when you jump on it

    leftWall = game.add.sprite(0, game.world.height / 2, 'ground');
    leftWall.scale.setTo(10, 0.1);
}


function movingObjects(obj) {

    for (var j = 1; j < 8; j ++)
    {
            obj[j].body.velocity.set(-80 ,0);
            obj[j + 7].body.velocity.set(-80 ,0);
            if (obj[j].x < -100){
                var n1 = getRandomInt(1,14);
                obj[j] = objects.create(800 ,yDiff[j], 'obj' + n1);
            }

             if (obj[j + 7].x < -100){
                var n2 = getRandomInt(1,14);
                obj[j+7] = objects.create(800 ,yDiff[j] + 300, 'obj' + n2);
            }
    }



}

function getRandomInt(min, max){

      return Math.floor(Math.random() * (max - min + 1)) + min;

}




