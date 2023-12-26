import Phaser from "phaser";

export class Base extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        //Center the sprite image in the game
        this.setOrigin(0.5, 0.5);
        //Enable physics for the sprite
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

    }
}