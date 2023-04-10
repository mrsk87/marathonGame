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
    this.startButon();
    
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
