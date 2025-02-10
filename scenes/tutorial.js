class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
    }

    create() {
        
        //creating and playing background music
        this.menuAudio = this.sound.add('menuMusic', {
            volume: 0.1,
            loop: true,
        })
        this.menuAudio.play()

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
        };

        //variable to store the sprite racetrack
        this.racetrack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'racetrack').setOrigin(0);

        //display directions and rules text that the player should know.
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Left, Right, Up, Down keys to move. R key to restart', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 45, 'Avoid hazards on the track', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 45, 'The game ends when you collide with a hazard', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Press Spacebar to Menu', tutorialConfig).setOrigin(0.5);

        //variable to store possible user inputs that players can use in the tutorial screen.
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.racetrack.tilePositionX += 2;

        //back to the main menu scene when pressing spacebar button
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.menuAudio.pause()
            this.scene.start('menuScene');
        }
    }
}