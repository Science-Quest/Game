import { useEffect, useState, useRef } from "react"
import { useTimer } from "../../utilities/timer"

import GameHeader from '../../components/GameHeader'
import ResultPage from "../../components/ResultPage"
import ResultNotification from "../../components/ResultNotification"
import QuitNotification from "../../components/QuitNotification"
import GameGrid from "./GameGrid"
import ControlPad from "./ControlPad"

// Sample one level first
const levels = [
    {
        level: 1,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 2,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 3,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 4,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 5,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 6,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 7,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 8,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 9,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },
    {
        level: 10,
        arenaSize: 4,
        start: { row: 3, col: 0 },
        destination: { row: 0, col: 3 },
        safePath: [
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 }
        ]
    },

    // Levels 11-20 → arenaSize 5
    {
        level: 11,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 12,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 13,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 1, col: 3 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 14,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 15,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 16,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 17,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 18,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 19,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },
    {
        level: 20,
        arenaSize: 5,
        start: { row: 4, col: 0 },
        destination: { row: 0, col: 4 },
        safePath: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 4, col: 2 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 }
        ]
    },

    // Levels 21–25 → arenaSize 6
    {
        level: 21,
        arenaSize: 6,
        start: { row: 5, col: 0 },
        destination: { row: 0, col: 5 },
        safePath: [
            { row: 5, col: 0 },
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 1, col: 3 },
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 }
        ]
    },
    {
        level: 22,
        arenaSize: 6,
        start: { row: 5, col: 0 },
        destination: { row: 0, col: 5 },
        safePath: [
            { row: 5, col: 0 },
            { row: 5, col: 1 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 }
        ]
    },
    {
        level: 23,
        arenaSize: 6,
        start: { row: 5, col: 0 },
        destination: { row: 0, col: 5 },
        safePath: [
            { row: 5, col: 0 },
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 1, col: 3 },
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 }
        ]
    },
    {
        level: 24,
        arenaSize: 6,
        start: { row: 5, col: 0 },
        destination: { row: 0, col: 5 },
        safePath: [
            { row: 5, col: 0 },
            { row: 5, col: 1 },
            { row: 5, col: 2 },
            { row: 4, col: 2 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 }
        ]
    },
    {
        level: 25,
        arenaSize: 6,
        start: { row: 5, col: 0 },
        destination: { row: 0, col: 5 },
        safePath: [
            { row: 5, col: 0 },
            { row: 4, col: 0 },
            { row: 3, col: 0 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 0, col: 5 }
        ]
    }
]


export default function BombRoadApp(params) {
    const level = params.level
    const timer = useTimer()

    const carMoveSound = useRef(new Howl({src: '/sounds/car-engine.mp3'}))
    const bombExplosionSound = useRef(new Howl({src: '/sounds/bomb-explosion.mp3'}))

    const [phase, setPhase] = useState("memorize") // memorize → recall → finish
    const [carPosition, setCarPosition] = useState(null)
    const [prevCarPosition, setPrevCarPosition] = useState(null)
    const [showResultPage, setShowResultPage] = useState(false)
    const [showQuitNotification, setShowQuitNotification] = useState(false)

    const levelData = levels.find(l => l.level === Number(level))
    if (!levelData) return <div>Invalid level</div>

    const isCorrect =
        carPosition &&
        carPosition.row === levelData.destination.row &&
        carPosition.col === levelData.destination.col

    const result = { isFinish: phase === "finish", isCorrect }

    const gameStats =
        result.isFinish && {
            level: levelData.level,
            totalQuestions: levelData.safePath.length,
            totalCorrect: getReachedSteps(prevCarPosition, carPosition, levelData.safePath),
            time: timer.time,
            score: calculatePenaltiedScore(timer.time, prevCarPosition, carPosition, levelData),
        }

    useEffect(() => {
        if (phase === "finish") timer.stopTimer()
    }, [phase])

    useEffect(() => {
        if (gameStats) {
            const timeout = setTimeout(() => setShowResultPage(true), 2000)
            return () => clearTimeout(timeout)
        }
    }, [gameStats])

    // Initialize car at start position
    useEffect(() => {
        if (phase === "recall") setCarPosition(levelData.start)
    }, [phase])

    function handleMove(direction) {
        if (phase !== "recall") return

        let { row, col } = carPosition
        if (direction === "up") row--
        if (direction === "down") row++
        if (direction === "left") col--
        if (direction === "right") col++

        const newPos = { row, col }

        // check out of bounds
        if (row < 0 || col < 0 || row >= levelData.arenaSize || col >= levelData.arenaSize) return

        setPrevCarPosition(carPosition)
        setCarPosition(newPos)
        carMoveSound.current.play()

        // check bomb
        if (!isSafe(newPos, levelData)) {
            bombExplosionSound.current.play()
            setPhase("finish")
        }

        // check destination
        if (newPos.row === levelData.destination.row && newPos.col === levelData.destination.col) {
            setPhase("finish")
        }
    }

    if (showResultPage && gameStats) {
        console.log(gameStats)
        return <ResultPage questName="Bomb Road" gameStats={gameStats} />
    }

    return (
        <div>
            <GameHeader seconds={timer.time} showQuitNotification={() => setShowQuitNotification(true)} />

            <div className="w-full flex flex-col items-center px-4 pt-24">
                {result.isFinish && <ResultNotification isCorrect={result.isCorrect} />}
                {showQuitNotification && (
                    <QuitNotification closeQuitNotification={() => setShowQuitNotification(false)} />
                )}

                <p className="font-bold text-center text-xl mb-12">
                    {phase === "memorize"
                        ? "Hafalkan jalur mobil sampai tujuan!"
                        : "Gerakkan mobil sampai tujuan tanpa menabrak bom"}
                </p>

                <GameGrid
                    level={levelData}
                    phase={phase}
                    carPosition={carPosition}
                />

                {phase == "memorize" ? 
                    <button
                        className="rounded-full w-full flex justify-center items-center bg-blue-700 text-light text-2xl font-bold h-16 mt-12"
                        onClick={() => setPhase(nextPhase(phase))}
                    >
                        Recall
                    </button>
                    :
                    <ControlPad handleMove={handleMove} />
                }
            </div>
        </div>
    )
}

// START IS NOT COUNTED, BUT DESTINATION IS COUNTED
function getReachedSteps(prevCarPosition, carPosition, safePath) {
    let totalSteps = safePath.findIndex(
        step => step.row === carPosition?.row && step.col === carPosition?.col
    ) + 1

    if (totalSteps == 0 && prevCarPosition != null) {
        console.log(prevCarPosition)
        totalSteps = safePath.findIndex(
            step => step.row === prevCarPosition?.row && step.col === prevCarPosition?.col
        ) 
    }

    console.log(totalSteps)
    return totalSteps
}

function calculatePenaltiedScore(playTimeInSeconds, prevCarPosition,  carPosition, levelData) {
    const reachedSteps = getReachedSteps(prevCarPosition, carPosition, levelData.safePath)
    let score = calculateBaseScore(reachedSteps, levelData.safePath.length)
    const penaltyThreshold = 2 ** (levelData.arenaSize - 2)
    const penaltyByTime = Math.max(0, (playTimeInSeconds - penaltyThreshold) * 5)
    score -= Math.min(penaltyByTime, 300)
    return Math.max(Math.round(score), 0)
}

function calculateBaseScore(reachedSteps, totalSteps) {
    return Math.round((1000 * reachedSteps) / totalSteps)
}

function nextPhase(phase) {
    if (phase === "memorize") return "recall"
    if (phase === "recall") return "finish"
    return phase
}

function isSafe(pos, levelData) {
    return levelData.safePath.some(p => p.row === pos.row && p.col === pos.col)
}
