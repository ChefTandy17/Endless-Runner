//Hazard prefab
class Hazard extends Phaser.GameObjects.Sprite{
    constructor(scene, y, texture, frame){
        //used paddle example from lecture to set up scenes, body, and others variables.
        super(scene, x, y, texture, frame)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVelocityX(hazardSpeed)
        this.body.setSize(64, 32)
        this.body.setOffset(0, 32)
        this.body.setImmovable(true)
    }
}