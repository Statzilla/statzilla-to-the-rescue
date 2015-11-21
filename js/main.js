var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('TheGame', theGame);
game.state.add('Game_Over', gameOver);
game.state.start('TheGame');

var score = 0;

//добавить переход в состояние "Game_Over" в необходимом месте
