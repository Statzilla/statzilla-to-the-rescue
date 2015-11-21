////////////////////////
// Глобальные объекты //
////////////////////////
var platforms;
var spacebar;


var ground;


var sky;

var obj = new Array();

var objGroup = 2;

var leftWall;


//  The platforms group contains the ground
function createWorld() {
    platforms = game.add.group();
    platforms.enableBody = true; //  We will enable physics for any object that is created in this group

    sky = platforms.create(0, 0, 'sky');
    sky.scale.setTo(1, 1);
    sky.body.immovable = true;


    var ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.body.immovable = true; //  This stops it from falling away when you jump on it



    ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.body.immovable = true; //  This stops it from falling away when you jump on it
    ground.body.setSize(800, 1);
    ground.anchor.setTo(0, 0.5);

    obj[1] = platforms.create(500,170, 'obj1');
    obj[2] = platforms.create(600,100, 'obj2');
    obj[3] = platforms.create(400,100, 'obj3');
    obj[4] = platforms.create(300,170, 'obj4');

    obj[5] = platforms.create(1000,170, 'obj5');
    obj[6] = platforms.create(1100,100, 'obj6');
    obj[7] = platforms.create(900,100, 'obj7');
    obj[8] = platforms.create(800,170, 'obj8');

    // var ground = platforms.create(0, game.world.height / 2, 'ground'); // Here we create the ground. 
    // ground.scale.setTo(1, 1); //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.body.immovable = true; //  This stops it from falling away when you jump on it

    leftWall = game.add.sprite(0, game.world.height / 2, 'ground');
    leftWall.scale.setTo(10, 0.1);
}


function movingObjects(obj) {

	for (var i = 0; i < 2; i++){
        if (obj[1+i*4].x < -100)
            obj[1+i*4].reset(1300, obj[1 + i*4].y);
        obj[1+i*4].body.velocity.set(-50,0)

        if (obj[2 + i*4].x < -100)
            obj[2 + i*4].reset(1400, obj[2 +i*4].y);
        obj[2 + i*4].body.velocity.set(-50,0)

        if (obj[3 + i*4].x < -100)
            obj[3 + i*4].reset(1200, obj[3 + i*4].y);
        obj[3 + i*4].body.velocity.set(-50,0)

        if (obj[4 + i*4].x < -100)
            obj[4 + i*4].reset(1100, obj[4 + i*4].y);
        obj[4 + i*4].body.velocity.set(-50,0)

	}


}


