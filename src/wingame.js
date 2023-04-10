class wingame extends Phaser.Scene {

    constructor() {
      super('wingame');
    }

    preload(){
        this.load.image('skywin', 'assets/skywingame.png');
        this.load.audio('win', 'assets/wingame.mp3');
        this.load.image('restartBtn', 'assets/restart.png');
    }
  
    create() {
        this.add.image(400, 300, 'skywin');
       //this.scene.start("Level2")

       this.win = this.sound.add('win');
          this.win.play();
  
      this.add.text(306, 306, 'WINNER!!!', { fontSize: '52px', fill: '#000' });
      console.log("wingame");
      //this.scene.start("Level1");
  
      
      this.botaoRestart();
  
      
  
      
    }

    botaoRestart(){
        //Botao restart
        const restartBtn = this.add.image(230, 400, 'restartBtn')
        .setScale(0.1)
        restartBtn.setInteractive();

        restartBtn.on('pointerdown', () => {
            restartBtn.setTint(0xff00ff);
            this.scene.start("Level1", {score: 0});
            
            
        });

        restartBtn.on('pointerup', () => {
            restartBtn.clearTint();
        });

        restartBtn.on('pointerover', () => {
            restartBtn.setScale(0.11);
        });

        restartBtn.on('pointerout', () => {
            restartBtn.setScale(0.1);
        });

        //Botao para fazer restart game quando ha gameover
        const clickrestart = this.add.text(300, 400, 'Restart Game!', { fontSize: '32px',fill: 'red' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start("Level1", {score: 0}));

    }
  
  }
  
  export default wingame;