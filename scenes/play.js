class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        //behaviors of the hazards
        this.hazards = []
        this.hazardCount = 1 
        this.maxHazards = 5         
        this.hazardSpawnDelay = 5000 
        this.hazardSpeed = 1000
    }

    init() {
        //variable to store 200 in the userSpeed
        this.userSpeed = 200;
    }

    create() {
        //may not be needed, just for safety
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0)
        this.driver = this.physics.add.sprite(game.config.width / 6, game.config.height / 2, 'driver')
        this.hazard = this.load.image('hazard','assets/hazard.png')

        //from lecture
        this.cursors = this.input.keyboard.createCursorKeys()

        //to adjust the hitbox of the driver
        this.driver.body.setCollideWorldBounds(true)
        this.driver.body.setSize(200, 64); // Set the size of the hitbox (width, height)
        this.driver.body.setOffset(40 , 64); // Set the offset of the hitbox (x, y)
        this.driver.body.setCollideWorldBounds(true) //to avoid out of bounds play


        //invisible barriers to create realism of hitting the side of the railings
        let invisibleBarrierTop = this.physics.add.sprite(0, 50).setOrigin(0).setSize(3000, 20).setVisible(false)
        let invisibleBarrierBottom = this.physics.add.sprite(0, 435).setOrigin(0).setSize(3000, 20).setVisible(false)     

        // Add collision detection between driver and invisible barriers
        this.physics.add.collider(this.driver, invisibleBarrierTop)
        this.physics.add.collider(this.driver, invisibleBarrierBottom)

        invisibleBarrierTop.body.setImmovable(true)      
        invisibleBarrierBottom.body.setImmovable(true) 

        this.physics.add.collider(this.driver, this.hazard, this.handleCollision, null, this)

        //background music
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            volume: 0.1,
            loop: true,
        })
        this.backgroundMusic.play()

        //to set up a timer system
        this.p1Timer = 0    

        //scoring system text
        this.increaseTime = 0
        this.timerText = this.add.text(10, 10, 'Time: 0', { 
            fontSize: '32px', 
            fill: '#FFFFFF', 
            backgroundColor: '#808080',
        })

        //scoring system event
        this.time.addEvent({
            delay: 1000,                // 1 second
            callback: this.updateTimer,     //calls updateTimer function
            callbackScope: this,
            loop: true
        })

    /* testing to see if a hazard spawns
        this.time.delayedCall(2500, () => { 
            this.spawnHazard(); 
        });
    */

    //delay timer for new players
    this.time.delayedCall(5000, () => {
        //after that, spawn hazards
        this.time.addEvent({
            delay: this.hazardSpawnDelay,
            callback: this.spawnHazard,
            callbackScope: this,
            loop: true
        })
    }, [], this)
}

    updateTimer() {
        this.increaseTime += 1  //increase by one

        this.timerText.setText('Time: ' + this.increaseTime)    //display on text
    }

    //to spawn hazards around the map
    spawnHazard() {
        //random y positiion from Phaser
        let y = Phaser.Math.Between(60, game.config.height - 100)   //to prevent hazards to spawn somewhere else
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
        hazard.setVelocityX(-this.hazardSpeed)                      //moving from the left
        
        hazard.body.setSize(64, 32)                                 //size of the hitbox
        hazard.body.setOffset(0, 32)                                //offset

        hazard.body.setImmovable(true);

        this.physics.add.collider(this.driver, hazard, this.handleCollision);       //collision detection

    }

    //using AABB (Axis-Aligned Bounding Boxes) collision detection from lecture with modifications
    crashDetection(driver, hazard) {
        if(driver.x < hazard.x + hazard.width &&
               driver.x + driver.width > hazard.x &&
               driver.y < hazard.y + hazard.height &&
               driver.height + driver.y > hazard.y){
                return true
               }
        else{
            return false
        }
    }



    update() {
        //create a series of animations. keys is the name, frames for animation from start to end, frame rate, and repeat.
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('driver', { 
                start: 8, 
                end: 11 
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'driving-down-or-right',
            frames: this.anims.generateFrameNumbers('driver', { 
                start: 4, 
                end: 7 
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'driving-up-or-left',
            frames: this.anims.generateFrameNumbers('driver', { 
                start: 0, 
                end: 3 
            }),
            frameRate: 15,
            repeat: -1
        });

        //from lecture
        let playerVector = new Phaser.Math.Vector2(0, 0)
        playerVector.x -= 0.3           //when no buttons pressed, go back slightly
        let animationKey = 'idle'       //from lecture its playeDirection. animationKey makes sense for me
    
        //when the user presses an input, play an animation and change its vector
        if (this.cursors.left.isDown) {
            playerVector.x -= 1;
            animationKey = 'driving-up-or-left';
        } 

        if (this.cursors.right.isDown) {
            playerVector.x += 1;
            animationKey = 'driving-down-or-right';
        }
    
        //when players press multiple input keys (maybe these need better names for animation keys)
        if (this.cursors.up.isDown) {
            playerVector.y -= 1;
            if (this.cursors.left.isDown) {
                animationKey = 'driving-up-or-left';
            } 
            else if (this.cursors.right.isDown) {
                animationKey = 'driving-up-or-left' 
            } 
            else {
                animationKey = 'driving-up-or-left';
            }
        } 

        if (this.cursors.down.isDown) {
            playerVector.y += 1;
            if (this.cursors.left.isDown) {
                animationKey = 'driving-down-or-right' 
            } 
            else if (this.cursors.right.isDown) {
                animationKey = 'driving-down-or-right';
            } 
            else {
                animationKey = 'driving-down-or-right';
            }
        }

        //if the player wants to restart, they can press R
        //if (this.cursors.down)
    
        //from lecture
        if (playerVector.length() > 0) {
            playerVector.normalize()                        //to normalize the vector when moving diagonal
            playerVector.scale(this.userSpeed)              
            this.driver.anims.play(animationKey, true)      
        } 
        else {
            this.driver.anims.play('idle', true)
        }
    
        //to move the driver
        this.driver.setVelocity(playerVector.x, playerVector.y)
        
        //to move the racetrack, this time much faster
        this.racetrack.tilePositionX += 15

        // Update hazards
        // used lecture example to figure out how to destroy objects
        this.hazards.forEach(hazard => {
            if (hazard.x < -hazard.width) {
                hazard.destroy()
            }
        })

/*

        this.hazards.forEach(hazard => {
            if (this.crashDetection(driver, hazard) == true) {
                hazard.setVelocityX(0)
                driver.setVelocityX(0)
                this.hazardSpeed = 0
                this.userSpeed = 0
            }
        })
*/


/*
        //to game over screen if there is collision detection
        if(this.crashDetection(this.driver, this.hazard)){
            hazard.setVelocityX(0)
            driver.setVelocityX(0)
            this.hazardSpeed = 0
            this.userSpeed = 0
        }

*/
        //from golf ball collison detection lecture with modifications
        //if the player hits a hazard, end game, set those velocities to zero, and stop spritesheet
        this.physics.add.collider(this.hazard, this.driver, (hazard, driver) => {                         
            driver.setVelocity(0,0)
            hazards.setVelocity(0,0)
            this.racetrack.tilePositionx += 0
            //game over text
            this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'YOU CRASHED', titleConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2, '<- for tutorial. -> for credits', tutorialConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 55, 'Spacebar to PLAY!!!', tutorialConfig).setOrigin(0.5)
        })
    }
}
