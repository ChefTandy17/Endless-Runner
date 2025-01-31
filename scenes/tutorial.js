class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {
        //what the text would look like if used
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
        };

        //variable
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0);

        //display directions
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Left, Right, Up, Down keys to move', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 45, 'Avoid hazards on the track', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 45, 'The game ends when you collide with a hazard', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Press Spacebar to Menu', tutorialConfig).setOrigin(0.5);

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