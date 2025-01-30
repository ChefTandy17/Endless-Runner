class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.image('racetrack', 'assets/racetrack.png')
        this.load.image('driver', 'assets/driver.png')
    }

    create() {

        //config of creating the menu
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '64px',
            backgroundColor: '#9418C9',
            color: '#9e880d',
            align: 'center',
            padding: {
              top: 15,
              botton: 15,
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
              botton: 10,
            },
            fixedWidth: 0
          }

        //race track tilesprite
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0);

        //placeholder of the title
        this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'Streamer Driver', titleConfig).setOrigin(0.5)

        //placeholder of tutorial
        this.add.text(game.config.width / 2, game.config.height / 2, '<- for tutorial. -> for credits', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 55, 'Spacebar to PLAY!!!', tutorialConfig).setOrigin(0.5)


        //player inputs
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.upkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.downkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    update() {
        //endless scrolling sprite
        this.racetrack.tilePositionX += 2


        //if the user press spacebar, go to the play scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(this.leftkey)) {
            this.scene.start('tutorialScene')
        }
    }
}