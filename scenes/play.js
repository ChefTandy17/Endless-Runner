class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    //to initialize the play.js scene
    init() {
        //variables that holds numbers and holds physics groups
        this.userSpeed = 200
        this.hazardSpeed = 500
        this.hazards = this.physics.add.group()
        this.delayHazard1 = 2200
        this.delayHazard2 = 2400
        this.delayHazard3 = 3000
        this.delayHazard4 = 4700
        this.delayHazard5 = 1100
    }

    create() {

        //to load the racetrack image
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0)

        //to create a driver variable
        this.driver = this.physics.add.sprite(game.config.width / 6, game.config.height / 2, 'driver')
        //to adjust the size hitbox of the driver to make sure it visually appealing when it crashed or collides with an object
        this.driver.body.setSize(200, 40)
        this.driver.body.setOffset(40 , 90)
        //to avoid out of bounds play to stay in the game scene.
        this.driver.body.setCollideWorldBounds(true)
        //layering the driver higher for visual purposes.
        this.driver.setDepth(1)

        //to load the hazard image
        this.load.image('hazard','assets/hazard.png')

        //to create collision detection with the driver and the hazard. if there is a collison,
        //also call the crashDetection function to display additional information, audio, and pausing the game
        this.physics.add.collider(this.driver, this.hazards, this.crashDetection, null, this)

        //since the racetrack have barriers not out of bounds, create two invisible sprites 
        //for visual purposes to make it look like the driver collides with a barrier
        let invisibleBarrierTop = this.physics.add.sprite(0, 55).setOrigin(0).setSize(3000, 20).setVisible(false)
        let invisibleBarrierBottom = this.physics.add.sprite(0, 435).setOrigin(0).setSize(3000, 20).setVisible(false)     
        
        //add collision detection between driver and invisible barriers. additionally, call the 
        //railing crash function to play continuous barrier crashing audio if player still collides with barrier
        this.physics.add.collider(this.driver, invisibleBarrierTop, this.railingCrash, null, this);
        this.physics.add.collider(this.driver, invisibleBarrierBottom, this.railingCrash, null, this)
        //to ensure that when there is a collision of any object it stays put
        invisibleBarrierTop.body.setImmovable(true)      
        invisibleBarrierBottom.body.setImmovable(true) 

        //to create functional arrow input keys.
        this.cursors = this.input.keyboard.createCursorKeys()   //createCursorsKeys is from Phaser, shortcut to create arrow keys functional
        this.Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)            //variable used for reseting the game
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)    //variable used for moving to a different scene

        //to create a background music audio variable
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            volume: 0.1,
            loop: true,
        })
        this.backgroundMusic.play()
        //to create a player hurt audio variable
        this.hurtSound = this.sound.add('hurtAudio', {
            volume: 0.2,
            loop: false,
        })
        //to create a player railing crash audio variable
        this.railingCrashSound = this.sound.add('railingCrash', {
            volume: 0.1,
            loop: false,
        })

        //creating a simple scoring system, which is a timer of how long the driver is surviving the racetrack.
        this.increaseTime = 0                                                               //time variable
        this.timerText = this.add.text(10, 10, 'Time: 0', { 
            fontSize: '32px', 
            fill: '#FFFFFF', 
            backgroundColor: '#808080',
        })

        //scoring system event variable. 
        this.timerEvent = this.time.addEvent({
            delay: 1000,                    //this is to create a timer as a seconds stopwatch
            callback: this.updateTimer,     //calls updateTimer function
            callbackScope: this,
            loop: true,                     //keep looping it
        })

        //spawning hazard event variable
        this.hazardEvent1 = this.time.addEvent({
            delay: this.delayHazard1,       //from init function
            callback: this.spawnHazardLev1, //calls spawnHazardLev1 function
            callbackScope: this,
            loop: true,
            })
        
        //all hazard events serve the same purpose
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

    //when railing crash function is called, play railing crash sound
    railingCrash(driver, barrier){
        if (this.railingCrashSound) {
            this.railingCrashSound.play()
        }
    }

    //when updateTimer function is called, increase the timer and display the text
    updateTimer() {
        this.increaseTime += 1                                  
        this.timerText = this.timerText.setText('Time: ' + this.increaseTime)
        this.timerText.setDepth(4)
    }

    //when the function is called, spawn hazards. Other functions do the same purpose with a different
    //timer and location to spawn a hazard 
    spawnHazardLev1() {
    if (this.increaseTime >= 15) {
        let y = Phaser.Math.Between(60, game.config.height - 100)                       //to prevent hazards to spawn over the barrier
        let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')            //create physics with the sprite   
        this.hazards.add(hazard)                                                        //add the hazard in the map
        hazard.body.setVelocityX(-this.hazardSpeed)                                     //move the hazard left
        //hitbox for the hazards
        hazard.body.setSize(16, 16)                                                 
        hazard.body.setOffset(40, 40)
        hazard.setDepth(0)                                                              //layering for visual purposes
        this.delayHazard = 2500
        }
    }

    spawnHazardLev2(){
        if (this.increaseTime >= 30) {
        let y = Phaser.Math.Between(60, game.config.height - 200)
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
        let y = Phaser.Math.Between(60, game.config.height - 300)
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
        let y = Phaser.Math.Between(60, game.config.height - 400)
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
            let y = Phaser.Math.Between(60, game.config.height - 100)
            let hazard = this.physics.add.sprite(game.config.width, y, 'hazard')
            this.hazards.add(hazard)                                                          
            hazard.body.setVelocityX(-this.hazardSpeed)
            hazard.body.setSize(16, 16)
            hazard.body.setOffset(40, 40)
            hazard.setDepth(0)
        }        
    }

    //when the function is called, do these things to display a game over screen
    crashDetection(driver, hazard) {
        //used to pause the physics
        this.physics.pause()

        //to tint the driver sprite to red, to indicate the driver being hurt
        this.driver.setTint(0xff0000)

        //play driver idle animation
        this.driver.anims.play('idle')
        
        //to stop any background music.
        this.backgroundMusic.stop()

        //to display a game over and restart input screen
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER. Press R to restart or ', {
            fontSize: '64px',
            fill: '#828282',
            backgroundColor: '#5c092d',
        }).setOrigin(0.5)

        //to display a main menu input screen
        this.pressSpaceText = this.add.text(game.config.width / 2, game.config.height / 1.5, 'press SPACE bar to menu', {
            fontSize: '64px',
            fill: '#828282',
            backgroundColor: '#5c092d',
        }).setOrigin(0.5)

        //play a hurt sound, as if the driver got hurt
        this.hurtSound.play()

        //layered to prevent text being blocked by the driver or hazards
        this.gameOverText.setDepth(2)
        this.pressSpaceText.setDepth(3)

        //to stop the events
        this.hazardEvent1.remove()
        this.hazardEvent2.remove()
        this.hazardEvent3.remove()
        this.hazardEvent4.remove()
        this.hazardEvent5.remove()

        //pause the racetrack movement
        this.racetrack.tilePositionX = 0

        //flags to trigger other parts of the code
        this.isItGameOver = true;  

        //pause the timer
        this.timerEvent.paused = true
    }

    update() {

        //create a series of animations for the driver
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

        //Used example lecture notes to create a smooth and constant movement speed
        let playerVector = new Phaser.Math.Vector2(0, 0)
        playerVector.x -= 0.3                                                       //when no buttons pressed, go back slightly
        let animationKey = 'idle'                                                   //from lecture its playeDirection. animationKey makes sense for me
    
        //when the user presses an input, play an animation and change its vector
        if (this.cursors.left.isDown) {
            playerVector.x -= 1;
            animationKey = 'driving-up-or-left';
        } 

        if (this.cursors.right.isDown) {
            playerVector.x += 1;
            animationKey = 'driving-down-or-right';
        }
    
        //when the player press multiple input keys, use an if statements to determine which animation to play
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

        //if the player wants to restart, they can press R anytime, which resets the scene
        if (Phaser.Input.Keyboard.JustDown(this.Rkey)) {
            this.scene.restart()
            this.backgroundMusic.stop()
            this.racetrack.tilePositionX += 15
            this.physics.resume()
            this.isItGameOver = false  
            this.timerEvent.paused = false
        }

        //from lecture to normalize the vectors when moving diagonal and playing animation
        if (playerVector.length() > 0) {
            playerVector.normalize()              
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
            //to change the sprite animation to idle if player using movement keys, for visual purposes
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

        //to move the driver
        this.driver.setVelocity(playerVector.x, playerVector.y)
        
        //to move the racetrack to make it seemingless endless, this time much faster than the other scenes.
        this.racetrack.tilePositionX += 15
    }
}
