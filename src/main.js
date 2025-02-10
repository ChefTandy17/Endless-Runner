//Name: Tyvin Tandy
//Title: Streamer Driver
//Approx Hours: 30 hour(s)

//Creative Tilt: 
////[Does your game] do something technically interesting? Are you particularly proud of a programming technique 
//// you implemented? Did you look beyond the class examples and learn how to do something new? (1)

//The thing that makes it technically interesting is that the hazards spawns randomly in play.js. As time progress, more hazards would spawn,
//Hazards are spawn based on a delay system and depending on the timer, more hazards would spawn in the map.

//I feel mostly proud with the credits, menu, and tutorial scenes of the code, since it was more cleaner to see.
//Comparing with the play scene, the code were messy and hopefully I will learn shortcuts and alternatives to make code length shorter 

//Majority of the project used lecture examples to do collision detection and vector movements,  
//and StackOverflow to debug. The setTint and setDepth was an example in which was outside of 
//class examples or not mentioned in lecture.

//
//

////[Does your game] have a great visual style? Does it use music or art that you're particularly proud of? 
//Are you trying something new or clever with the endless runner form? (1)

//The nice visual style is shown for the driver when the player presses the arrow input keys, showing the driver turning its sholder
//on the Play scene with the animation function. The racetrack tilesprite works nicely to make it look like
//an endless racetrack.

//The music and small audio fits well for a racing-like endless runner game, from the background music on the menu and play scene, and colliding with 
//the barrier and hazard. 
//I decided not to have background music when the driver and hazard collides with each other, and just have the driver to say "oww" since
//it fits well for the player to realize they made a mistake when theres no music.

//The art and spritesheets was designed by me that uses simple pixel art. 
// I am proud of how it came out for the gameplay considering I am not a good artist.

//Not much that I would say that it is interesting with the endless runner, as I learned how to
//apply collision, hitboxes, movements of sprites, and sprite visuals for an endless runner from lecture and example code.


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



