import {Scene} from 'phaser'

import {Player} from '../characters/Player'

export class EndScene extends Scene {
    constructor() {
        super("scene-end")
    }

    create() {
        this.add.text(100, 100, 'You won', { fontSize: '64px', fill: '#fff' })
        this.add.text(100, 200, 'Press space to restart', { fontSize: '32px', fill: '#fff' })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('scene-game')
        })
    }

    update() {
    }
}