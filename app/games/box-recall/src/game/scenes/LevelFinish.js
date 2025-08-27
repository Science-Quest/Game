import { Scene } from 'phaser';

const DISPLAY_CONFIG = {
    marginY: 48,
    paddingX: 10,
    record: {
        marginY: 24,
        paddingX: 8
    }
}

export class LevelFinish extends Scene {
    constructor() {
        super('LevelFinish');
    }

    init(gameResult) {
        this.gameResult = {
            playTime: 43652,
            correctAnswer: 2,
            totalQuestion: 2,
            score: 854
        }
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('/assets');

        this.load.image('trophy', 'trophy.png');
        this.load.image('retry-button', 'retry-button.png');
        this.load.image('next-button', 'next-button.png');
        
    }

    create() {
        // Create a fullscreen black overlay with transparency
        let overlay = this.add.rectangle(
            this.scale.width / 2,  // center X
            this.scale.height / 2, // center Y
            this.scale.width,      // full width
            this.scale.height,     // full height
            0x000000,              // black color
            0.35                   // alpha (0 = transparent, 1 = fully opaque)
        );

        // Make sure it appears above the background but below your popup UI
        
        let successIndicator = this.add.text(this.scale.width / 2, DISPLAY_CONFIG.marginY, "KAMU BERHASIL !!!", {color: '#FFFFFF', fontSize: 32, fontFamily: "Poppins-Bold"}).setOrigin(0.5, 0)

        let trophy = this.add.image(
            this.scale.width / 2, 
            successIndicator.y + successIndicator.height + 
            DISPLAY_CONFIG.marginY, 
            'trophy'
        ).setOrigin(0.5, 0)
    
        let divider = this.add.rectangle(
            this.scale.width / 2,
            trophy.y + trophy.height + DISPLAY_CONFIG.marginY,
            this.scale.width - 2 * DISPLAY_CONFIG.paddingX,
            8,
            0xFFFFFF
        ).setOrigin(0.5, 0)

        let recordList = this.add.container()
        recordList.width = this.scale.width - 2 * (DISPLAY_CONFIG.paddingX + DISPLAY_CONFIG.record.paddingX)
        recordList.setX(DISPLAY_CONFIG.paddingX + DISPLAY_CONFIG.record.paddingX)
        recordList.setY(divider.y + divider.height + DISPLAY_CONFIG.marginY)
       

        let record = {
            "QUEST": "Box Recall",
            "WAKTU": `${Math.round(this.gameResult.playTime / 1000)} s`,
            "TEPAT": `${this.gameResult.correctAnswer} / ${this.gameResult.totalQuestion}`,
            "SCORE": `+${this.gameResult.score} pts`
        }

        Object.keys(record).forEach((key, index) => {
            let recordProperty = this.add.text(0, index * 64 + DISPLAY_CONFIG.record.marginY, key, { fontFamily: 'Poppins-Bold', fontSize: 20 }).setOrigin(0)
            let recordValue = this.add.text(recordList.width, index * 64 + DISPLAY_CONFIG.record.marginY, record[key], { fontFamily: 'Poppins-Bold', fontSize: 20 }).setOrigin(1, 0)
            recordList.add([recordProperty, recordValue])
        })

    }
}
