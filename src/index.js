import bootgame from './bootgame';
import Level1 from './Level1';
import Level2 from './Level2';
//import PreloadScene from './PreloadScene';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  transparent: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: [bootgame, Level1, Level2]
};

//this.scene.start("bootgame");


var game = new Phaser.Game(config);
