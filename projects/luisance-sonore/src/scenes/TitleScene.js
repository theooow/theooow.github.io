import { Scene } from 'phaser'

import titleScreen from '../assets/images/titlescreen.png'
import background from '../assets/images/title.jpg'

import music from '../assets/audios/title.wav'

export class TitleScene extends Scene {

    constructor() {
        super("scene-title")
    }
    
    preload() {
        this.load.image('background', background)
        this.load.image('titleScreen', titleScreen)
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height

        this.load.audio('music', music)

    }
    
    create() {
        this.music = this.sound.add('music', {loop: true})

        this.music.play()
        //this.add.image(0, 0, 'titleScreen').setOrigin(0, 0)
        this.backGround = this.add.image(0,0, 'background')
        this.backGround.displayWidth = window.innerWidth
        this.backGround.setOrigin(0, 0)  


        // mouvement de caméra vers le bas
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        // Set zoom to 1.5
        this.cameras.main.setZoom(2)
        // Set rotation to 0.5
        this.cameras.main.setRotation(0.3)
        
        this.tweens.add({
            targets: this.cameras.main,
            scrollY: window.innerHeight * 1.25,
            duration: 4000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Mouvement de la caméra vers le bas terminé !');
            }
        });

        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1, 
            duration: 2500,
            ease: 'Power2',
            onComplete: () => {
                console.log('Mouvement de la caméra vers le bas terminé !');
            }
        });

        this.tweens.add({
            targets: this.cameras.main,
            rotation: 0,
            duration: 4000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Mouvement de la caméra vers le bas terminé !');
            }
        });


        const text = 'Demarrer le jeu'
        const textWidth = window.innerWidth / 2
        const button = this.add.text(textWidth, 200, text, { fill: '#fff' })
            .setInteractive()
            .setAlpha(0)
            .setScrollFactor(0)
            .setOrigin(0.5)
            .setPadding(20)
            .setFontFamily('Blanka')
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setStyle({ backgroundColor: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ backgroundColor: '#111' }))
            .on('pointerdown', () => {
                this.music.stop()
                this.scene.start('scene-boot')
            })
        
        this.tweens.add({
            targets: button,
            alpha: 1,
            delay: 3400,
            duration: 1000,
            ease: 'Power2',
        })

        this.tweens.add({
            targets: button,
            y: 260,
            delay: 3400,
            duration: 2000,
            ease: 'Power2',
        })
    }
}