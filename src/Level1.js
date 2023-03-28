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

    var player;
    var object;
    var bombs;
    var bomb;
    var star;
    var stars;
    var bullets;
    var bullet;
    var obstacule;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;
    var gameOverText;
    var obstaclesGroup;
    var meta;
    var wingame = false;
    var winGameText;


    console.log("Estamos no level 1");

    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    const { height, width } = this.sys.game.config;
    this.gameSpeed = 5;
    platforms = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1);
    
    this.physics.add.existing(platforms);

    // set the TileSprite's physics properties
    platforms.body.setCollideWorldBounds(true);
    platforms.body.setBounce(0);
    //platforms.body.setVelocity(200, 200);

    //add variables to functions 
    obstacule = this.add.group();

    meta = this.add.group();

    stars = this.add.group();

    bombs = this.add.group();

    this.scene.time.addEvent({
    delay: 2000, //Phaser.Math.Between(100, 2000),
    callback: addObject, 
    callbackScope: this,
    loop: true
    });

    this.time.addEvent({
    delay: 9000, //Phaser.Math.Between(100, 2000),
    callback: addFinishLine, 
    callbackScope: this,
    loop: false
    });

    this.time.addEvent({
    delay: 1000, //Phaser.Math.Between(100, 2000),
    callback: addStar, 
    callbackScope: this,
    loop: true
    });


    this.time.addEvent({
    delay: 2000, //Phaser.Math.Between(100, 2000),
    callback: addBomb,
    callbackScope: this,
    loop: true
    });


    this.physics.add.existing(obstacule);
    obstacule.body.setBounce(1);
    this.physics.add.existing(meta);
    this.physics.add.existing(stars);
    this.physics.add.existing(bombs);
   

  
    // var objectGroup = this.add.group();

    // var stars = this.physics.add.sprite(Phaser.Math.Between(50, 600),Phaser.Math.Between(50, 600), 'star');
    // objectGroup.add(stars);
    
    // var randomObject = Phaser.Utils.Array.GetRandom(objectGroup.getChildren());
    // randomObject.setVisible(true);

   

    

    
    
    player = this.physics.add.sprite(0, height, 'dude')
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


   

    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    

    
    this.physics.add.collider(platforms, obstacule, collisionPlat, null, this);
    this.physics.add.collider(platforms, meta, collisionMeta, null, this);
    this.physics.add.collider(platforms, stars, collisionPlatStar, null, this);
    this.physics.add.collider(player, obstacule, collideOn, null, this);
    this.physics.add.collider(player, meta, collideMeta, null, this);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, bombs, hitBomb, null, this);
    //this.physics.add.collider(stars, platforms);
    

  }

  update() {

    if (cursors.space.isDown )
    {
        gameOverText = this.add.text(56, 56, 'SuperHomem', { fontSize: '32px', fill: '#000' });
    } else if (cursors.space.isUp ) {
        //scoreText = 0;
    }
     

    if (gameOver!=true)
    {
        player.setVelocityX(5);

        player.anims.play('right', true);
        platforms.tilePositionX += this.gameSpeed;
        obstacule.getChildren().forEach(function(object) {
        object.x += -5;
        //console.log(obstacule.x );
        });
        
    } else {
        
        player.setVelocityX(0);
        this.physics.pause();
        player.anims.play('turn');
        platforms.tilePositionX = 0;
        obstacule.getChildren().forEach(function(object) {
        object.x = 0;
        object.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        stars.getChildren().forEach(function(star) {
        star.x = 0;
        star.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        bombs.getChildren().forEach(function(bomb) {
        bomb.x = 0;
        bomb.disableBody(true, true);
        
        //console.log(obstacule.x );
        });

        meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        meta.disableBody(true, true);
        //console.log(obstacule.x );
        });

        gameOverText = this.add.text(56, 56, 'Morreu', { fontSize: '32px', fill: '#000' });
    }

    if (wingame!=true){
        
        meta.getChildren().forEach(function(meta) {
        meta.x += -5;
        //console.log(obstacule.x );
        });
    } else {
        player.setVelocityX(0);
        this.physics.pause();
        player.anims.play('turn');
        platforms.tilePositionX = 0;
        obstacule.getChildren().forEach(function(object) {
        object.x = 0;
        object.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        stars.getChildren().forEach(function(star) {
        star.x = 0;
        star.disableBody(true, true);
        
        //console.log(obstacule.x );
        });
        bombs.getChildren().forEach(function(bomb) {
        bomb.x = 0;
        bomb.disableBody(true, true);
        
        //console.log(obstacule.x );
        });

        meta.getChildren().forEach(function(meta) {
        meta.x += 0;
        //meta.disableBody(true, true);
        //console.log(obstacule.x );
        });
        winGameText = this.add.text(56, 56, 'Completed', { fontSize: '32px', fill: '#000' });
    }
   

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } 
    
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.setVelocityY(-1500);
        //player.setBounce(0.2);
        
    } 
    



  }

   collideOn (player, obstacule)
{
    if (cursors.space.isUp )
    {
        obstacule.disableBody(true, true);
        //this.physics.add.collider(player, obstacule, collideOff, null, this);
        console.log("A pressed");
        
        
    } else {
        
    
        this.physics.pause();
        console.log("morreu");
        gameOverText = this.add.text(56, 56, 'Morreu', { fontSize: '32px', fill: '#000' });
        //obstacule.disableBody(true, true);
        player.anims.play('turn');
        gameOver = true;
    
    }
}

// function collideOff (player, obstacule)
// {
    
//         //this.physics.pause();
//         console.log("superhomem");
       
//         //obstacule.disableBody(true, true);
//         //player.anims.play('turn');
//         gameOver = false;
    
    
// }

 collideMeta (player, meta)
{
    
        wingame=true;
        
    
    
}

 collisionPlat (platforms, obstacule)
{
    console.log("pimba");
    obstacule.body.setCollideWorldBounds(true);
    //console.log(obstacule.x)
    if (obstacule.x<50){
        obstacule.disableBody(true, true);
    }
    
}

 collisionMeta (platforms, meta)
{
    console.log("Meta");
    meta.body.setCollideWorldBounds(true);
    //console.log(obstacule.x)
    // if (meta.x<50){
    //     meta.disableBody(true, true);
    // }
    
}

 collisionPlatStar (platforms, stars)
{
    console.log("pimba");
    obstacule.body.setCollideWorldBounds(true);
    //console.log(obstacule.x)     

    if (stars.y > 50)
            {
                stars.disableBody(true, true);
                // console.log("passou o fundo");
                
                //  var objectGroup = this.add.group();
                //  var stars = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'star');
                //  objectGroup.add(stars);
                //  var randomObject = Phaser.Utils.Array.GetRandom(objectGroup.getChildren());
                //  randomObject.setVisible(true);    

    }
    
}

     addObject() {
        
    var object = this.physics.add.sprite(800, 600, 'object');
    obstacule.add(object);
    obstacule.body.setCollideWorldBounds(true);
    }

     addFinishLine() {
        
        console.log("Meta");
        var finishline = this.physics.add.sprite(770, 600, 'finishline');
        meta.add(finishline);
        meta.body.setCollideWorldBounds(true);
        }

     addStar() {
        console.log("Estrela a cair");
        var star = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'star');
        stars.add(star);
        stars.body.setCollideWorldBounds(false);
        
        }

         addBomb() {
        console.log("Bomba a cair");
        var bomb = this.physics.add.sprite(Phaser.Math.Between(50, 500),0, 'bomb');
        bombs.add(bomb);
        bombs.body.setCollideWorldBounds(false);
        
        }
    
        
         collectStar (player, stars)
        {
            stars.disableBody(true, true);

            //  Add and update the score
            score += 10;
            console.log(score);
            scoreText.setText('Score: ' + score);

            
            
         }

          hitBomb (player, bomb)
        {
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            gameOver = true;
        }

}

export default Level1;
