class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.userSpeed = 200 // Set user movement speed
    }

    create() {
        // Create the racetrack tile sprite
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0)
        
        // Create the driver sprite
        this.driver = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'driver')
        
        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys()

        // To avoid moving out of border
        this.driver.body.setCollideWorldBounds(true)
    }

    update() {
        //creating user movement
        if (this.cursors.left.isDown) {
            this.driver.setVelocityX(-this.userSpeed)
        } 
        else if (this.cursors.right.isDown) {
            this.driver.setVelocityX(this.userSpeed)
        } 
        else {
            this.driver.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.driver.setVelocityY(-this.userSpeed)
        } 
        else if (this.cursors.down.isDown) {
            this.driver.setVelocityY(this.userSpeed)
        } 
        else {
            this.driver.setVelocityY(0)
        }

        // Endless scrolling of the racetrack
        this.racetrack.tilePositionX += 15 // Adjust speed as necessary
    }
}