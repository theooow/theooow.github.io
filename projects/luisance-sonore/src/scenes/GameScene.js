import {Scene} from 'phaser'

import {Player} from '../characters/Player'
import {Level1} from '../levels/Level1'

import { OldNPC } from '../characters/OldNPC'

export class GameScene extends Scene {

  constructor() {
    super("scene-game")
  }

  create() {

    this.player = this.physics.add.existing(new Player(this, 100, 0, 'dude'))
    this.player.setDepth(1)
    
    this.oldMan = this.physics.add.existing(new OldNPC(this, 500, 0, 'oldMan'))
    this.oldMan.setDepth(1)
    this.oldMan.setInteractive()
    this.oldMan.on('pointerdown', () => {
      if(this.oldMan.isTalking) return
      this.player.isTalking = true
      this.oldMan.readDialog('hello')
    })
    this.level = new Level1(this)
    
    this.physics.add.collider(this.player, this.level.worldLayer)
    this.physics.add.collider(this.oldMan, this.level.worldLayer)
    this.physics.add.collider(this.player, this.oldMan)

    // Create a helper object for our arrow keys 
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  
  update() {
    this.level.update()
    this.player.update(this.cursors)
  }

}