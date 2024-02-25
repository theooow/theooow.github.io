import Phaser from "phaser";

export class Portal {
    constructor(scene) {
        this.scene = scene;
        this.createPortal();
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    createPortal() {

        this.portal = this.scene.add.sprite(800, 200, 'portal');
        this.portal.setInteractive();
        this.portal.setDepth(1);
        this.portal.setScale(0.5);
        this.scene.physics.world.enable(this.portal);
        this.portal.body.setGravityY(300);
        this.portal.body.setImmovable(true);
        this.portal.setOrigin(0.5, 0.5);
        this.portal.body.setSize(50, 600);


        //Animation
        this.scene.anims.create({
            key: 'portal_animation',
            frames: this.scene.anims.generateFrameNumbers('portal', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.portal.anims.play('portal_animation', true);
        
    }
}
