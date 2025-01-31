class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
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

        //to adjust the hitbox
        this.driver.body.setCollideWorldBounds(true)
        this.driver.body.setSize(200, 64); // Set the size of the hitbox (width, height)
        this.driver.body.setOffset(40 , 64); // Set the offset of the hitbox (x, y)

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
        playerVector.x -= 0.3
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
    }
}