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
        this.isClicling = false;
        this.isTalking = false;
        this.swipeDirection = null;

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
        this.scene.input.addPointer(2) 
        // Keyboard controls
        if (cursors.left.isDown || (this.scene.input.activePointer.isDown && this.scene.input.activePointer.downX < this.scene.sys.scale.gameSize.width / 2)) {
            this.body.setVelocityX(-this.playerSpeed);
            this.anims.play('left', true);
        } else if (cursors.right.isDown || (this.scene.input.activePointer.isDown && this.scene.input.activePointer.downX > this.scene.sys.scale.gameSize.width / 2)) {
            this.body.setVelocityX(this.playerSpeed);
            this.anims.play('right', true);
        } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
            this.body.setVelocityX(0);
            this.anims.play('turn');
        }
        if (cursors.up.isDown && this.body.onFloor() || (this.swipeDirection == "up" && this.body.onFloor())) {
            this.body.setVelocityY(-400);
        }

        // Touch controls
        if(!this.scene.input.activePointer.isDown && this.isClicling) {
            if(Math.abs(this.scene.input.activePointer.upY - this.scene.input.activePointer.downY) >= 50) {
                if(this.scene.input.activePointer.upY < this.scene.input.activePointer.downY) {
                    this.swipeDirection = "up";
                }
            }
            this.isClicling = false;
        }else if(this.scene.input.activePointer.isDown && !this.isClicling) {
            this.isClicling = true;
        }

        if(this.swipeDirection == "up" && this.body.onFloor()) {
            this.body.setVelocityY(-400);
            this.swipeDirection = null;
        }

        // Right and left touch controls
        if((!this.scene.input.activePointer.isDown && !cursors.left.isDown && !cursors.right.isDown) || this.isTalking){
            this.body.setVelocityX(0);
            this.anims.play('turn');            
        }
    }
}