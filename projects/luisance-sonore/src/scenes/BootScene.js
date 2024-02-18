import {Scene} from 'phaser'

import spritesheet from '../assets/images/dude.png'
import spritesheetOld from '../assets/images/mage.png'
import marcelle from '../assets/images/marcelle.png'

import skyBackground from '../assets/images/sky.png'
import clouds1 from '../assets/images/clouds_1.png'
import rocks from '../assets/images/rocks.png'
import clouds2 from '../assets/images/clouds_2.png'
import ground1 from '../assets/images/ground_1.png'
import ground2 from '../assets/images/ground_2.png'
import ground3 from '../assets/images/ground_3.png'


import tiles from '../assets/images/tileset_final.png'
import level1 from '../assets/luisance-map/map-luisance.json'

import sign from '../assets/images/arrow_sign.png'
import door from '../assets/images/anim-porte.png'

import mainTheme from '../assets/audios/main.wav'
import jumpSound from '../assets/audios/Jump.wav'
import dialogSound from '../assets/audios/dialog_high.wav'
import dialogLowSound from '../assets/audios/dialog_low.wav'
import walkSound from '../assets/audios/walk.wav'

export class BootScene extends Scene {

  constructor() {
    super({key: "scene-boot"})
  }
  
  preload() {

    // Load any assets here from your assets directory
    this.load.image('skyBackground', skyBackground)
    this.load.image('clouds1', clouds1)
    this.load.image('rocks', rocks)
    this.load.image('clouds2', clouds2)
    this.load.image('ground1', ground1)
    this.load.image('ground2', ground2)
    this.load.image('ground3', ground3)

    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map', level1)

    this.load.image('sign', sign)
    
    this.load.spritesheet('dude', 
        spritesheet,
        { frameWidth: 250, frameHeight: 250 }
    )

    this.load.spritesheet('oldMan',
        spritesheetOld,
        { frameWidth: 1000, frameHeight: 1000}
    )

    this.load.spritesheet('door',
        door,
        { frameWidth: 600, frameHeight: 600}
    )

    this.load.image('marcelle', marcelle)

    this.load.audio('mainTheme', mainTheme)
    this.load.audio('jumpSound', jumpSound)
    this.load.audio('dialogSound', dialogSound)
    this.load.audio('dialogLowSound', dialogLowSound)
    this.load.audio('walkSound', walkSound)

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

    // Load the next scene
    this.scene.start('scene-game')
  }
}