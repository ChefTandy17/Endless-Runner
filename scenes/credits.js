class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        //what the text would look like if used
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

        //variable
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0);

        //display directions
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Sea Breeze by Audiogreen', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 45, 'Go Kart Racing by freesound_community', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 45, 'All sprites were made by me using PixelArt and Piskel', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Go Kart railing collision made using jsfxr', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 145, 'Short Oww by freesound_community', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 190, 'Press SPACE key to Menu', creditsConfig).setOrigin(0.5)

        //can only use space input on this scene
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //to keep the racetrack image endless-like
        this.racetrack.tilePositionX += 2;

        //back to the main menu scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('menuScene');
        }
    }
}