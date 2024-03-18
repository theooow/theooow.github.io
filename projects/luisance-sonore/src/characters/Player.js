import { Base } from './Base';

export class Player extends Base {

    constructor(scene, x, y, texture, level=0) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.body.setSize(150, 250);
        // reduce sprite size
        this.setScale(0.2);
        this.body.setBounce(0.2);
        this.body.setGravityY(300);
        this.body.setDragX(1000);
        this.body.setMaxVelocity(200, 400);

        this.playerSpeed = 400;
        this.isClicling = false;
        this.isTalking = false;
        this.swipeDirection = null;
        this.eventStart = true;

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 5 } ],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 7,
            repeat: -1
        });
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.05, 0, 200)

        this.dialogs = {
            start: {
                question: false,
                say: ["Où suis-je ?.. Ma montre ne fonctionne plus..."]
            },
            end: {
                question: true,
                say: ["Veux-tu franchir la brèche, et cueillir la Luisance Sonore ?"],
                answers: {
                    left: {
                        text: "Oui",
                        callback: () => {
                            window.location.href = "https://www.helloasso.com/associations/association-dupond/evenements/luisance-sonore-episode-iv-la-route-du-temps"
                        }
                    },
                    right: {
                        text: "Non",
                        callback: () => {
                            window.location.href = "https://www.google.com/search?q=comment+revenir+%C3%A0+la+r%C3%A9alit%C3%A9&oq=comment+revenir+%C3%A0+la+r%C3%A9alit%C3%A9&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgATSAQg3MTI5ajBqMagCALACAA&sourceid=chrome&ie=UTF-8";
                        }
                    }
                }
            }
        }
        let loop = 1;
        if(level === 1){
            loop = -1;
        }

        this.preFX.setPadding(32)
        const fx = this.preFX.addGlow();
        this.scene.tweens.add({
            targets: fx,
            outerStrength: 12,
            alpha: 0.6,
            yoyo: true,
            loop: loop,
            duration: 1000,
            ease: 'sine.inout',
            onComplete: () => {
                fx.destroy()
            }
        });
    }

    update(cursors) {
        
        //this.scene.input.addPointer(2) 
        // Keyboard controls
        if ((cursors.left.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) && !this.isTalking) {
            this.body.setVelocityX(-this.playerSpeed)
            this.anims.play('left', true)
        } else if ((cursors.right.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown) && !this.isTalking) {
            this.body.setVelocityX(this.playerSpeed)
            this.anims.play('right', true)
        } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
            
            this.body.setVelocityX(0)
            this.anims.play('turn')
        }
        if (cursors.up.isDown && this.body.onFloor() || ((this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP).isDown ||this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) && this.body.onFloor())) {
            this.scene.audio.jumpSound.play()
            this.body.setVelocityY(-400)
        }

        // If space is pressed, jump too
        // if (cursors.space.isDown && this.body.onFloor()) {
        //     this.scene.audio.jumpSound.play()
        //     this.body.setVelocityY(-400)
        // }

        //If walking, playing sound
        if(this.body.velocity.x != 0 && this.body.onFloor() && !this.isTalking) {
            if(!this.scene.audio.walkSound.isPlaying) {
                this.scene.audio.walkSound.play()
            }
        }else
            this.scene.audio.walkSound.stop()


    }

    async readDialog(key, index = 0){
        const line = this.dialogs[key].say[index]
        this.isTalking = true
        this.scene.audio.dialogSound.play()
        await this.scene.level.showSubtiles(line)
        if(typeof this.dialogs[key].say[index + 1] !== 'undefined'){
            this.readDialog(key, index + 1)
        }
        else if(typeof this.dialogs[key].say[index + 2] === 'undefined' && this.dialogs[key].question){
            const answer = await this.scene.level.showQuestion(line, this.dialogs[key].answers, this)
        }else{
            this.isTalking = false
            this.scene.player.isTalking = false
        }
    }
}