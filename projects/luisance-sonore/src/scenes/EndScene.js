import {Scene} from 'phaser'

import {Player} from '../characters/Player'

import loop2 from '../assets/audios/loop2.wav'

import level2 from '../assets/luisance-map/level2.json'

export class EndScene extends Scene {
    constructor() {
        super("scene-end")
    }

    preload(){
        this.load.audio('loop2', loop2)
        this.load.tilemapTiledJSON('level2', level2)
    }

    create() {
        this.add.text(100, 100, 'You won', { fontSize: '64px', fill: '#fff' })
        this.add.text(100, 200, 'Press space to restart', { fontSize: '32px', fill: '#fff' })

        this.audio = {
            loop2: this.sound.add('loop2', {loop: true}),
            jumpSound: this.sound.add('jumpSound'),
            dialogSound: this.sound.add('dialogSound'),
            dialogLowSound: this.sound.add('dialogLowSound'),
            walkSound: this.sound.add('walkSound')
          }

        this.audio.loop2.loop = true
        this.audio.loop2.volume = 0.6
        this.audio.loop2.play()

        // Add lvl 2 map
        this.map = this.make.tilemap({ key: 'level2' })
        this.tileset = this.map.addTilesetImage('tileset_final', 'tiles')
        this.layer = this.map.createLayer('world', this.tileset, 0, 0)
        this.layer.setCollisionByExclusion(-1, true)
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

        this.player = this.physics.add.existing(new Player(this, 800, 600, 'dude'))
        this.player.setDepth(2)
        this.physics.add.collider(this.player, this.layer)
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('scene-game')
        })

        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.player.update(this.cursors)

    }
}