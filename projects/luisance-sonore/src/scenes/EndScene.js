import {Scene} from 'phaser'

import {Player} from '../characters/Player'

import { Portal } from '../objects/Portal'

import loop2 from '../assets/audios/loop2.wav'

import space from '../assets/images/space.jpg'

import level2 from '../assets/luisance-map/level2.json'
import { Level2 } from '../levels/Level2'

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

        this.load.image('space', space)
    
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

    handlePointerDown(pointer) {
      // Placer le joystick virtuel sous le point de contact
      this.joyStick.x = pointer.x;
      this.joyStick.y = pointer.y;
      }
  
    handlePointerMove(pointer) {
        // Mettre à jour la position du joystick virtuel pendant le déplacement
        if (this.joyStick && this.joyStick.isDragging) {
            this.joyStick.x = pointer.x;
            this.joyStick.y = pointer.y;
        }
    }

    handlePointerUp(pointer) {
        // Réinitialiser la position du joystick virtuel lorsque le pointeur est libéré
        this.joyStick.x = 100; // Position initiale
        this.joyStick.y = this.cameras.main.height - 100; // Position initiale
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

        
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
          x: 100,
          y: this.cameras.main.height - 100,
          radius: 40,
          base: this.add.circle(0, 0, 40, 0x888888),
          thumb: this.add.circle(0, 0, 18, 0xcccccc),
          // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
          // forceMin: 16,
          // enable: true
        })

        // Activer les événements tactiles ou de souris
        this.input.on('pointerdown', this.handlePointerDown, this);
        this.input.on('pointermove', this.handlePointerMove, this);
        this.input.on('pointerup', this.handlePointerUp, this);

        this.cursorKeys = this.joyStick.createCursorKeys();


        // set z-index
        this.joyStick.base.setDepth(1000)
        this.joyStick.thumb.setDepth(1001)

        this.joyStick.base.setAlpha(0.5)
        this.joyStick.thumb.setAlpha(0.8)

        this.level = new Level2(this)
        // Add lvl 2 map
        this.map = this.make.tilemap({ key: 'level2' })
        this.tileset = this.map.addTilesetImage('tileset_final', 'tiles')
        this.layer = this.map.createLayer('world', this.tileset, 0, 0)
        this.layer.setCollisionByExclusion(-1, true)
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

        this.player = this.physics.add.existing(new Player(this, 600, 600, 'dude', 1))
        this.player.setDepth(2)
        this.physics.add.collider(this.player, this.layer)
    
        this.portal = new Portal(this)
        this.physics.add.collider(this.portal.portal, this.layer)


        // if overlap with portal, go show player dialog
        this.physics.add.overlap(this.player, this.portal.portal, () => {
          this.joyStick.base.destroy()
          this.joyStick.thumb.destroy()
          this.player.anims.play('turn')
          if(!this.player.isTalking)
              this.player.readDialog('end')
            this.player.isTalking = true
        })
        
    }

    update() {
        this.player.update(this.cursorKeys)

    }
}