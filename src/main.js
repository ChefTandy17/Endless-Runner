//Name: Tyvin Tandy
//Title: Streamer Driver
//Approx Hours: 25 hour(s)
//Creative Tilt: There is nothing program interesting... yet.
//There is nothing visually interesting... yet

//Sources:
//https://stackoverflow.com/questions/77334253/how-detecting-collisions-in-phaser-js
//https://stackoverflow.com/questions/50988219/pause-and-resume-game-in-phaser-3
//https://www.html5gamedevs.com/topic/35715-resetting-a-scene/
//https://stackoverflow.com/questions/78176549/slightly-darken-when-hovered-in-phaser

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
            debug: false //to set debug mode on or off             
        },
    },
    scene: [Menu, Play, Tutorial, Credits, ]
};

//set up the game
let game = new Phaser.Game(config);



