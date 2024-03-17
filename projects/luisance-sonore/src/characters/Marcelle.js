import { Base } from './Base'

export class Marcelle extends Base {

    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.scene = scene
        this.setScale(0.1)
        this.body.setImmovable(true)
        this.hasTalked = 0
        this.dialogs = {
            hello: {
                question: false,
                say:["Dans le sens des aiguilles d'une montre gros fatigué..."]
            },
            next: {
                question: false,
                say:["J'suis la cagole en cagoule, plus ché-père que la bonne mère.",]
            }
        }
    }

    async readDialog(key, index = 0){
        const line = this.dialogs[key].say[index]
        this.isTalking = true
        this.scene.audio.dialogSound.play()
        await this.scene.level.showSubtiles(line)
        if(typeof this.dialogs[key].say[index + 1] !== 'undefined'){
            this.readDialog(key, index + 1)
        }
        else if(typeof this.dialogs[key].say[index + 2] === 'undefined' && this.dialogs[key].question){
            const answer = await this.scene.level.showQuestion(line, this.dialogs[key].answers, this)
        }else{
            this.isTalking = false
            this.scene.player.isTalking = false
        }
    }


}