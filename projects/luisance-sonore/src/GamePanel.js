import Phaser, {Game} from 'phaser'

import {TitleScene} from './scenes/TitleScene'
import {BootScene} from './scenes/BootScene'
import {GameScene} from './scenes/GameScene'
import { EndScene } from './scenes/EndScene'

// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 3000
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960

export class GamePanel {
    constructor() {
        const devicePixelRatio = window.devicePixelRatio || 1;

        const config = {
            type: Phaser.AUTO,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 300},
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: 'game-panel',
                width: SIZE_WIDTH_SCREEN,
                height: SIZE_HEIGHT_SCREEN,
                min: {
                    width: MIN_SIZE_WIDTH_SCREEN,
                    height: MIN_SIZE_HEIGHT_SCREEN
                },
                max: {
                    width: MAX_SIZE_WIDTH_SCREEN,
                    height: MAX_SIZE_HEIGHT_SCREEN
                }
            },
            scene: [
                TitleScene,
                BootScene, 
                GameScene,
                EndScene
            ],
            dom: {
                createContainer: true
            },
            fx: {
                glow: {
                    distance: 32,
                    quality: 0.8
                }
            }
        }
        this.game = new Game(config)
        // Global

        this.game.screenBaseSize = {
            maxWidth: MAX_SIZE_WIDTH_SCREEN,
            maxHeight: MAX_SIZE_HEIGHT_SCREEN,
            minWidth: MIN_SIZE_WIDTH_SCREEN,
            minHeight: MIN_SIZE_HEIGHT_SCREEN,
            width: SIZE_WIDTH_SCREEN,
            height: SIZE_HEIGHT_SCREEN
        }

    }
}