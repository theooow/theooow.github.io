import { Base } from './Base';

export class Player extends Base {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.body.setSize(32, 48);
        this.body.setBounce(0.2);
        this.body.setGravityY(300);
        this.body.setDragX(1000);
        this.body.setMaxVelocity(200, 400);

        this.playerSpeed = 400;

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.05, 0, 200)
    }

    update(cursors) {
        // Keyboard controls
        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
            this.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.playerSpeed);
            this.anims.play('right', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('turn');
        }
        if (cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-400);
        }

    }
}