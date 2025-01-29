class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }
    create() {

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
    //this.add.text(game.config.width / 2, (game.config.height / 2) - 80, 'Streamer Driver', titleConfig).setOrigin(0.5)

    //placeholder of tutorial
    this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Left, Right, Up, Down keys to move', tutorialConfig).setOrigin(0.5)
    this.add.text(game.config.width / 2, game.config.height / 2 - 45, 'Avoid hazards on the track', tutorialConfig).setOrigin(0.5)
    this.add.text(game.config.width / 2, game.config.height / 2 + 45, 'The game ends when you collide with a hazard', tutorialConfig).setOrigin(0.5)
    this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Press Spacebar to Menu ', tutorialConfig).setOrigin(0.5)

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.rightkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        //endless scrolling sprite
        this.racetrack.tilePositionX += 2


        //if the user press spacebar, go to the play scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('menuScene')
        }
    }   




}