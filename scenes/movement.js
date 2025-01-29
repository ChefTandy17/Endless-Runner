class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.speed = 200 // User movement speed
    }

    preload() {
        this.load.image('driver', 'assets/sprites/driver.png') // Load driver sprite
        this.player.body.setCollideWorldBounds(true)    //to set collides
    }

    create() {
        this.driver = this.physics.add.sprite(400, 300, 'driver') //create driver sprite
        this.cursors = this.input.keyboard.createCursorKeys() //create cursor keys for movement
    }

    update() {
        //this.player.play('walk-down', true)    //use it for testing sprites

        let playerVector = new Phaser.Math.Vector2(0, 0) //creating a new vector with x and y coordinates from Phaser 
        let playerDirection = 'down'

        //if player holds left, the x,y coord is -1,0
        if (cursors.left.isDown) {
            playerVector.x -= 1
            playerDirection = 'left'
        }
        //if player holds right, the x,y coord is 1,0
        else if (cursors.right.isDown) {
            playerVector.x += 1
            playerDirection = 'right'
        }

        //if player holds up, the x,y coord is 0,-1
        if (cursors.up.isDown) {
            playerVector.y -= 1
            playerDirection = 'up'
        }
        //if player holds down, the x,y coord is 0,1
        else if (cursors.down.isDown) {
            playerVector.y += 1
            playerDirection = 'down'
        }

        //the key to make it work. Normalize the vector  
        playerVector.normalize();
    }
}
