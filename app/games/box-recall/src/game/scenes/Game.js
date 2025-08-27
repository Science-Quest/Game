import { Scene } from 'phaser';
import EndQuestNotification from '../components/EndQuestNotification';

const level = {
    arenaSize: 3,
    targets: [[0, 1], [1,2], [2,2]]
}

const GRID_CONFIG = {
    boxSize : 72,
    gap : 10,
    targetBoxFillColor : 0xFFEA00,
    inactiveBoxFillColor : 0x064463
}

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init() 
    {
        this.displayConfig = {}
        this.displayConfig.viewport = this.scale.getViewPort()
        this.displayConfig.paddingX = 20
        this.displayConfig.paddingY = 112
        this.selected = []

        this.playTime = 0
        this.correctAnswer = 0
        this.totalQuestion = level.targets.length
        this.score = 0
    }

    create()
    {
        const createNextPhaseButton = () => {
            let nextPhaseButton = this.add.rectangle(this.displayConfig.viewport.width / 2, this.displayConfig.viewport.height - this.displayConfig.paddingY, 352, 64, 0x20B4FF)
                .setRounded(50)
                .setOrigin(0.5)
                .setInteractive();

            nextPhaseButton.text = this.add.text(this.displayConfig.viewport.width / 2, this.displayConfig.viewport.height - this.displayConfig.paddingY, 'RECALL', {
                fontSize: '24px',
                color: '#064463',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            return nextPhaseButton
        }

        const createMemorizeSessionGrid = (size) => {
            // GENERATE BOX GRID
            let boxes = []

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let boxColor;
                    if (level.targets.some((position) => JSON.stringify(position) == JSON.stringify([i, j]))) {
                        boxColor = GRID_CONFIG.targetBoxFillColor
                    } else {
                        boxColor = GRID_CONFIG.inactiveBoxFillColor
                    }
                    boxes.push(this.add.rectangle(j * (GRID_CONFIG.boxSize + GRID_CONFIG.gap), i * (GRID_CONFIG.boxSize + GRID_CONFIG.gap), GRID_CONFIG.boxSize, GRID_CONFIG.boxSize, boxColor).setRounded(10))
                }
            }

            let grid = this.add.container(0, 0, boxes)
            let bounds = grid.getBounds()
            grid.x = (this.displayConfig.viewport.width / 2) - (bounds.width / 2) + Math.abs(bounds.x)
            grid.y = 324

            return grid
        }

        const createRecallSessionGrid = (size) => {

            const handleBoxClick = (box) => {

                if (box.fillColor == GRID_CONFIG.targetBoxFillColor) {
                    this.selected = this.selected.filter((selected) => JSON.stringify(selected) != JSON.stringify(box.position))
                    box.setFillStyle(GRID_CONFIG.inactiveBoxFillColor)
                } else {
                    this.selected.push(box.position)
                    box.setFillStyle(GRID_CONFIG.targetBoxFillColor)
                }
                console.log(this.selected)
            }

            let boxes = []
            const boxColor = GRID_CONFIG.inactiveBoxFillColor

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let box = this.add.rectangle(j * (GRID_CONFIG.boxSize + GRID_CONFIG.gap), i * (GRID_CONFIG.boxSize + GRID_CONFIG.gap), GRID_CONFIG.boxSize, GRID_CONFIG.boxSize, boxColor)
                        .setRounded(10)
                        .setInteractive()
                    box.position = [i, j]

                    box.on('pointerdown', () => handleBoxClick(box))
                    boxes.push(box)
                }
            }

            let grid = this.add.container(0, 0, boxes)
            let bounds = grid.getBounds()
            grid.x = (this.displayConfig.viewport.width / 2) - (bounds.width / 2) + Math.abs(bounds.x)
            grid.y = 324

            return grid
        }

        const finishLevel = () => {

            if (getNumOfCorrectAnswer(this.selected, level.targets) == this.selected.length) {
                this.notification = new EndQuestNotification(this, 'BENAR')
            } else {
                this.notification = new EndQuestNotification(this, 'SALAH')
            }

            this.correctAnswer = getNumOfCorrectAnswer(this.selected, level.targets)
            this.score = calculateFinalScore()

            let result = {
                playTime: this.playTime,
                correctAnswer: this.correctAnswer,
                totalQuestion: this.totalQuestion,
                score: this.score
            }

            console.log(result)

            setTimeout(() => this.scene.start('LevelFinish', result), 2000)

        }

        const calculateFinalScore = () => {
            let maxPenalty = 300
            let maxTime = 60

            let score = calculateBaseScore()

            let penaltyThreshold = 5 + 3 * (level.arenaSize - 3)    // 2x2 => 2, 3x3 => 5, 4x4 => 8, 5x5 => 11
            let penaltyByTime = 0
            if (this.playTime / 1000 - penaltyThreshold < 0) {
                penaltyByTime = 0
            } else {
                penaltyByTime = (this.playTime/1000 - penaltyThreshold) * maxPenalty / maxTime
            }

            score -= Math.round(penaltyByTime)

            return score
        }

        const calculateBaseScore = () => {
            return 1000 * this.correctAnswer / this.totalQuestion
        }

        const getNumOfCorrectAnswer = (answer, target) => {
            let correctAnswer = 0

            if (answer.length !== target.length) return correctAnswer;

            for (let i = 0; i < answer.length; i++) {
                let found = false;
                for (let j = 0; j < target.length; j++) {
                    if (answer[i][0] === target[j][0] && answer[i][1] === target[j][1]) {
                        found = true;
                        correctAnswer += 1
                        break;
                    }
                }
            }
            
            return correctAnswer;
        }

        this.add.image(0, 0, 'background-pattern').setOrigin(0).setAlpha(0.3).setY(32)

        // GENERATE INSTRUCTION
        let instruction = this.add.text(
                this.displayConfig.viewport.width / 2, 
                this.displayConfig.paddingY, 
                'Hafalkan setiap lokasi kotak kuning di bawah ini ', 
                {
                    fontFamily: 'Poppins-Bold', 
                    fontSize: 24, 
                    color:'#064463', 
                    align: 'center'
                }
            )
            .setOrigin(0.5, 0)
            .setWordWrapWidth(this.displayConfig.viewport.width - this.displayConfig.paddingX*2);
        
        // GENERATE BOX GRID
        let arena = createMemorizeSessionGrid(level.arenaSize)

        // GENERATE ACTION BUTTON
        let nextPhaseButton = createNextPhaseButton()
        nextPhaseButton.on('pointerdown', () => {
            arena.destroy()
            arena = createRecallSessionGrid(level.arenaSize)

            instruction.setText("Pilih semua kotak yang tadi bewarna kuning")
            nextPhaseButton.text.setText("Check Answer")

            nextPhaseButton.on('pointerdown', () => {
                finishLevel()
            })
        });

    }

    update(time) {
        this.playTime = time
    }
    
}
