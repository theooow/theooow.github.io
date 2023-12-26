

export class Level1 {
    constructor(scene) {
        this.scene = scene
        this.width = this.scene.sys.scale.gameSize.width
        this.height = this.scene.sys.scale.gameSize.height
        this.tweens = this.scene.tweens

        this.scene.cameras.main.setBounds(0, 0, 10000, this.height)
        this.scene.physics.world.setBounds(0, 0, 10000, this.scene.sys.game.screenBaseSize.height)

        // Si la largeur de l'écran est inférieur à 480px, on ZOOM
        if(window.innerWidth < 480) {
            this.scene.cameras.main.setZoom(Window.innerWidth / 480 * 1.5)
        }

        this.create()
    }

    create() {

        // Add a background image to our scene
        this.sky = this.scene.add.tileSprite(0, 0, this.width, this.height, 'skyBackground')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)

        this.farClouds = this.scene.add.tileSprite(0, 0, this.width, this.height, 'clouds1')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)

        this.clock = this.scene.add.sprite(0, 250, 'clock')
        this.clock.setScale(0.1)


        this.clock.anims.create({
            key: 'clock',
            frames: this.clock.anims.generateFrameNumbers('clock', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        })

        this.clock.anims.create({
            key: 'reverse',
            frames: this.clock.anims.generateFrameNumbers('clock', { start: 19, end: 0 }),
            frameRate: 10,
            repeat: -1
        })

        this.mountainsBack = this.scene.add.tileSprite(0, 0, this.width, this.height, 'rocks')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)
        this.nearClouds = this.scene.add.tileSprite(0, 0, this.width, this.height, 'clouds2')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)
                            
        this.groundBack = this.scene.add.tileSprite(0, 0, this.width, this.height, 'ground1')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)

        this.groundMid = this.scene.add.tileSprite(0, 0, this.width, this.height, 'ground2')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)

        this.groundFront = this.scene.add.tileSprite(0, 0, this.width, this.height, 'ground3')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)

        this.map = this.scene.make.tilemap({ key: 'map' })

        this.tileset = this.map.addTilesetImage('tileset', 'tiles')
        
        this.worldLayer = this.map.createLayer('world', this.tileset, 0, this.height / 4 - 200)
        this.belowLayer = this.map.createLayer('below-player', this.tileset, 0, this.height / 4 - 200)
        this.map.setCollisionBetween(0, 200, true, true, this.worldLayer)


        this.subTitle = this.scene.add.text(this.width / 2, this.height - 50,
                            '(subtiles)', { 
                                backgroundColor: '#000',
                                fill: '#fff',
                                fontFamily: 'Sans Serif',
                                align: 'center',
                                padding: 10,
                                fontSize: 20,
                                wordWrap: { width: window.innerWidth/1.5 - 40, useAdvancedWrap: true }
                            }).setScrollFactor(0).setOrigin(0.5).setAlpha(0)
        this.subTitle.setPosition(this.width / 2, this.height + this.subTitle.displayHeight)
        this.subTitle.setDepth(100)

        this.answerLeft = this.scene.add.text(this.width / 2 - 25, this.height + 50,
                            '(answer left)', { 
                                backgroundColor: '#000',
                                fill: '#fff',
                                fontFamily: 'Sans Serif',
                                align: 'right',
                                padding: 10,
                                fontSize: 20,
                                wordWrap: { width: window.innerWidth - 40, useAdvancedWrap: true }
                            }).setScrollFactor(0).setOrigin(1,1).setAlpha(0)
        this.answerLeft.setInteractive()

        this.answerRight = this.scene.add.text(this.width / 2 + 25, this.height + 50,
                            '(answer right)', { 
                                backgroundColor: '#000',
                                fill: '#fff',
                                fontFamily: 'Sans Serif',
                                align: 'left',
                                padding: 10,
                                fontSize: 20,
                                wordWrap: { width: window.innerWidth - 40, useAdvancedWrap: true }
                            }).setScrollFactor(0).setOrigin(0,1).setAlpha(0)
        this.answerRight.setInteractive()
        this.answerLeft.setDepth(100)
        this.answerRight.setDepth(100)

    }

    showSubtiles(line) {
        return new Promise((resolve, reject) => {
            this.subTitle.setText(line)
            this.subTitle.setAlpha(1)
            this.tweens.add({
                targets: this.subTitle,
                y: this.height - 100,
                alpha: 1,
                duration: 1000,
                hold: line.length * 35,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    resolve()
                }
            })
        })
    }

    showQuestion(line, answers, npc) {
        return new Promise((resolve, reject) => {
            this.subTitle.setText(line)
            this.answerRight.setText(answers.right.text)
            this.answerLeft.setText(answers.left.text)

            this.answerLeft.off('pointerdown');
            this.answerRight.off('pointerdown');

            if(typeof answers.left.callback !== 'undefined') {
                this.answerLeft.on('pointerdown', answers.left.callback)
            }else{
                this.answerLeft.on('pointerdown', async () => {
                    await this.hideAnswers()
                    npc.readDialog(answers.left.linksTo)
                })
            }

            if(typeof answers.right.callback !== 'undefined') {
                this.answerRight.on('pointerdown', answers.right.callback)
            }else{
                this.answerRight.on('pointerdown', async () => {
                    await this.hideAnswers()
                    npc.readDialog(answers.right.linksTo)
                })
            }

            this.tweens.add({
                targets: this.subTitle,
                y: this.height - 120,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                }
            })
            
            this.tweens.add({
                targets: this.answerLeft,
                y: this.height - 50,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                }
            })

            this.tweens.add({
                targets: this.answerRight,
                y: this.height - 50,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                }
            })
        })
    }

    hideAnswers() {
        return new Promise((resolve, reject) => {

            this.tweens.add({
                targets: [this.answerLeft, this.answerRight],
                y: this.height + 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            })
            this.tweens.add({
                targets: this.subTitle,
                y: this.height + 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    resolve()
                }
            })
        })
    }


    update() {
        this.sky.tilePositionX = this.scene.cameras.main.scrollX * .1
        this.farClouds.tilePositionX = this.scene.cameras.main.scrollX * .2
        this.mountainsBack.tilePositionX = this.scene.cameras.main.scrollX * .4
        this.nearClouds.tilePositionX = this.scene.cameras.main.scrollX * .6
        this.groundBack.tilePositionX = this.scene.cameras.main.scrollX * .8
        this.groundMid.tilePositionX = this.scene.cameras.main.scrollX * .9
        this.groundFront.tilePositionX = this.scene.cameras.main.scrollX

        // The clock is always in the same position
        this.clock.x = this.scene.cameras.main.scrollX + this.width / 2

        // If the player go right, clock animation start, else if the player go left, clock animation reverse
        // else the clock animation stop and memory the last frame
        if(this.scene.player.body.blocked.right || this.scene.player.body.blocked.left) {
            this.clock.anims.pause()
        } else{
            if (this.scene.player.body.velocity.x > 0 ) {
                this.clock.anims.play('clock', true)
            } else if (this.scene.player.body.velocity.x < 0) {
                this.clock.anims.play('reverse', true)
            } else {
                this.clock.anims.pause()
            }
        }
    }
} 