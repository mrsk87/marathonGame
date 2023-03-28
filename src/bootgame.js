class bootgame extends Phaser.Scene {

  constructor() {
    super('bootgame');
  }

  create() {
    this.add.text(16, 16, 'Loading Game', { fontSize: '32px', fill: '#000' });
    console.log("bootgame");
    //this.scene.start("Level1");

    
    

    const clickButton = this.add.text(100, 100, 'Click me!', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.scene.start("Level1") );

    
  }

}

export default bootgame;
