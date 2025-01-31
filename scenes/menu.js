class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    //to preload the assets, racetrack and driver
    preload() {
        this.load.image('racetrack', 'assets/racetrack.png');
        this.load.spritesheet('driver', 'assets/driver.png', {
            frameWidth: 256,    //1024 / 3
            frameHeight: 128    //384 / 4
        })
    }

    create() {
        //create two title configs on what the font, size, colour, etc would look like
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '64px',
            backgroundColor: '#9418C9',
            color: '#9e880d',
            align: 'center',
            padding: {
                top: 15,
                bottom: 15,
            },
            fixedWidth: 0
        }

        let tutorialConfig = {
            fontFamily: 'Impact',
            fontSize: '32px',
            backgroundColor: '#9418C9',
            color: '#9e880d',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }

        //variable to store the sprite racetrack
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0)

        //to display text that will be added in the screen immedietly 
        this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'Streamer Driver', titleConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2, '<- for tutorial. -> for credits', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 55, 'Spacebar to PLAY!!!', tutorialConfig).setOrigin(0.5)

        //variable to store possible user inputs that players can use in the menu screen, to be used in update. other inputs won't do anything
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        //to keep the racetrack image looping and to make the main menu screen a bit cooler
        this.racetrack.tilePositionX += 2;

        //if the user selects these buttons, move to the next scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(this.leftkey)) {
            this.scene.start('tutorialScene');
        }
        //doesn't exist just yet
        /*
        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {
            this.scene.start('creditsScene')
        }
        */
    }
}