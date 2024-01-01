import { Base } from './Base'

export class OldNPC extends Base {

    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.scene = scene
        this.body.setSize(32, 48)
        this.body.setImmovable(true)
        this.dialogs = {
            hello: {
                question: true,
                say:["Bonjour jeune homme, je suis un vieux monsieur", "Je peux vous aider à trouver votre chemin", "Mais avant, je dois vous poser une question", "Quelle est la couleur du cheval blanc de Napoléon ?"],
                answers: {
                    left: {
                        text: "Blanc",
                        linksTo: "next"
                    },
                    right: {
                        text: "Noir",
                        linksTo: "end"
                    }
                }
            },
            next: {
                question: true,
                say:["Bravo, vous avez trouvé la bonne réponse"],
                answers: {
                    left: {
                        text: "Merci",
                        linksTo: "luisance"
                    },
                    right: {
                        text: "Je gagane quoi ?",
                        linksTo: "luisance"
                    }
                }
            },
            end: {
                question: true,
                say:["Tu es brave..."],
                answers: {
                    left: {
                        text: "Merci",
                        linksTo: "tend"
                    },
                    right: {
                        text: "Tu es vieux",
                        linksTo: "tend"
                    }
                }
            },
            tend: {
                question: false,
                say:["Aller, va t'en"]
            }, 
            luisance: {
                question: true,
                say:["Voici la luisance"],
                answers: {
                    left: {
                        text: "Prendre la luisance",
                        callback: () => {
                            // Redirect to shotgun.com
                            window.location.href = "https://www.shotgun.live/fr"
                        }
                    },
                    right: {
                        text: "Revenir à la réalité",
                        callback: () => {
                            // Redirect to google
                            window.location.href = "https://www.google.com/search?q=comment+revenir+%C3%A0+la+r%C3%A9alit%C3%A9&sca_esv=593647587&sxsrf=AM9HkKkqktQq1Z-z9Rogxfc4hvGdvST-og%3A1703544774126&source=hp&ei=xgeKZYWtBd2LkdUP-tq2mAw&iflsig=AO6bgOgAAAAAZYoV1tMSZoQr5kgX_NBnjma8jtaUKJWZ&oq=Comment+revenir+%C3%A0+la+r%C3%A9a&gs_lp=Egdnd3Mtd2l6GgIYAyIaQ29tbWVudCByZXZlbmlyIMOgIGxhIHLDqWEqAggAMgUQABiABDILEAAYgAQYogQYiwMyCxAAGIAEGKIEGIsDMgsQABiABBiiBBiLA0ilRFCvA1jlNnAJeACQAQCYAcIEoAHwGaoBDDIyLjEuMC4yLjEuMbgBA8gBAPgBAagCCsICBxAjGOoCGCfCAgQQIxgnwgIKECMYgAQYigUYJ8ICCBAAGIAEGLEDwgIOEC4YgAQYsQMYxwEY0QPCAhEQLhiABBixAxiDARjHARjRA8ICBRAuGIAEwgILEAAYgAQYsQMYgwHCAgsQLhiABBjHARjRA8ICDhAAGIAEGIoFGLEDGIMBwgILEAAYgAQYkgMYuATCAggQABiABBiSA8ICCBAAGIAEGMkDwgIGEAAYFhge&sclient=gws-wiz"
                        }
                    }
                }
            }
        }
    }

    async readDialog(key, index = 0){
        const line = this.dialogs[key].say[index]
        this.isTalking = true
        await this.scene.level.showSubtiles(line)
        if(typeof this.dialogs[key].say[index + 1] !== 'undefined'){
            this.readDialog(key, index + 1)
        }
        else if(typeof this.dialogs[key].say[index + 2] === 'undefined' && this.dialogs[key].question){
            const answer = await this.scene.level.showQuestion(line, this.dialogs[key].answers, this)
            console.log(answer)
        }else{
            this.isTalking = false
            this.scene.player.isTalking = false
        }
    }


}