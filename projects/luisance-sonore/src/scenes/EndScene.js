import {Scene} from 'phaser'

import {Player} from '../characters/Player'

import { Portal } from '../objects/Portal'

import loop2 from '../assets/audios/loop2.wav'

import level2 from '../assets/luisance-map/level2.json'

export class EndScene extends Scene {
    constructor() {
        super("scene-end")
    }

    preload(){
        this.load.audio('loop2', loop2)
        this.load.tilemapTiledJSON('level2', level2)

        this.loadingBar = this.add.graphics({fillStyle: {color: 0xffffff}})
        this.load.on('progress', (percent) => {
          this.loadingBar.fillRect(0, this.cameras.main.height / 2, this.cameras.main.width * percent, 50)
        })
    
        this.loadingText = this.make.text({
          x: this.cameras.main.width / 2,
          y: this.cameras.main.height / 2 - 50,
          text: 'Loading...',
          style: {
            font: '20px monospace',
            fill: '#ffffff'
          }
        })
        this.loadingText.setOrigin(0.5, 0.5)

        

    }

    create() {
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
    

        this.portal = new Portal(this)
        this.physics.add.collider(this.portal.portal, this.layer)
        
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.player.update(this.cursors)

    }
}