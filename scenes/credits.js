class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        this.menuAudio = this.sound.add('menuMusic', {
            volume: 0.1,
            loop: true,
        })
        this.menuAudio.play()

        let creditsConfig = {
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
        };

        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0);

        //display credits of the audio, sfx, and background music for the game, and user input which is the space bar in this credits scene
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Sea Breeze by Audiogreen', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 45, 'Rock and Roll by Audiogreen', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'All sprites were made by me using PixelArt and Piskel', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 45, 'Go Kart railing collision made using jsfxr', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Short Oww by freesound_community', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 145, 'Press SPACE key to Menu', creditsConfig).setOrigin(0.5)

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.racetrack.tilePositionX += 2;

        //back to the main menu scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.menuAudio.pause()
            this.scene.start('menuScene');
        }
    }
}