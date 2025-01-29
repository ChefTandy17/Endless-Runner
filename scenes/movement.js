class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.speed = 200 // User movement speed
    }

    preload() {
        this.load.image('driver', 'assets/sprites/driver.png') // Load driver sprite
    }

    create() {
        this.driver = this.physics.add.sprite(400, 300, 'driver') //create driver sprite
        this.cursors = this.input.keyboard.createCursorKeys() //create cursor keys for movement
    }

    update() {
        // Handle user input for movement
        if (this.cursors.left.isDown) {
            this.driver.setVelocityX(-this.speed)
        } 
        else if (this.cursors.right.isDown) {
            this.driver.setVelocityX(this.speed)
        } 
        else {
            this.driver.setVelocityX(0)
        }

        if (this.cursors.up.isDown) {
            this.driver.setVelocityY(-this.speed)
        } 
        else if (this.cursors.down.isDown) {
            this.driver.setVelocityY(this.speed)
        } 
        else {
            this.driver.setVelocityY(0)
        }
    }
}