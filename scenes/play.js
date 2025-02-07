class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.userSpeed = 200
        this.hazardSpeed = 500
        this.hazards = this.physics.add.group()

        //to create challenges to spawn different hazard intevals
        this.delayHazard1 = 2500
        this.delayHazard2 = 3000
        this.delayHazard3 = 4000
        this.delayHazard4 = 5500
        this.delayHazard5 = 1000
    }

    create() {
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0)
        this.driver = this.physics.add.sprite(game.config.width / 6, game.config.height / 2, 'driver')
        this.load.image('hazard','assets/hazard.png')

        this.physics.add.collider(this.driver, this.hazards, this.crashDetection, null, this);       //collision detection

        this.cursors = this.input.keyboard.createCursorKeys() //from lecture
        this.Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        //to menu scene key
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //to adjust the hitbox of the driver
        this.driver.body.setCollideWorldBounds(true)
        this.driver.body.setSize(200, 40); // Set the size of the hitbox (width, height)
        this.driver.body.setOffset(40 , 90); // Set the offset of the hitbox (x, y)
        this.driver.body.setCollideWorldBounds(true) //to avoid out of bounds play
        this.driver.setDepth(1)

        //invisible barriers to create realism of hitting the side of the railings
        let invisibleBarrierTop = this.physics.add.sprite(0, 55).setOrigin(0).setSize(3000, 20).setVisible(false)
        let invisibleBarrierBottom = this.physics.add.sprite(0, 435).setOrigin(0).setSize(3000, 20).setVisible(false)     

        // Add collision detection between driver and invisible barriers, and play a sound if it does
        this.physics.add.collider(this.driver, invisibleBarrierTop, this.railingCrash, null, this);
        this.physics.add.collider(this.driver, invisibleBarrierBottom, this.railingCrash, null, this);


        invisibleBarrierTop.body.setImmovable(true)      
        invisibleBarrierBottom.body.setImmovable(true) 

        //background music
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            volume: 0.1,
            loop: true,
        })
        this.backgroundMusic.play()

        //player hurts 
        this.hurtSound = this.sound.add('hurtAudio', {
            volume: 0.2,
            loop: false,
        })

        //railing crash
        this.railingCrashSound = this.sound.add('railingCrash', {
            volume: 0.1,
            loop: false,
        })

        /*  //used for go cart noise when driving. was way too buggy.
        this.goKartDriving = this.sound.add('engineDriving', {
            volume: 0.4,
            loop: true,
        })
        */

        //scoring system text
        this.increaseTime = 0           //scoring time
        this.timerText = this.add.text(10, 10, 'Time: 0', { 
            fontSize: '32px', 
            fill: '#FFFFFF', 
            backgroundColor: '#808080',
        })

        //scoring system event
        this.timerEvent = this.time.addEvent({
            delay: 1000,                    // 1 second
            callback: this.updateTimer,     //calls updateTimer function
            callbackScope: this,
            loop: true,
        })

    /* testing to see if a hazard spawns
        this.time.delayedCall(2500, () => { 
            this.spawnHazard(); 
        });
    */
        //spawn hazard based on the delay.
        this.hazardEvent1 = this.time.addEvent({
            delay: this.delayHazard1,
            callback: this.spawnHazardLev1,
            callbackScope: this,
            loop: true,
            })

        this.hazardEvent2 = this.time.addEvent({
            delay: this.delayHazard2,
            callback: this.spawnHazardLev2,
            callbackScope: this,
            loop: true,
            })

        this.hazardEvent3 = this.time.addEvent({
            delay: this.delayHazard3,
            callback: this.spawnHazardLev3,
            callbackScope: this,
            loop: true,
            })

        this.hazardEvent4 = this.time.addEvent({
            delay: this.delayHazard4,
            callback: this.spawnHazardLev4,
            callbackScope: this,
            loop: true,
            })

        this.hazardEvent5 = this.time.addEvent({
            delay: this.delayHazard5,
            callback: this.spawnHazardLev4,
            callbackScope: this,
            loop: true,
            })
    }

    railingCrash(driver, barrier){
        if (this.railingCrashSound) {
            this.railingCrashSound.play()
        }
    }

    updateTimer() {
        this.increaseTime += 1                                  //increase by one second
        this.timerText.setText('Time: ' + this.increaseTime)    //display on text
    }

    spawnHazardLev1() {
    //to delay when hazards would spawn
    if (this.increaseTime >= 15) {
        //random y position from Phaser
        let y = Phaser.Math.Between(60, game.config.height - 100)   //to prevent hazards to spawn somewhere else
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
        this.hazards.add(hazard)                                                          
        hazard.body.setVelocityX(-this.hazardSpeed)
        hazard.body.setSize(16, 16)
        hazard.body.setOffset(40, 40)
        hazard.setDepth(0)
        this.delayHazard = 2500
        }
    }

    spawnHazardLev2(){
        if (this.increaseTime >= 30) {
        let y = Phaser.Math.Between(60, game.config.height - 200)   //to prevent hazards to spawn somewhere else
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
        this.hazards.add(hazard)                                                          
        hazard.body.setVelocityX(-this.hazardSpeed)
        hazard.body.setSize(16, 16)
        hazard.body.setOffset(40, 40)
        hazard.setDepth(0)
        }
    }

    spawnHazardLev3(){
    if (this.increaseTime >= 45) {
        let y = Phaser.Math.Between(60, game.config.height - 300)   //to prevent hazards to spawn somewhere else
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
        this.hazards.add(hazard)                                                          
        hazard.body.setVelocityX(-this.hazardSpeed)
        hazard.body.setSize(16, 16)
        hazard.body.setOffset(40, 40)
        hazard.setDepth(0)
        }  
    }

    spawnHazardLev4(){
    if (this.increaseTime >= 60) {
        let y = Phaser.Math.Between(60, game.config.height - 400)   //to prevent hazards to spawn somewhere else
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
        this.hazards.add(hazard)                                                          
        hazard.body.setVelocityX(-this.hazardSpeed)
        hazard.body.setSize(16, 16)
        hazard.body.setOffset(40, 40)
        hazard.setDepth(0)
        }    
    }
    
    spawnHazardLev5(){
        if (this.increaseTime >= 100) {
            let y = Phaser.Math.Between(60, game.config.height - 200)   //to prevent hazards to spawn somewhere else
            let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
            this.hazards.add(hazard)                                                          
            hazard.body.setVelocityX(-this.hazardSpeed)
            hazard.body.setSize(16, 16)
            hazard.body.setOffset(40, 40)
            hazard.setDepth(0)
        }        
    }


    crashDetection(driver, hazard) {
        this.physics.pause()
        this.driver.setTint(0xff0000)           //in lecture, you can tint a sprite :O
        this.driver.anims.play('idle')
        this.backgroundMusic.stop()

        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER. Press R to restart or ', {
            fontSize: '64px',
            fill: '#828282',
            backgroundColor: '#5c092d',
        }).setOrigin(0.5)

        this.pressSpaceText = this.add.text(game.config.width / 2, game.config.height / 1.5, 'press SPACE bar to menu', {
            fontSize: '64px',
            fill: '#828282',
            backgroundColor: '#5c092d',
        }).setOrigin(0.5)

        this.hurtSound.play()
        this.gameOverText.setDepth(2)
        this.pressSpaceText.setDepth(3)

        this.hazardEvent1.remove()
        this.hazardEvent2.remove()
        this.hazardEvent3.remove()
        this.hazardEvent4.remove()
        this.hazardEvent5.remove()

        this.racetrack.tilePositionX = 0
        this.isItGameOver = true;  
        this.timerEvent.paused = true
    }

/*
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
*/

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
        if (Phaser.Input.Keyboard.JustDown(this.Rkey)) {
            this.scene.restart()
            this.backgroundMusic.stop()
            this.racetrack.tilePositionX += 15
            this.physics.resume()
            //this.backgroundMusic.play();
            this.isItGameOver = false  
            this.timerEvent.paused = false

            /*
            this.driver.setPosition(game.config.width / 6, game.config.height / 2);
            this.increaseTime = 0;
            this.timerText.setText('Time: ' + this.increaseTime)
            */
        }

        //from lecture
        if (playerVector.length() > 0) {
            playerVector.normalize()                        //to normalize the vector when moving diagonal
            playerVector.scale(this.userSpeed)              
            this.driver.anims.play(animationKey, true)      
        } 
        else {
            this.driver.anims.play('idle', true)
        }

        //flag to prevent hazard spawn and to make spacebar input useable
        if (this.isItGameOver){
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.racetrack.tilePositionX += 15
                this.physics.resume()
                this.isItGameOver = false  
                this.timerEvent.paused = false
                this.scene.start('menuScene');
            }
            //to change the sprite animation to idle, even when pressing these input keys
            if (this.cursors.left.isDown) {
                this.driver.anims.play('idle', true)
            } 
    
            if (this.cursors.right.isDown) {
                this.driver.anims.play('idle', true)
            }
            if (this.cursors.up.isDown) {
                if (this.cursors.left.isDown) {
                    this.driver.anims.play('idle', true)
                } 
                else if (this.cursors.right.isDown) {
                    this.driver.anims.play('idle', true)
                } 
                else {
                    this.driver.anims.play('idle', true)
                }
            } 
    
            if (this.cursors.down.isDown) {
                if (this.cursors.left.isDown) {
                    this.driver.anims.play('idle', true)
                } 
                else if (this.cursors.right.isDown) {
                    this.driver.anims.play('idle', true)
                } 
                else {
                    this.driver.anims.play('idle', true)
                }
            }
            return
        }


/*      //testing flag for the spacebar function to work to go back to menu scene
        if (this.isItGameOver = true && this.timerEvent.paused == true){
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.scene.start('menuScene')
            }
        }


        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start('menuScene')
        }

*/

        //to move the driver
        this.driver.setVelocity(playerVector.x, playerVector.y)
        
        //to move the racetrack, this time much faster
        this.racetrack.tilePositionX += 15

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

/*
        //from golf ball collison detection lecture with modifications
        //if the player hits a hazard, end game, set those velocities to zero, and stop spritesheet
        this.physics.add.collider(this.hazard, this.driver, crashDetection(), (hazard, driver) => {                         
            driver.setVelocity(0,0)
            hazards.setVelocity(0,0)
            this.racetrack.tilePositionx += 0
            //game over text
            this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'YOU CRASHED', titleConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2, '<- for tutorial. -> for credits', tutorialConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 55, 'Spacebar to PLAY!!!', tutorialConfig).setOrigin(0.5)
        })
*/
    }
}
