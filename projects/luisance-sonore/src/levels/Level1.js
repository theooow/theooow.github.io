

export class Level1 {
    constructor(scene) {
        this.scene = scene
        this.width = this.scene.sys.scale.gameSize.width
        this.height = this.scene.sys.scale.gameSize.height
        this.tweens = this.scene.tweens

        this.scene.cameras.main.setBounds(0, 0, 10000, this.height)
        this.scene.physics.world.setBounds(0, 0, 10000, this.scene.sys.game.screenBaseSize.height)

        this.create()
    }

    create() {

        // Add a background image to our scene
        this.sky = this.scene.add.tileSprite(0, 0, this.width, this.height, 'skyBackground')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)
        this.scene.clock.createClock()

        this.farClouds = this.scene.add.tileSprite(0, 0, this.width, this.height, 'clouds1')
                            .setOrigin(0, 0)
                            .setScrollFactor(0)


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

        this.input = this.scene.input

        this.dialogPositionX = this.width / 2
        this.dialogPositionY = this.height - 200

        this.subTitle = this.scene.add.text(this.dialogPositionX, this.dialogPositionY,
                            '(subtiles)', { 
                                fill: '#fff',
                                fontFamily: 'Sans Serif',
                                align: 'center',
                                padding: 50,
                                fontSize: 20,
                                wordWrap: { width: window.innerWidth/1.5 - 40, useAdvancedWrap: true }
                            }).setScrollFactor(0).setOrigin(0.5, 1).setAlpha(0)

        this.subTitle.setDepth(100)

        // Dessiner le contour autour du rectangle principal
        this.stroke = this.scene.add.graphics()
        this.stroke.lineStyle(5, 0xFFFFFF, 0.6); // Largeur, couleur et opacité du contour
        this.stroke.strokeRoundedRect(this.dialogPositionX - this.subTitle.width / 2 - 5, this.dialogPositionY - this.subTitle.height - 5, this.subTitle.width + 10, this.subTitle.height + 10, 20); // Dessiner le contour
        this.stroke.setAlpha(0)
        this.stroke.setScrollFactor(0)
        this.stroke.setDepth(99)
        // Créer un rectangle arrondi en arrière-plan
        this.graphics = this.scene.add.graphics()
        this.graphics.fillStyle(0x000000, 0.6) // Couleur du rectangle avec une opacité de 0.7
        this.graphics.fillRoundedRect(this.dialogPositionX - this.subTitle.width / 2, this.dialogPositionY - this.subTitle.height, this.subTitle.width, this.subTitle.height, 20)
        this.graphics.setAlpha(0)
        this.graphics.setScrollFactor(0)
        this.graphics.setDepth(99)

        this.answerLeft = this.scene.add.text(this.width / 2 - 25, this.height + 50,
                            '(answer left)', { 
                                backgroundColor: '#000',
                                fill: '#fff',
                                fontFamily: 'Sans Serif',
                                align: 'right',
                                padding: 20,
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
                                padding: 20,
                                fontSize: 20,
                                wordWrap: { width: window.innerWidth - 40, useAdvancedWrap: true }
                            }).setScrollFactor(0).setOrigin(0,1).setAlpha(0)
        this.answerRight.setInteractive()
        this.answerLeft.setDepth(100)
        this.answerRight.setDepth(100)

    }

    showSubtiles(line) {
        let clicked = false
        return new Promise((resolve, reject) => {
            this.subTitle.setText(line)
            this.subTitle.setAlpha(0)
            this.stroke.setAlpha(0)
            this.graphics.setAlpha(0)
            // Mettre à jour la largeur du rectangle en fonction de la largeur du texte mis à jour
            const newWidth = this.subTitle.width + 100; // Ajouter un padding supplémentaire pour le rectangle
            const newHeight = this.subTitle.height; // Ajouter un padding supplémentaire pour le rectangle
            
            // Mettre à jour les dimensions et la position du rectangle
            this.graphics.clear(); 
            this.graphics.fillStyle(0x000000, 0.8);
            this.graphics.fillRoundedRect(this.dialogPositionX - newWidth / 2, this.dialogPositionY - newHeight, newWidth, newHeight, 20);
            this.stroke.clear();
            this.stroke.lineStyle(3, 0xFFFFFF, 1);
            this.stroke.strokeRoundedRect(this.dialogPositionX - newWidth / 2 - 3, this.dialogPositionY - newHeight - 3, newWidth + 5, newHeight + 5, 20);
            
            this.tweens.add({
                targets: this.graphics,
                alpha: 1,
                duration: 500,
                hold: line.length * 40,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    if(!clicked)
                        resolve()
                }
            })
            this.tweens.add({
                targets: this.stroke,
                alpha: 1,
                duration: 500,
                hold: line.length * 40,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    if(!clicked)
                        resolve()
                }
            })
            this.tweens.add({
                targets: this.subTitle,
                alpha: 1,
                duration: 500,
                hold: line.length * 40,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    if(!clicked)
                        resolve()
                }
            })

            const clickHandler = () => {
                clicked = true;
                // Votre code pour passer rapidement à l'encart de dialogue suivant
                // Par exemple, résoudre la promesse immédiatement pour passer à la suite
                resolve();
    
                // Désactiver l'écouteur de clic une fois que l'utilisateur a cliqué pour passer
                this.input.off('pointerdown', clickHandler);
            };
            
            this.input.on('pointerdown', clickHandler);
        })
    }

    showQuestion(line, answers, npc) {
        return new Promise((resolve, reject) => {
            this.subTitle.setText(line);
            this.answerRight.setText(answers.right.text);
            this.answerLeft.setText(answers.left.text);
    
            this.answerLeft.off('pointerdown');
            this.answerRight.off('pointerdown');
    
            if (typeof answers.left.callback !== 'undefined') {
                this.answerLeft.on('pointerdown', answers.left.callback);
            } else {
                this.answerLeft.on('pointerdown', async () => {
                    await this.hideAnswers();
                    npc.readDialog(answers.left.linksTo);
                });
            }
    
            if (typeof answers.right.callback !== 'undefined') {
                this.answerRight.on('pointerdown', answers.right.callback);
            } else {
                this.answerRight.on('pointerdown', async () => {
                    await this.hideAnswers();
                    npc.readDialog(answers.right.linksTo);
                });
            }
    
            this.subTitle.setAlpha(0);
            this.stroke.setAlpha(0);
            this.graphics.setAlpha(0);
    
            // Variables pour garder une référence aux tweens de la question
            let subTitleTween, answerLeftTween, answerRightTween, graphicsTween, strokeTween;
    
            // Tweens pour afficher le dialogue et les réponses
            subTitleTween = this.tweens.add({
                targets: this.subTitle,
                y: this.dialogPositionY,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    resolve();
                }
            });
    
            if(this.answerLeft.text != '') {
                answerLeftTween = this.tweens.add({
                    targets: this.answerLeft,
                    y: this.dialogPositionY + 100,
                    alpha: 0.7,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        resolve();
                    }
                });
            }
            if(this.answerRight.text != '') {
                answerRightTween = this.tweens.add({
                    targets: this.answerRight,
                    y: this.dialogPositionY + 100,
                    alpha: 0.7,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        resolve();
                    }
                });
            }
    
            graphicsTween = this.tweens.add({
                targets: this.graphics,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    resolve();
                }
            });
    
            strokeTween = this.tweens.add({
                targets: this.stroke,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    resolve();
                }
            });
        });
    }
    
    
    hideAnswers() {
        return new Promise((resolve, reject) => {
            this.scene.audio.dialogLowSound.play()
            this.tweens.add({
                targets: [this.answerLeft, this.answerRight],
                y: this.height + 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            })
            this.tweens.add({
                targets: this.subTitle,
                alpha: 0,
                duration: 500,
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

        // If the player go right, clock animation start, else if the player go left, clock animation reverse
        // else the clock animation stop and memory the last frame
        if(!this.scene.player.body.blocked.right && !this.scene.player.body.blocked.left) {
            if (this.scene.player.body.velocity.x == 200) {
                this.scene.clock.updateClock('forward');
            } else if (this.scene.player.body.velocity.x == -200) {
                this.scene.clock.updateClock('backward');
            }
        }
    }
} 