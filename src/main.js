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
    render: {
        pixelArt: true 
    },
    physics: {
        default: 'arcade',
        arcade: {                  
            debug: true             
        },
    },
    scene: [Menu, Play]
};

//set up the game
let game = new Phaser.Game(config);

//placeholder if needed
let cursors
let { height, width } = game.config;
