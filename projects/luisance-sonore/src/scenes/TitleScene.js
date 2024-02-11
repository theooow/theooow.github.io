import { Scene } from 'phaser'

import titleScreen from '../assets/images/titlescreen.png'

export class TitleScene extends Scene {

    constructor() {
        super("scene-title")
    }
    
    preload() {
        this.load.image('titleScreen', titleScreen)
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
    }
    
    create() {
        this.add.image(0, 0, 'titleScreen').setOrigin(0, 0)

        const text = this.width > 400 ? 'Click to start' : 'Tap to start'
        const textWidth = this.width / 2 - (text.length * 5)
        const button = this.add.text(textWidth, 450, text, { fill: '#fff' })
            .setInteractive()
            .setOrigin(0.5)
            .setPadding(10)
            .setFontFamily('Blanka')
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setStyle({ backgroundColor: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ backgroundColor: '#111' }))
            .on('pointerdown', () => {
                this.scene.start('scene-boot')
            })
    }
}