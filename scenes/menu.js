class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    //to preload assets needed for the main menu scene
    preload() {
        
        //preloading racetrack and hazard images and, driver spritesheet.
        this.load.image('racetrack', 'assets/racetrack.png')
        this.load.image('hazard','assets/hazard.png')
        this.load.spritesheet('driver', 'assets/driver.png',{               //the perfect framewidth and height for the spritesheet
            frameWidth: 256,                                                  
            frameHeight: 128  
        })

        //preloading music, sound effects, and audio to be used in the game
        this.load.audio('backgroundMusic','assets/background.mp3')
        this.load.audio('railingCrash','assets/railingCrash.wav')
        this.load.audio('menuMusic','assets/menu.mp3')
        this.load.audio('hurtAudio','assets/oww.mp3')
    }

    //to create title screen text, background music, and user inputs. 
    create() {

        //creating and playing background music
        this.menuAudio = this.sound.add('menuMusic', {
            volume: 0.1,
            loop: true,
        })
        this.menuAudio.play()                                               //to play the audio 

        //variable when used, set up the looks of the texts
        //this one for title text
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

        //variable when used, set up the looks of the texts
        //this one for tutorial text
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


        //display the title screen text and input keys text.
        this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'Streamer Driver', titleConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2, '<- for tutorial. -> for credits', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 55, 'Spacebar to PLAY!!!', tutorialConfig).setOrigin(0.5)

        //variable to store possible user inputs that players can use in the menu screen that will be used
        // in the update function. Inputs other than these four listed below won't do anything
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.Rkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        //to keep the racetrack image looping, making the image look endless(if the image matches well)
        this.racetrack.tilePositionX += 2;

        //if the user selects these buttons, move to the next scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.menuAudio.pause()
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(this.leftkey)) {
            this.menuAudio.pause()
            this.scene.start('tutorialScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.rightkey)) {
            this.menuAudio.pause()
            this.scene.start('creditsScene')
        }
    }
}