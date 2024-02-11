import {Scene} from 'phaser'

import {Player} from '../characters/Player'
import {Level1} from '../levels/Level1'

import { OldNPC } from '../characters/OldNPC'
import { Clock } from '../objects/Clock'

export class GameScene extends Scene {

  constructor() {
    super("scene-game")
  }

  create() {
    this.audio = {
      mainTheme: this.sound.add('mainTheme', {loop: true}),
      jumpSound: this.sound.add('jumpSound'),
      dialogSound: this.sound.add('dialogSound'),
      dialogLowSound: this.sound.add('dialogLowSound'),
      walkSound: this.sound.add('walkSound')
    }

    this.audio.mainTheme.loop = true
    this.audio.mainTheme.volume = 0.6
    this.audio.jumpSound.volume = 0.5
    this.audio.walkSound.loop = true

    this.clock = new Clock(this);

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

    this.audio.mainTheme.play()
  }
  
  update() {
    const cursors = this.input.keyboard.createCursorKeys();


    this.clock.updateClock('forward');
    this.level.update()
    this.player.update(this.cursors)
  }

}