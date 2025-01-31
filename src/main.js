//Name: Tyvin Tandy
//Title: Endless Runner Name Placeholder
//Approx Hours: 6 hour(s)
//Creative Tilt: There is nothing program interesting... yet.
//There is nothing visually interesting... yet

// main game object for Phaser

//Things to do
//Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
//Implement proper collision detection (via Arcade Physics or a custom routine) (1)
//Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
//Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
//Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
//Be playable for at least 15 seconds for a new player of low to moderate skill (1)
//Run without significant crashes or errors (1)
//Include in-game credits for all roles, assets, music, etc. (1)

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
    scene: [Menu, Play, Tutorial]
};

//set up the game
let game = new Phaser.Game(config);



