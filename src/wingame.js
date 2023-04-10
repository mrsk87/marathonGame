class wingame extends Phaser.Scene {

    constructor() {
      super('wingame');
    }

    preload(){
        this.load.image('skywin', 'assets/skywingame.png');
        this.load.audio('win', 'assets/wingame.mp3');
    }
  
    create() {
        this.add.image(400, 300, 'skywin');
       //this.scene.start("Level2")

       this.win = this.sound.add('win');
          this.win.play();
  
      this.add.text(306, 306, 'WINNER!!!', { fontSize: '32px', fill: '#000' });
      console.log("wingame");
      //this.scene.start("Level1");
  
      
      
  
      const clickButton = this.add.text(100, 100, 'Restart Game!', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start("Level1", {score: 0}) );
  
      
    }
  
  }
  
  export default wingame;