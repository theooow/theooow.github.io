import Phaser from "phaser";

export class Door {
    constructor(scene) {
        this.scene = scene;
        this.createDoor();
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    createDoor() {

        this.door = this.scene.add.sprite(4800, 0, 'door');
        this.door.setInteractive();
        this.door.setDepth(1);
        this.door.setScale(0.5);
        this.scene.physics.world.enable(this.door);
        this.door.body.setGravityY(300);
        this.door.body.setImmovable(true);
        this.door.setOrigin(0.5, 0.5);
        this.door.body.setSize(50, 600);


        //Animation
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('door', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        this.door.anims.play('run', true);
        
    }
}
