import {Scene} from 'phaser'

import spritesheet from '../assets/images/dude.png'
import spritesheetOld from '../assets/images/old_man.png'
import clockSheet from '../assets/images/clock-sheet.png'

import skyBackground from '../assets/images/sky.png'
import clouds1 from '../assets/images/clouds_1.png'
import rocks from '../assets/images/rocks.png'
import clouds2 from '../assets/images/clouds_2.png'
import ground1 from '../assets/images/ground_1.png'
import ground2 from '../assets/images/ground_2.png'
import ground3 from '../assets/images/ground_3.png'


import tiles from '../assets/images/tileset.png'
import level1 from '../assets/tilemaps/luisance.json'


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
    
    this.load.spritesheet('dude', 
        spritesheet,
        { frameWidth: 32, frameHeight: 48 }
    )

    this.load.spritesheet('oldMan',
        spritesheetOld,
        { frameWidth: 48, frameHeight: 64 }
    )

    this.load.spritesheet('clock',
        clockSheet,
        { frameWidth: 1200, frameHeight: 1200 }
    )
  }

  create() {
    this.scene.start('scene-game')
  }
}