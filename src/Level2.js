class Level2 extends Phaser.Scene {

    constructor() {
      super('Level2');
      
    }
    
  
    preload() {
      this.load.image('sky2', 'assets/sky3.png');
      this.load.image('ground2', 'assets/ground4.png');
      this.load.image('wave', 'assets/wave.png');
      this.load.image('finishline2', 'assets/finishsprite.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('fish', 'assets/fish.png');
      this.load.image('bomb2', 'assets/bomb.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.spritesheet('dude2', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('restartBtn', 'assets/restart.png');
      this.load.audio('dead', 'assets/dead.mp3');
      this.load.audio('run2', 'assets/run2.mp3');
      this.load.audio('star', 'assets/star.mp3');
    }
  
    
    /**
   * @param data passed to scene at startup
   */
    create(data) {
        this.metaExists=false;
        this.score = data.score;
        this.gameOver=0;
        this.dific = this.score;
        this.wingame=false;
        this.cheatText = this.add.text(356, 56, 'Cheating!!', { fontSize: '32px', fill: 'orange' }).setVisible(false);
        this.cheatText.setDepth(1);

        switch (true) {
            case (this.dific<=30):
                this.dificult=1;
              console.log(this.dificult);
              break;
              case (this.dific >30 && this.dific<=60):
                this.dificult=2;
              console.log(this.dificult);
              break;
              
            default:
                this.dificult=3;
              console.log(`Full dificult.`);
          }
        console.log("dificult",this.dificult);
  
      
  
      console.log("Estamos no level 2");

      this.dead = this.sound.add('dead');
     this.run2 = this.sound.add('run2');
     this.gameover = this.sound.add('gameover');
     this.star = this.sound.add('star');
          this.dead.stop();
          this.gameover.stop();
        this.run2.play();
  
      //  A simple background for our game
      this.add.image(400, 300, 'sky2');
    
      
  
        const { height, width } = this.sys.game.config;
        this.gameSpeed = 5;
        this.platforms = this.physics.add.staticGroup();   
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 150, 'ground2').setScale(0.7).refreshBody();

        

        
      
  
      //add variables to functions 
        this.obstacule = this.add.group();
        this.meta = this.add.group();
        this.stars = this.add.group();  
        this.bombs = this.add.group();
        this.fish = this.add.group();
        this.bullet = this.add.group();

  
      this.time.addEvent({
      delay: Phaser.Math.Between(3000, 8000)/this.dificult,
      callback: this.addObject, 
      callbackScope: this,
      loop: true
      });
  
      this.time.addEvent({
      delay: 12000, //Phaser.Math.Between(100, 2000),
      callback: this.addFinishLine, 
      callbackScope: this,
      loop: false
      });
  
      this.time.addEvent({
      delay: Phaser.Math.Between(2000, 4000)/this.dificult,
      callback: this.addStar, 
      callbackScope: this,
      loop: true
      });
  
  
      this.time.addEvent({
      delay: Phaser.Math.Between(3000, 8000)/this.dificult,
      callback: this.addBomb,
      callbackScope: this,
      loop: true
      });
  
      this.time.addEvent({
      delay: Phaser.Math.Between(3000, 8000)/this.dificult,
      callback: this.addFish,
      callbackScope: this,
      loop: true
      });

      this.time.addEvent({
        delay: Phaser.Math.Between(3000, 8000)/this.dificult,
        callback: this.addBullet,
        callbackScope: this,
        loop: true
        });

      this.physics.add.existing(this.meta);
      this.physics.add.existing(this.stars);
      this.physics.add.existing(this.bombs);
      this.physics.add.existing(this.fish);
      this.physics.add.existing(this.bullet);
  
      
      this.player = this.physics.add.sprite(0, height, 'dude2')
     .setCollideWorldBounds(true)
     .setGravityY(-3000)
     .setOrigin(0, 1);
 
     this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });
  
     this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude2', frame: 4 } ],
          frameRate: 20
      });
  
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });
  
      
      this.cursors = this.input.keyboard.createCursorKeys();
  
      //  The score
      console.log(this.score);
      this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
  
      this.physics.add.collider(this.platforms, this.obstacule);
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.platforms, this.meta);
      this.physics.add.collider(this.player, this.obstacule, this.collidePlayerObstacule, null, this);
      this.physics.add.collider(this.player, this.meta, this.collideMeta, null, this);
      this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
      this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
      this.physics.add.overlap(this.player, this.fish, this.hitFish, null, this);
      this.physics.add.overlap(this.player, this.bullet, this.hitBullet, null, this);
      this.physics.add.overlap(this.player, this.obstacule, this.hitFire, null, this);
     
    }
  
    update() {

        if(this.score>99){
            this.dead.stop();
                this.gameover.stop();
                this.run2.stop();
            this.scene.start("wingame");
        };

        if(this.metaExists!=true ){
            console.log("meta not exists");
              
            }else if(this.metaExists=true && this.gameOver!=true){
                console.log(this.player.x);
                console.log("meta", this.meta.x);
                console.log("meta exists");
                if(this.meta.getChildren()[0].x<this.player.x){
                    this.wingame=true;
                }
                
            };   
      
      if (this.cursors.space.isDown && this.gameOver!=true )
        {
          
            console.log(this.cheatText.text);
            this.obstacule.getChildren().forEach(function(obstacule) {
                console.log("disable obstcule");
                obstacule.disableBody(true, true);
            });
            this.bombs.getChildren().forEach(function(bomb2) {
                console.log("disable bomb2");
                bomb2.disableBody(true, true);
            });
            this.fish.getChildren().forEach(function(fish) {

                console.log("disable fish");
                fish.disableBody(true, true);
            })
            this.bullet.getChildren().forEach(function(bullet) {
                console.log("disable bullet");
                bullet.disableBody(true, true);
            })
            
            this.gameOver=0;
            this.cheatText.setVisible(true);
            console.log("Space pressed");
            
        } else if (!this.cursors.space.isDown ) {
          
            this.cheatText.setVisible(false);
        }
  
        this.fish.body.setVelocityX(100);
          this.player.setVelocityX(6);
          this.player.anims.play('right', true);  
      if (this.gameOver!=true)
      {
          
          this.platforms.tilePositionX += this.gameSpeed;
          
          this.obstacule.getChildren().forEach(function(object) {
          object.x += -5;
          });
          this.fish.getChildren().forEach(function(fish){
              fish.x+= -5;
          });
          this.bullet.getChildren().forEach(function(bullet){
            bullet.x+= -5;
        })
          
      } else {
        this.run2.stop();
          this.player.setVelocityX(0);
          this.physics.pause();
          this.player.anims.play('turn');
          this.platforms.tilePositionX = 0;
          this.obstacule.getChildren().forEach(function(object) {
              object.x = 0;
              object.disableBody(true, true);
          //Remover objetos final do jogo
          });

          this.stars.getChildren().forEach(function(star) {
              star.x = 0;
              star.disableBody(true, true);
          });

          this.bombs.getChildren().forEach(function(bomb2) {
          bomb2.x = 0;
          bomb2.disableBody(true, true);
          });
  
          this.meta.getChildren().forEach(function(meta) {
          meta.x += 0;
          meta.disableBody(true, true);
          });
  
          this.fish.getChildren().forEach(function(fish) {
              fish.x = 0;
              fish.disableBody(true, true);
              });
          
              this.bullet.getChildren().forEach(function(bullet) {
                bullet.x = 0;
                bullet.disableBody(true, true);
                });  
  
          this.gameOverText = this.add.text(56, 56, 'Morreu', { fontSize: '32px', fill: 'red' });
          this.botaoRestart();    
      }
  
      if(this.colide=true){
          this.player.setVelocityX(0);
      }       
  
      if (this.wingame!=true){
          
          this.meta.getChildren().forEach(function(meta) {
          meta.x += -5;      
          });
          
      } else {
          
          this.player.setVelocityX(0);
        this.physics.pause();
        this.player.anims.play('turn');
        this.platforms.tilePositionX = 0;
        this.obstacule.getChildren().forEach(function(object) {
        object.x = 0;
        object.disableBody(true, true);       
        });

        this.stars.getChildren().forEach(function(star) {
        star.x = 0;
        star.disableBody(true, true);
        });

        this.bombs.getChildren().forEach(function(bomb) {
        bomb.x = 0;
        bomb.disableBody(true, true);
        });

        this.fish.getChildren().forEach(function(fish) {
            fish.x = 0;
            fish.disableBody(true, true);
            });

        this.meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        });

        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.scene.start("Level1", {score: this.score});
            },
            loop: true
        })
        
        this.run2.stop();
        
      }
     
      if (this.cursors.left.isDown)
      {
          this.player.setVelocityX(-160);
          this.player.anims.play('left', true);
      }
      else if (this.cursors.right.isDown)
      {
          this.player.setVelocityX(160);
          this.player.anims.play('right', true);
      } 
      
      if (this.cursors.down.isDown && this.player.body.onFloor())
      {
          this.player.setVelocityY(1500);
          
      } 
      
      if (this.cursors.down.isDown && !this.player.body.onFloor())
      {
          this.player.setVelocityY(500);
          
      } 

  
    }
  
          collidePlayerObstacule (player, obstacule){
              this.colide = true;
              console.log("colide");
              
          }

          collideMeta (player, meta)
          {
              this.wingame=true;
  
          }
  
          collisionPlat (platforms, obstacule)
          {
              console.log("obstaculo na plataforma");
              obstacule.body.setCollideWorldBounds(true);
              if (obstacule.x<45){
                  obstacule.disableBody(true, true);
              }
          }
  
          collisionMeta (platforms, meta)
          {
            
              meta.body.setCollideWorldBounds(true);
          }
  
  
              collectStar (player, stars)
          {
              stars.disableBody(true, true);
  
              //  Add and update the score
              this.score += 10;
              console.log(this.score);
              this.star.play();
              this.scoreText.setText('Score: ' + this.score);
              
           }
  
            hitBomb (player, bomb2)
          {
            this.dead.play();
            this.gameover.play();
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameOver = true;
          }
  
          addObject() {
          
            
  
          //console.log("wave");
          var object = this.physics.add.sprite(800,110, 'wave');
          object.body.setCollideWorldBounds(false);
          object.body.setAllowGravity(false);
          this.obstacule.add(object);
          object.setScale(0.15);
          
          }
  
          addFinishLine() {
              
              console.log("Meta");
              this.metaExists=true;
              var finishline2 = this.physics.add.sprite(800, 190, 'finishline2');
              finishline2.setScale(0.2);
              this.meta.add(finishline2);
              finishline2.flipY=true;
              this.meta.body.setImmovable(true);
              finishline2.body.setCollideWorldBounds(false);
              finishline2.body.setAllowGravity(false);

              }
  
          addStar() {
              //console.log("Estrela a cair");
              var star = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'star');
              this.stars.add(star);
              this.stars.body.setCollideWorldBounds(true);
              }
  
              addBomb() {
                console.log("Bomba a cair");
                var bomb2 = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'bomb2');
                this.bombs.add(bomb2);
                this.bombs.body.setCollideWorldBounds(true);  
                }
  
          addFish() {
          //console.log("Fish");
          var fish = this.physics.add.sprite(800,Phaser.Math.Between(200, 600), 'fish');
          fish.body.setCollideWorldBounds(false);
          fish.body.setAllowGravity(false);
          this.fish.body.setImmovable(true);
          this.fish.add(fish);
          fish.setScale(0.5);
          fish.flipX=true;
          }
          
          hitFish (player, fish)
          {
            this.dead.play();
            this.gameover.play()
            this.physics.pause(); 
            this.player.setTint(0xff0000); 
            this.player.anims.play('turn');
            this.gameOver = true;
          }

          addBullet() {
            console.log("Bullet");
            var bullet = this.physics.add.sprite(800,Phaser.Math.Between(200, 700), 'bullet');
            bullet.body.setCollideWorldBounds(false);
            bullet.body.setAllowGravity(false);
            this.bullet.body.setImmovable(true);
            this.bullet.add(bullet);
            bullet.setScale(1);
            bullet.flipX=true;
            }
            
            hitBullet (player, bullet)
            {
                this.dead.play();
                this.gameover.play()
                this.physics.pause();
                this.player.setTint(0xff0000);
                this.player.anims.play('turn');
                this.gameOver = true;
            }
  
          hitFire (player, fire)
          {
            this.dead.play();
            this.gameover.play()
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameOver = true;
          }
          
           
  
          resetLevel(){
              this.gameOver = 0;
              this.scene.start("Level1");
          }
  
          botaoRestart(){
              //Botao restart
              const restartBtn = this.add.image(400, 300, 'restartBtn')
              .setScale(0.1)
              restartBtn.setInteractive();
  
              restartBtn.on('pointerdown', () => {
                  restartBtn.setTint(0xff00ff);
                  this.scene.start("Level1", {score: 0});
                  this.dead.stop();
                this.gameover.stop();
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
              const clickrestart = this.add.text(200, 200, 'Restart Game!', { fontSize: '32px',fill: 'yellow' })
              .setInteractive()
              .on('pointerdown', () => this.scene.start("Level1", {score: 0}));
          }

  }
  
  export default Level2;
  