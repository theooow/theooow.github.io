import {Scene} from 'phaser'

import {Player} from '../characters/Player'
import {Level1} from '../levels/Level1'

import { OldNPC } from '../characters/OldNPC'
import { Clock } from '../objects/Clock'
import { Door } from '../objects/Door'
import { Marcelle } from '../characters/Marcelle'

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
    this.door = new Door(this)


    this.player = this.physics.add.existing(new Player(this, 1000, 0, 'dude'))
    this.player.setDepth(2)
    
    this.oldMan = this.physics.add.existing(new OldNPC(this, 2000, 0, 'oldMan'))
    this.oldMan.setDepth(1)
    this.oldMan.setInteractive()
    // Si les hitbox se touchent, le joueur et le vieux se parlent
    this.physics.add.overlap(this.player, this.oldMan, () => {
      if(!this.oldMan.hasTalked){
        this.player.isTalking = true
        this.oldMan.hasTalked = true
        this.oldMan.readDialog('hello')
      }
    })

    this.door.door.setInteractive()
    this.physics.add.overlap(this.player, this.door.door, () => {
      // Off all sounds
      this.audio.mainTheme.stop()
      this.audio.jumpSound.stop()
      this.audio.walkSound.stop()

      this.player.isTalking = true

      this.scene.stop('scene-game')
      this.scene.start('scene-end')
    })

    // Marcelle
    this.marcelle = this.physics.add.existing(new Marcelle(this, 100, 0, 'marcelle'))
    this.marcelle.setDepth(1)
    this.marcelle.setInteractive()

    this.physics.add.overlap(this.player, this.marcelle, () => {
      if(this.marcelle.hasTalked == 0){
        this.player.isTalking = true
        this.marcelle.hasTalked = 1
        this.marcelle.readDialog('hello')
      }
      if(this.marcelle.hasTalked == 1 && !this.player.isTalking){
        this.player.isTalking = true
        this.marcelle.hasTalked = 2
        this.marcelle.readDialog('next')
      }
    })

    // Gravity
    this.physics.world.enable(this.marcelle)
    this.marcelle.body.setGravityY(300)

    this.level = new Level1(this)
    
    this.physics.add.collider(this.player, this.level.worldLayer)
    this.physics.add.collider(this.oldMan, this.level.worldLayer)
    this.physics.add.collider(this.door.door, this.level.worldLayer)
    this.physics.add.collider(this.marcelle, this.level.worldLayer)
    // this.physics.add.collider(this.player, this.oldMan)

    // Create a helper object for our arrow keys 
    this.cursors = this.input.keyboard.createCursorKeys()

    this.audio.mainTheme.play()
  }
  
  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if(this.player.body.onFloor() && this.player.eventStart) {
      this.player.readDialog('start')
      this.player.eventStart = false
    }

    this.clock.updateClock('forward');
    this.level.update()
    this.player.update(this.cursors)
  }

}