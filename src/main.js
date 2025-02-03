//Name: Tyvin Tandy
//Title: Streamer Driver
//Approx Hours: 12 hour(s)
//Creative Tilt: There is nothing program interesting... yet.
//There is nothing visually interesting... yet

// main game object for Phaser

//Things to do
//Properly transition between Scenes and allow the player to restart w/out having to reload the page (1) //hazard bugs
//Implement proper collision detection (via Arcade Physics or a custom routine) (1)                      //collision, but velocity doesn't stop or is detected
//Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)   //in progress    
//Run without significant crashes or errors (1)                                                         //in progress
//Include in-game credits for all roles, assets, music, etc. (1)                                        //in progress

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
    scene: [Menu, Play, Tutorial, Credits]
};

//set up the game
let game = new Phaser.Game(config);



