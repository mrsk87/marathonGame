class Level1 extends Phaser.Scene {

  constructor() {
    super('Level1');
    
  }
  

  preload() {
    this.load.image('sky', 'assets/sky2.png');
    this.load.image('ground', 'assets/ground1.png');
    this.load.image('object', 'assets/fire.png');
    this.load.image('finishline', 'assets/finishsprite.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('ufo', 'assets/ufo.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('restartBtn', 'assets/restart.png');
    this.load.audio('dead', 'assets/dead.mp3');
    this.load.audio('run', 'assets/run.mp3');
    this.load.audio('gameover', 'assets/gameover.mp3');
    this.load.audio('star', 'assets/star.mp3');
  }

  /**
   * @param data passed to scene at startup
   */

  create(data) {
    
    this.metaExists=false;
    this.gameOver=0;
    this.score = data.score;
    this.dific = this.score;
    this.gameOver=0;
    this.wingame=false;
    this.cheatText = this.add.text(356, 56, 'Cheating!!', { fontSize: '32px', fill: 'orange' }).setVisible(false);
    this.cheatText.setDepth(1);
    console.log("score",this.score);

    switch (true) {
        case (this.dific<=30):
            this.dificult=1;
          console.log(this.dificult);
          break;
          case (this.dific >30 && this.dific<60):
            this.dificult=2;
          console.log(this.dificult);
          break;
          
        default:
            this.dificult=3;
          console.log(`Full dificult.`);
      }
    console.log("dificult",this.dificult);

    
    
    console.log("Estamos no level 1");

    this.dead = this.sound.add('dead');
    this.run = this.sound.add('run');
    this.gameover = this.sound.add('gameover');
    this.star = this.sound.add('star');

    

    this.run.play();

    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    const { height, width } = this.sys.game.config;
    this.gameSpeed = 5;
    this.platforms = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1);
    
    
    this.physics.add.existing(this.platforms);

    // set the TileSprite's physics properties
    this.platforms.body.setCollideWorldBounds(true);
    this.platforms.body.setBounce(0);
    //platforms.body.setVelocity(200, 200);

    

    //add variables to functions 
    this.obstacule = this.add.group();


    this.meta = this.add.group();

    this.stars = this.add.group();

    this.bombs = this.add.group();

    this.ufo = this.add.group();

    
    

    this.time.addEvent({
    delay: Phaser.Math.Between(4000, 8000)/this.dificult,
    callback: this.addObject, 
    callbackScope: this,
    loop: true
    });

    this.time.addEvent({
    delay: 9000, //Phaser.Math.Between(100, 2000),
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
    delay: Phaser.Math.Between(4000, 8000)/this.dificult,
    callback: this.addBomb,
    callbackScope: this,
    loop: true
    });

    this.time.addEvent({
    delay: Phaser.Math.Between(4000, 8000)/this.dificult,
    callback: this.addUfo,
    callbackScope: this,
    loop: true
    });

   

    //this.physics.add.existing(this.obstacule);
    //this.obstacule.body.setCollideWorldBounds(true);
    this.physics.add.existing(this.meta);
    this.physics.add.existing(this.stars);
    this.physics.add.existing(this.bombs);
    this.physics.add.existing(this.ufo);

    
    this.player = this.physics.add.sprite(0, height, 'dude')
   .setCollideWorldBounds(true)
   .setGravityY(3000)
   .setOrigin(0, 1);
   //this.createControll();

    


   this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

   this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    
    this.cursors = this.input.keyboard.createCursorKeys();

    //  The score
    
    this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(this.platforms, this.obstacule, this.collisionPlat, null, this);
    this.physics.add.collider(this.platforms, this.meta, this.collisionMeta, null, this);
    //this.physics.add.collider(this.platforms, this.stars, this.collisionPlatStar, null, this);
    this.physics.add.collider(this.player, this.obstacule, this.collidePlayerObstacule, null, this);
    this.physics.add.collider(this.player, this.meta, this.collideMeta, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.ufo, this.hitUfo, null, this);
    this.physics.add.overlap(this.player, this.obstacule, this.hitFire, null, this);
    //this.physics.add.collider(stars, platforms);
    

    


  }

  update() {

    if(this.score>10){
        this.dead.stop();
        this.gameover.stop();
        this.run.stop();
        this.scene.start("wingame");
    };
    
    if(this.metaExists!=true ){
        console.log("meta not exists");
          
        }else if(this.metaExists=true && this.gameOver!=true){
            console.log(this.player.x);
            console.log("meta", this.meta.x);
            console.log("meta exists");
            //console.log(this.meta.x);
            if(this.meta.getChildren()[0].x<this.player.x){
                this.wingame=true;
            }
            
        };  
    
    if (this.cursors.space.isDown )
      {
        
          console.log("Superhomem")
          this.obstacule.getChildren().forEach(function(obstacule) {
              //obstacule.x = 0;
              console.log("disable obstcule");
              obstacule.disableBody(true, true);
          })
          this.bombs.getChildren().forEach(function(bomb) {
              //bomb.x = 0;
              console.log("disable bomb");
              bomb.disableBody(true, true);
          });
          this.ufo.getChildren().forEach(function(ufo) {
            //bomb.x = 0;
            console.log("disable ufo");
            ufo.disableBody(true, true);
        });
        // this.bullet.getChildren().forEach(function(bullet) {
        //     //bomb.x = 0;
        //     console.log("disable bullet");
        //     bullet.disableBody(true, true);
        // })
          
          this.gameOver=0;
          
          //this.physics.add.collider(player, obstacule, collideOff, null, this);
          this.cheatText.setVisible(true);
            //this.physics.add.collider(player, obstacule, collideOff, null, this);
            console.log("Space pressed");
            
        } else if (!this.cursors.space.isDown ) {
          
            //this.obstacule.body.setCollideWorldBounds(true);
            //this.gameOverText = this.add.text(56, 56, 'SuperHomem', { fontSize: '32px', fill: '#000' });
            this.cheatText.setVisible(false);
      }

      this.ufo.body.setVelocityX(100);
        this.player.setVelocityX(5);
        
        this.player.anims.play('right', true);

    if (this.gameOver!=true)
    {
        
        this.platforms.tilePositionX += this.gameSpeed;
        
        this.obstacule.getChildren().forEach(function(object) {
        object.x += -5;
        //console.log(obstacule.x );
        });
        this.ufo.getChildren().forEach(function(ufo){
            ufo.x+= -5;
        })
        
    } else {
        
        this.run.stop();
        this.player.setVelocityX(0);
        this.physics.pause();
        this.player.anims.play('turn');
        this.platforms.tilePositionX = 0;
        this.obstacule.getChildren().forEach(function(object) {
            object.x = 0;
            object.disableBody(true, true);
        
        //console.log(obstacule.x );
        //Remover objetos final do jogo
        });
        this.stars.getChildren().forEach(function(star) {
            star.x = 0;
            star.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        this.bombs.getChildren().forEach(function(bomb) {
        bomb.x = 0;
        bomb.disableBody(true, true);
        
        //console.log(obstacule.x );
        });

        this.meta.getChildren().forEach(function(meta) {
        meta.x += 0;
       
        meta.disableBody(true, true);
        //console.log(obstacule.x );
        });

        this.ufo.getChildren().forEach(function(ufo) {
            ufo.x = 0;
            ufo.disableBody(true, true);
            
            //console.log(obstacule.x );
            });

        this.gameOverText = this.add.text(56, 56, 'Morreu', { fontSize: '32px', fill: 'red' });
        

        

        this.botaoRestart();
                
           
            
        
        
            
    }

    if(this.colide=true){
        this.player.setVelocityX(0);
    }

    if (this.wingame!=true){
        
        this.meta.getChildren().forEach(function(meta) {
        meta.x += -5 ;
        
        });
        
    } else {
        
        this.player.setVelocityX(0);
        this.physics.pause();
        this.player.anims.play('turn');
        this.platforms.tilePositionX = 0;
        this.obstacule.getChildren().forEach(function(object) {
        object.x = 0;
        object.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        this.stars.getChildren().forEach(function(star) {
        star.x = 0;
        star.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        this.bombs.getChildren().forEach(function(bomb) {
        bomb.x = 0;
        bomb.disableBody(true, true);
        
        //console.log(obstacule.x );
        });

        this.ufo.getChildren().forEach(function(ufo) {
            ufo.x = 0;
            ufo.disableBody(true, true);
            
            //console.log(obstacule.x );
            });

        this.meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        //meta.disableBody(true, true);
        //console.log(obstacule.x );
        });
        // this.winGameText = this.add.text(56, 56, 'Completed', { fontSize: '32px', fill: '#000' });
        // delay: 2000;
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.scene.start("Level2", {score: this.score});
            },
            loop: true
        })
        
        this.run.stop();
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
    
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.setVelocityY(-1500);
        //player.setBounce(0.2);
        
    } 
    
    if (this.cursors.up.isDown && !this.player.body.onFloor())
    {
        this.player.setVelocityY(-500);
        //player.setBounce(0.2);
        
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
            //console.log(obstacule.x)
            if (obstacule.x<45){
                obstacule.disableBody(true, true);
            }
            
        }

        collisionMeta (platforms, meta)
        {
            console.log("Meta");
            meta.body.setCollideWorldBounds(true);
            
            
        }

//  collisionPlatStar (platforms, stars)
// {
//     console.log("pimba");
//     this.stars.body.setCollideWorldBounds(true);
//     //console.log(obstacule.x)     

//     if (this.stars.y > 50)
//             {
//                 this.stars.disableBody(true, true);
                

//     }
    
// }

            collectStar (player, stars)
        {
            stars.disableBody(true, true);

            //  Add and update the score
            this.score += 10;
            console.log(this.score);
            this.star.play();
            this.scoreText.setText('Score: ' + this.score);

            
            
         }

          hitBomb (player, bomb)
        {
            this.dead.play();
            this.time.addEvent({
                delay: 2000,
                callback: this.gameover.play(),
                loop: true
            });
            
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');

            this.gameOver = true;
        }

        addObject() {
        
        var object = this.physics.add.sprite(800, 600, 'object');
              
        this.obstacule.add(object);
        object.setScale(0.1);  

        //this.obstacule.body.setCollideWorldBounds(true);
        
        }

        addFinishLine() {
            
            console.log("Meta");
            this.metaExists=true;
            var finishline = this.physics.add.sprite(770, 600, 'finishline');
            finishline.setScale(0.2);
            this.meta.add(finishline);
            this.meta.body.setCollideWorldBounds(true);
            }

        addStar() {
            console.log("Estrela a cair");
            var star = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'star');
            this.stars.add(star);
            this.stars.body.setCollideWorldBounds(true);
            
            }

         addBomb() {
        console.log("Bomba a cair");
        var bomb = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'bomb');
        this.bombs.add(bomb);
        this.bombs.body.setCollideWorldBounds(true);
        
        }

        addUfo() {
        console.log("Ufo");
        var ufo = this.physics.add.sprite(800,Phaser.Math.Between(30, 500), 'ufo');
        ufo.body.setCollideWorldBounds(false);
        ufo.body.setAllowGravity(false);
        this.ufo.body.setImmovable(true);
        this.ufo.add(ufo);
        ufo.setScale(0.1);
        }
        
        hitUfo (player, ufo)
        {
            this.dead.play();
            this.time.addEvent({
                delay: 2000,
                callback: this.gameover.play(),
                loop: false
            });
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');

            this.gameOver = true;
        }

        hitFire (player, fire)
        {
            this.dead.play();
            this.time.addEvent({
                delay: 2000,
                callback: this.gameover.play(),
                loop: false
            });
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');

            this.gameOver = true;
        }
        
         

        resetLevel(){
            this.gameOver = 0;
            this.scene.start("bootgame");
        }

        botaoRestart(){
            //Botao restart
            const restartBtn = this.add.image(400, 300, 'restartBtn')
            .setScale(0.1)
            restartBtn.setInteractive();

            restartBtn.on('pointerdown', () => {
                restartBtn.setTint(0xff00ff);
                this.scene.start("Level1");
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
            .on('pointerdown', () => this.scene.start("Level1"));

        }

        

}

export default Level1;
