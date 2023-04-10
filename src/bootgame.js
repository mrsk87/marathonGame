class bootgame extends Phaser.Scene {

  constructor() {
    super('bootgame');
  }

  preload(){
    this.load.image('skyBoot', 'assets/skyBoot.png');
    this.load.image('startbtn', 'assets/start.png');
    //this.load.audio('win', 'assets/wingame.mp3');
}

  create() {

    this.add.image(400, 300, 'skyBoot');
       //this.scene.start("Level2")

      //  this.win = this.sound.add('win');
      //     this.win.play();

     //this.scene.start("Level2")

    // this.add.text(306, 306, 'Marathon Game', { fontSize: '32px', fill: '#000' });
    // console.log("bootgame");
    // //this.scene.start("Level1");

    
    
    this.startButon();


    // const clickButton = this.add.text(300, 300, 'Start Game!', { fill: '#000' })
    //   .setInteractive()
    //   .on('pointerdown', () => this.scene.start("Level1", {score: 0}) );

    
  }

  startButon(){
    //Botao restart
    const startBtn = this.add.image(400, 300, 'startbtn')
    .setScale(1)
    startBtn.setInteractive();

    startBtn.on('pointerdown', () => {
        
        this.scene.start("Level1", {score: 0});
        
        
    });

    

    

}

}

export default bootgame;
