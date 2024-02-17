import Phaser from "phaser";

export class Clock {
    constructor(scene) {
        this.scene = scene;
        this.clockGroup = null;
        this.hourHand = null;
        this.minuteHand = null;
        this.width = this.scene.sys.scale.gameSize.width
        this.height = this.scene.sys.scale.gameSize.height
    }

    createClock() {
        this.clockGroup = this.scene.add.group();

        // Draw the clock face
        this.clockFace = this.scene.add.circle(this.width/2, 300, 150, 0xcccccc);

        
        this.clockGroup.add(this.clockFace);

        // Draw hour and minute needles
        this.drawHourHand();
        this.drawMinuteHand();
        this.clockGroup.children.iterate(child => {
            child.setScrollFactor(0);
        });

    }

    drawHourHand() {
        this.hourHand = this.scene.add.line(this.width/2, 300, 0, 0, 0, -70, 0x000000);
        this.hourHand.setOrigin(0.5, 0.3); // Set origin to the center bottom
        this.hourHand.setLineWidth(8);
        this.clockGroup.add(this.hourHand);
    }

    drawMinuteHand() {
        this.minuteHand = this.scene.add.line(this.width/2, 300, 0, 0, 0, -100, 0x000000);
        this.minuteHand.setOrigin(0.5, 0.3); // Set origin to the center bottom
        this.minuteHand.setLineWidth(4);
        this.clockGroup.add(this.minuteHand);
    }

    updateClock() {
        const rotationAmount = 0.1; // You can adjust this value based on the speed of rotation

        this.hourHand.angle = ((this.scene.player.body.x*rotationAmount)%360);
        this.minuteHand.angle = ((this.scene.player.body.x*rotationAmount)%360) * 12; // La minute a 12 fois plus de divisions que l'heure
    }
}
