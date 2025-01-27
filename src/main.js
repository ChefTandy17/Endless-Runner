//Name: Tyvin Tandy
//Title: Endless Runner Name Placeholder
//Approx Hours: 0 hour(s)
//Creative Tilt: There is nothing program interesting... yet.
//There is nothing visually interesting... yet

// main game object for Phaser
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 500,
    render: {               // This is for pixel art to make it crispy clean
        pixelArt: true 
    },
    physics: {
        default: 'endless-runner',
        arcade: {                  
            debug: true             
        },
    },
    scene: [Movement]
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

let keyLeft, keyRight, keyW, keyS, keyR, keySpace