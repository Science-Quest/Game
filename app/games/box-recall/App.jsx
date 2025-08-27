import { useEffect, useState } from "react"
import { useTimer } from "../../utilities/timer"

import GameGrid from "./GameGrid"
import ResultPage from "./ResultPage"
import ResultNotification from "./ResultNotification"


const level = {
    arenaSize: 3,
    targets: [
        {
            row: 0,
            col: 1
        },
        {
            row: 1,
            col: 2
        },
        {
            row: 2,
            col: 2
        }
    ]
}


export default function App() {

    const phases = ['memorize', 'recall', 'finish']
    const [phase, setPhase] = useState('memorize')
    const [selectedBoxes, setSelectedBoxes] = useState([])
    const [result, setResult] = useState({ isFinish: false, isCorrect: null })
    const [gameStats, setGameStats] = useState(null)
    const [showResultPage, setShowResultPage] = useState(false)

    const timer = useTimer()
    

    const getNumOfCorrectAnswer = (answer, target) => {
        let correctAnswer = 0

        for (let i = 0; i < answer.length; i++) {
            let found = false;
            for (let j = 0; j < target.length; j++) {
                if (answer[i].row === target[j].row && answer[i].col === target[j].col) {
                    found = true;
                    correctAnswer += 1
                    break;
                }
            }
        }

        return correctAnswer;
    }

    const calculatePenaltiedScore = (playTimeInSeconds) => {
        let maxPenalty = 300
        const correctAnswers = getNumOfCorrectAnswer(selectedBoxes, level.targets)

        let score = calculateBaseScore(correctAnswers, level.targets.length)

        let penaltyThreshold = 2 ** (level.arenaSize - 2)    // 2x2 => 1, 3x3 => 2, 4x4 => 4, 5x5 => 8
        let penaltyByTime = 0
        if (playTimeInSeconds - penaltyThreshold < 0) {
            penaltyByTime = 0
        } else {
            penaltyByTime = (playTimeInSeconds - penaltyThreshold) * 5
        }
        console.log('BASE SCORE:' + score)
        console.log('PENALTY:' + penaltyByTime)
        score -= Math.min(penaltyByTime, maxPenalty)

        return Math.max(Math.round(score), 0)
    }

    const calculateBaseScore = (correctAnswer, totalQuestions) => {
        return Math.round(1000 * correctAnswer / totalQuestions)
    }

    useEffect(
        () => console.log(selectedBoxes)
    , [selectedBoxes])

    useEffect(() => {
        if (phase === 'finish') {
            timer.stopTimer()
            setResult(
                {
                    isFinish: true,
                    isCorrect: getNumOfCorrectAnswer(selectedBoxes, level.targets) === level.targets.length
                }
            )
        }

    }, [phase])

    useEffect(() => {
        if (result.isFinish) {
            setGameStats(
                {
                    level: 1,
                    totalQuestions: level.targets.length,
                    totalCorrect: getNumOfCorrectAnswer(selectedBoxes, level.targets),
                    time: timer.time,
                    score: calculatePenaltiedScore(timer.time),
                }
            )
        }
    }, [result.isFinish])
 
    useEffect(() => {
        if (gameStats) {
            setTimeout(() => setShowResultPage(true), 2000)
        }
    }, [gameStats])


    if (showResultPage) {
        return <ResultPage gameStats={gameStats} />
    }
    return (
        <div className="w-full min-h-[100vh] flex flex-col justify-center items-center px-4">
            {
                (result.isFinish) ?
                <ResultNotification isCorrect={result.isCorrect} />
                :
                null
            }
            <p id="instruction" className="font-bold text-center text-xl mb-8">
                {
                    phase === 'memorize'?
                    'Hafalkan setiap lokasi kotak kuning di bawah ini'
                    :
                    'Pilih semua kotak yang tadi bewarna kuning'
                }
            </p>
            <GameGrid level={level} phase={phase} setSelectedBoxes={setSelectedBoxes} currentSelectedBoxes={selectedBoxes}/>
            <button 
                className="rounded-full w-full flex justify-center items-center bg-blue-700 text-light text-2xl font-bold h-16 mt-24" 
                onClick={() => setPhase(phases[phases.findIndex(phaseName => phaseName === phase) + 1])}
            >
                {
                    phase === 'memorize'?
                    "RECALL"
                    :
                    "CHECK ANSWER"
                }
            </button>
        </div>
    )
}

