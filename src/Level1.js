class Level1 extends Phaser.Scene {

  constructor() {
    super('Level1');
    
  }
  

  preload() {
    this.load.image('sky', 'assets/sky2.png');
    this.load.image('ground', 'assets/ground3.png');
    this.load.image('object', 'assets/obstacule3.png');
    this.load.image('finishline', 'assets/finishline.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  

  create() {
    
    // var player;
    // var object;
    // var bombs;
    // var bomb;
    // var star;
    // var stars;
    // var bullets;
    // var bullet;
    // var obstacule;
    // var platforms;
    
     var score = 0;
    // var gameOver = false;
    // var scoreText;
    // var gameOverText;
    // var obstaclesGroup;
    // var meta;
    // var wingame = false;
    // var winGameText;


    console.log("Estamos no level 1");

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

    this.time.addEvent({
    delay: 2000, //Phaser.Math.Between(100, 2000),
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
    delay: 1000, //Phaser.Math.Between(100, 2000),
    callback: this.addStar, 
    callbackScope: this,
    loop: true
    });


    this.time.addEvent({
    delay: 2000, //Phaser.Math.Between(100, 2000),
    callback: this.addBomb,
    callbackScope: this,
    loop: true
    });


    this.physics.add.existing(this.obstacule);
    //this.obstacule.body.setBounce(1);
    this.physics.add.existing(this.meta);
    this.physics.add.existing(this.stars);
    this.physics.add.existing(this.bombs);

    
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

    this.anims.create({
        key: 'space',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    
    this.cursors = this.input.keyboard.createCursorKeys();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(this.platforms, this.obstacule, this.collisionPlat, null, this);
    this.physics.add.collider(this.platforms, this.meta, this.collisionMeta, null, this);
    //this.physics.add.collider(this.platforms, this.stars, this.collisionPlatStar, null, this);
    this.physics.add.collider(this.player, this.obstacule);
    this.physics.add.collider(this.player, this.meta, this.collideMeta, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
    //this.physics.add.collider(stars, platforms);
    

  }

  update() {

    
    
    if (this.cursors.space.isDown )
    {
        this.obstacule.getChildren().forEach(function(obstacule) {
            //obstacule.x = 0;
            console.log("disable obstcule");
            obstacule.disableBody(true, true);
        })
        this.bombs.getChildren().forEach(function(bomb) {
            //bomb.x = 0;
            console.log("disable bomb");
            bomb.disableBody(true, true);
        })
        this.player.setGravityY(3000);
        this.player.anims.play('space', true);
        //this.gameOver=0;
        
        //this.physics.add.collider(player, obstacule, collideOff, null, this);
        console.log("Space pressed");
        this.gameOverText = this.add.text(56, 56, 'SuperHomem', { fontSize: '32px', fill: '#000' });
    } else if (this.cursors.space.isUp ) {
        //this.gameOverText = this.add.text(56, 56, 'SuperHomem', { fontSize: '32px', fill: '#000' });
    }
     

    if (this.gameOver!=true)
    {
        this.player.setVelocityX(5);
        
        this.player.anims.play('right', true);
        this.platforms.tilePositionX += this.gameSpeed;
        
        this.obstacule.getChildren().forEach(function(object) {
        object.x += -5;
        
        //console.log(obstacule.x );
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

        this.meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        meta.disableBody(true, true);
        //console.log(obstacule.x );
        });

        this.gameOverText = this.add.text(56, 56, 'Morreu', { fontSize: '32px', fill: '#000' });
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

        this.meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        //meta.disableBody(true, true);
        //console.log(obstacule.x );
        });
        this.winGameText = this.add.text(56, 56, 'Completed', { fontSize: '32px', fill: '#000' });
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
    
    



  }

   

 collideMeta (player, meta)
{
    
    this.wingame=true;
        
    
    
}

 collisionPlat (platforms, obstacule)
{
    console.log("pimba");
    obstacule.body.setCollideWorldBounds(true);
    //console.log(obstacule.x)
    if (obstacule.x<25){
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

     addObject() {
        
    var object = this.physics.add.sprite(800, 600, 'object');
    this.obstacule.add(object);
    this.obstacule.body.setCollideWorldBounds(true);
    
    }

     addFinishLine() {
        
        console.log("Meta");
        var finishline = this.physics.add.sprite(770, 600, 'finishline');
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
    
        
         collectStar (player, stars)
        {
            stars.disableBody(true, true);

            //  Add and update the score
            this.score += 10;
            console.log(this.score);
            this.scoreText.setText('Score: ' + this.score);

            
            
         }

          hitBomb (player, bomb)
        {
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');

            this.gameOver = true;
        }

}

export default Level1;
