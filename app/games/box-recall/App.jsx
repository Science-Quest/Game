import { useEffect, useState } from "react"
import { useTimer } from "../../utilities/timer"

import GameHeader from '../../components/GameHeader'
import ResultPage from "../../components/ResultPage"
import ResultNotification from "../../components/ResultNotification"
import QuitNotification from "../../components/QuitNotification"
import GameGrid from "./GameGrid"

const levels = [
    {
        "level": 1,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 2 }
        ]
    },
    {
        "level": 2,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 2 },
            { "row": 2, "col": 1 },
            { "row": 2, "col": 0 },
            { "row": 0, "col": 0 }
        ]
    },
    {
        "level": 3,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 1, "col": 1 },
            { "row": 2, "col": 2 }
        ]
    },
    {
        "level": 4,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 2 },
            { "row": 1, "col": 1 },
            { "row": 2, "col": 0 },
            { "row": 0, "col": 1 }
        ]
    },
    {
        "level": 5,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 2 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 2 },
            { "row": 1, "col": 1 }
        ]
    },
    {
        "level": 6,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 1 },
            { "row": 0, "col": 0 }
        ]
    },
    {
        "level": 7,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 1 },
            { "row": 2, "col": 2 },
            { "row": 1, "col": 0 }
        ]
    },
    {
        "level": 8,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 2 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 1 }
        ]
    },
    {
        "level": 9,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 2 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 2 }
        ]
    },
    {
        "level": 10,
        "arenaSize": 3,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 0, "col": 2 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 1 },
            { "row": 2, "col": 2 }
        ]
    },
    {
        "level": 11,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 1, "col": 1 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 12,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 3 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 1 },
            { "row": 3, "col": 0 },
            { "row": 1, "col": 0 }
        ]
    },
    {
        "level": 13,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 3 },
            { "row": 3, "col": 0 },
            { "row": 3, "col": 3 },
            { "row": 1, "col": 1 },
            { "row": 2, "col": 2 }
        ]
    },
    {
        "level": 14,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 15,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 3 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 2 }
        ]
    },
    {
        "level": 16,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 3 },
            { "row": 1, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 1 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 0 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 17,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 2 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 3 },
            { "row": 3, "col": 1 }
        ]
    },
    {
        "level": 18,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 0, "col": 2 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 3 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 2 }
        ]
    },
    {
        "level": 19,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 2 },
            { "row": 1, "col": 1 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 20,
        "arenaSize": 4,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 1 },
            { "row": 0, "col": 2 },
            { "row": 0, "col": 3 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 3 },
            { "row": 3, "col": 0 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 2 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 21,
        "arenaSize": 5,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 1, "col": 1 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 3 },
            { "row": 4, "col": 4 }
        ]
    },
    {
        "level": 22,
        "arenaSize": 5,
        "targets": [
            { "row": 0, "col": 4 },
            { "row": 1, "col": 3 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 1 },
            { "row": 4, "col": 0 },
            { "row": 0, "col": 0 }
        ]
    },
    {
        "level": 23,
        "arenaSize": 5,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 4 },
            { "row": 4, "col": 0 },
            { "row": 4, "col": 4 },
            { "row": 2, "col": 2 },
            { "row": 1, "col": 1 },
            { "row": 3, "col": 3 }
        ]
    },
    {
        "level": 24,
        "arenaSize": 5,
        "targets": [
            { "row": 0, "col": 1 },
            { "row": 0, "col": 3 },
            { "row": 1, "col": 0 },
            { "row": 1, "col": 4 },
            { "row": 2, "col": 2 },
            { "row": 3, "col": 0 },
            { "row": 3, "col": 4 },
            { "row": 4, "col": 1 },
            { "row": 4, "col": 3 }
        ]
    },
    {
        "level": 25,
        "arenaSize": 5,
        "targets": [
            { "row": 0, "col": 0 },
            { "row": 0, "col": 1 },
            { "row": 0, "col": 3 },
            { "row": 0, "col": 4 },
            { "row": 1, "col": 2 },
            { "row": 2, "col": 0 },
            { "row": 2, "col": 4 },
            { "row": 3, "col": 1 },
            { "row": 3, "col": 3 },
            { "row": 4, "col": 0 },
            { "row": 4, "col": 2 },
            { "row": 4, "col": 4 }
        ]
    }
]

export default function BoxRecallApp( params ) {
    const level = params.level

    const timer = useTimer()

    const [phase, setPhase] = useState("memorize")
    const [selectedBoxes, setSelectedBoxes] = useState([])
    const [showResultPage, setShowResultPage] = useState(false)
    const [showQuitNotification, setShowQuitNotification] = useState(false)

    const levelData = levels.find(l => l.level === Number(level))
    if (!levelData) return <div>Invalid level</div>

    const isCorrect = getNumOfCorrectAnswer(selectedBoxes, levelData.targets) === levelData.targets.length

    const result = { isFinish: phase === "finish", isCorrect }

    const gameStats =
        result.isFinish && {
            level: levelData.level,
            totalQuestions: levelData.targets.length,
            totalCorrect: getNumOfCorrectAnswer(selectedBoxes, levelData.targets),
            time: timer.time,
            score: calculatePenaltiedScore(timer.time, selectedBoxes, levelData),
        }

    useEffect(() => {
        if (phase === "finish") {
            timer.stopTimer()
        }
    }, [phase])

    useEffect(() => {
        if (gameStats) {
            const timeout = setTimeout(() => setShowResultPage(true), 2000)
            return () => clearTimeout(timeout)
        }
    }, [gameStats])


    if (showResultPage && gameStats) {
        return <ResultPage questName="Box Recall" gameStats={gameStats} />
    }
    return (
        <div>
            {/* header */}
            <GameHeader seconds={timer.time} showQuitNotification={() => setShowQuitNotification(true)} />

            {/* body */}
            <div className="w-full flex flex-col items-center px-4 pt-24">
                {result.isFinish && <ResultNotification isCorrect={result.isCorrect} />}
                {showQuitNotification && (
                    <QuitNotification closeQuitNotification={() => setShowQuitNotification(false)} />
                )}

                <p className="font-bold text-center text-xl mb-12">
                    {phase === "memorize"
                        ? "Hafalkan setiap lokasi kotak kuning di bawah ini"
                        : "Pilih semua kotak yang tadi bewarna kuning"}
                </p>

                <GameGrid
                    level={levelData}
                    phase={phase}
                    setSelectedBoxes={setSelectedBoxes}
                    currentSelectedBoxes={selectedBoxes}
                />

                <button
                    className="rounded-full w-full flex justify-center items-center bg-blue-700 text-light text-2xl font-bold h-16 mt-24"
                    onClick={() => setPhase(nextPhase(phase))}
                >
                    {phase === "memorize" ? "RECALL" : "CHECK ANSWER"}
                </button>
            </div>
        </div>
    )
}

function getNumOfCorrectAnswer(answer, target) {
    return answer.filter(a => target.some(t => t.row === a.row && t.col === a.col)).length
}

function calculatePenaltiedScore(playTimeInSeconds, selectedBoxes, levelData) {
    const correctAnswers = getNumOfCorrectAnswer(selectedBoxes, levelData.targets)
    let score = calculateBaseScore(correctAnswers, levelData.targets.length)
    const penaltyThreshold = 2 ** (levelData.arenaSize - 2)
    const penaltyByTime = Math.max(0, (playTimeInSeconds - penaltyThreshold) * 5)
    score -= Math.min(penaltyByTime, 300)
    return Math.max(Math.round(score), 0)
}

function calculateBaseScore(correctAnswer, totalQuestions) {
    return Math.round((1000 * correctAnswer) / totalQuestions)
}

function nextPhase(phase) {
    if (phase === "memorize") return "recall"
    if (phase === "recall") return "finish"
    return phase
}


