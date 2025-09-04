import { useEffect, useState } from "react"
import { useTimer } from "../../utilities/timer"

import GameHeader from "../../components/GameHeader"
import ResultPage from "../../components/ResultPage"
import ResultNotification from "../../components/ResultNotification"
import QuitNotification from "../../components/QuitNotification"
import GameGrid from "./GameGrid"

export default function App({ params }) {
    const level = params.level

    const timer = useTimer()

    const [phase, setPhase] = useState("do")
    const [paths, setPaths] = useState({})
    const [showResultPage, setShowResultPage] = useState(false)
    const [showQuitNotification, setShowQuitNotification] = useState(false)

    const levelData = levels.find(l => l.level === Number(level))
    if (!levelData) return <div>Invalid level</div>

    const isCorrect = Object.keys(paths).length === levelData.pairs.length

    const result = { isFinish: phase === "finish", isCorrect }

    const gameStats =
        result.isFinish && {
            level: levelData.level,
            totalQuestions: levelData.pairs.length,
            totalCorrect: Object.keys(paths).length,
            time: timer.time,
            score: calculateScore(timer.time, paths, levelData),
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

    // auto-finish when all pairs connected
    useEffect(() => {
        if (phase === "do" && isCorrect) {
            setPhase("finish")
        }
    }, [isCorrect, phase])

    if (showResultPage && gameStats) {
        return <ResultPage questName="Connect Things" gameStats={gameStats} />
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
                    {phase === "do"
                        ? "Hubungkan pasangan gambar yang sama tanpa jalur saling tumpang tindih"
                        : "Permainan selesai"}
                </p>

                <GameGrid level={levelData} phase={phase} paths={paths} setPaths={setPaths} />
            </div>
        </div>
    )
}

const levels = [
    // --- 4x4 Levels ---
    {
        level: 1,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 0, col: 3 }] },
            { id: "B", positions: [{ row: 1, col: 1 }, { row: 3, col: 1 }] },
            { id: "C", positions: [{ row: 2, col: 2 }, { row: 3, col: 3 }] },
        ],
    },
    {
        level: 2,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 3, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 1 }, { row: 3, col: 1 }] },
            { id: "C", positions: [{ row: 0, col: 2 }, { row: 3, col: 2 }] },
            { id: "D", positions: [{ row: 0, col: 3 }, { row: 3, col: 3 }] },
        ],
    },
    {
        level: 3,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 2, col: 0 }] },
            { id: "B", positions: [{ row: 1, col: 3 }, { row: 3, col: 3 }] },
            { id: "C", positions: [{ row: 3, col: 0 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 4,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 0, col: 3 }] },
            { id: "B", positions: [{ row: 1, col: 1 }, { row: 1, col: 2 }] },
            { id: "C", positions: [{ row: 2, col: 0 }, { row: 3, col: 0 }] },
            { id: "D", positions: [{ row: 2, col: 3 }, { row: 3, col: 3 }] },
        ],
    },
    {
        level: 5,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 1, col: 1 }] },
            { id: "B", positions: [{ row: 0, col: 3 }, { row: 1, col: 2 }] },
            { id: "C", positions: [{ row: 2, col: 0 }, { row: 3, col: 1 }] },
            { id: "D", positions: [{ row: 2, col: 3 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 6,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 3, col: 3 }] },
            { id: "B", positions: [{ row: 0, col: 3 }, { row: 3, col: 0 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 2, col: 2 }] },
        ],
    },
    {
        level: 7,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 1 }, { row: 3, col: 1 }] },
            { id: "B", positions: [{ row: 0, col: 2 }, { row: 3, col: 2 }] },
            { id: "C", positions: [{ row: 1, col: 0 }, { row: 2, col: 3 }] },
        ],
    },
    {
        level: 8,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 3, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 3 }, { row: 3, col: 3 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 2, col: 2 }] },
            { id: "D", positions: [{ row: 1, col: 2 }, { row: 2, col: 1 }] },
        ],
    },
    {
        level: 9,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 1 }, { row: 1, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 2 }, { row: 1, col: 3 }] },
            { id: "C", positions: [{ row: 2, col: 0 }, { row: 3, col: 1 }] },
            { id: "D", positions: [{ row: 2, col: 3 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 10,
        size: 4,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 3, col: 1 }] },
            { id: "B", positions: [{ row: 0, col: 3 }, { row: 3, col: 2 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 2, col: 2 }] },
            { id: "D", positions: [{ row: 1, col: 2 }, { row: 2, col: 1 }] },
        ],
    },

    // --- 5x5 Levels (11–20) ---
    {
        level: 11,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 4, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 4, col: 4 }] },
            { id: "C", positions: [{ row: 2, col: 1 }, { row: 2, col: 3 }] },
        ],
    },
    {
        level: 12,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 0, col: 4 }] },
            { id: "B", positions: [{ row: 4, col: 0 }, { row: 4, col: 4 }] },
            { id: "C", positions: [{ row: 1, col: 2 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 13,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 2 }, { row: 4, col: 2 }] },
            { id: "B", positions: [{ row: 2, col: 0 }, { row: 2, col: 4 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 3, col: 3 }] },
        ],
    },
    {
        level: 14,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 4, col: 4 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 4, col: 0 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 3, col: 3 }] },
        ],
    },
    {
        level: 15,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 4, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 4, col: 4 }] },
            { id: "C", positions: [{ row: 2, col: 1 }, { row: 2, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 2 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 16,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 4, col: 4 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 4, col: 0 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 3, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 3 }, { row: 3, col: 1 }] },
        ],
    },
    {
        level: 17,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 2 }, { row: 4, col: 2 }] },
            { id: "B", positions: [{ row: 2, col: 0 }, { row: 2, col: 4 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 3, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 3 }, { row: 3, col: 1 }] },
        ],
    },
    {
        level: 18,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 0, col: 4 }] },
            { id: "B", positions: [{ row: 4, col: 0 }, { row: 4, col: 4 }] },
            { id: "C", positions: [{ row: 2, col: 1 }, { row: 2, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 2 }, { row: 3, col: 2 }] },
        ],
    },
    {
        level: 19,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 4, col: 4 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 4, col: 0 }] },
            { id: "C", positions: [{ row: 2, col: 2 }, { row: 1, col: 3 }] },
        ],
    },
    {
        level: 20,
        size: 5,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 2 }, { row: 4, col: 2 }] },
            { id: "B", positions: [{ row: 2, col: 0 }, { row: 2, col: 4 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 3, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 3 }, { row: 3, col: 1 }] },
        ],
    },

    // --- 6x6 Levels (21–25) ---
    {
        level: 21,
        size: 6,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 5, col: 5 }] },
            { id: "B", positions: [{ row: 0, col: 5 }, { row: 5, col: 0 }] },
            { id: "C", positions: [{ row: 1, col: 1 }, { row: 4, col: 4 }] },
            { id: "D", positions: [{ row: 1, col: 4 }, { row: 4, col: 1 }] },
        ],
    },
    {
        level: 22,
        size: 6,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 2 }, { row: 5, col: 2 }] },
            { id: "B", positions: [{ row: 2, col: 0 }, { row: 2, col: 5 }] },
            { id: "C", positions: [{ row: 3, col: 0 }, { row: 3, col: 5 }] },
            { id: "D", positions: [{ row: 0, col: 3 }, { row: 5, col: 3 }] },
        ],
    },
    {
        level: 23,
        size: 6,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 5, col: 0 }] },
            { id: "B", positions: [{ row: 0, col: 5 }, { row: 5, col: 5 }] },
            { id: "C", positions: [{ row: 2, col: 2 }, { row: 3, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 1 }, { row: 4, col: 4 }] },
        ],
    },
    {
        level: 24,
        size: 6,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 1 }, { row: 5, col: 1 }] },
            { id: "B", positions: [{ row: 0, col: 4 }, { row: 5, col: 4 }] },
            { id: "C", positions: [{ row: 1, col: 0 }, { row: 4, col: 5 }] },
            { id: "D", positions: [{ row: 1, col: 5 }, { row: 4, col: 0 }] },
        ],
    },
    {
        level: 25,
        size: 6,
        pairs: [
            { id: "A", positions: [{ row: 0, col: 0 }, { row: 5, col: 5 }] },
            { id: "B", positions: [{ row: 0, col: 5 }, { row: 5, col: 0 }] },
            { id: "C", positions: [{ row: 2, col: 2 }, { row: 3, col: 3 }] },
            { id: "D", positions: [{ row: 1, col: 1 }, { row: 4, col: 4 }] },
            { id: "E", positions: [{ row: 1, col: 4 }, { row: 4, col: 1 }] },
        ],
    },
];


function calculateScore(playTimeInSeconds, paths, levelData) {
    const correctAnswers = Object.keys(paths).length
    let score = calculateBaseScore(correctAnswers, levelData.pairs.length)
    const penaltyThreshold = 2 ** (levelData.size - 2)
    const penaltyByTime = Math.max(0, (playTimeInSeconds - penaltyThreshold) * 5)
    score -= Math.min(penaltyByTime, 300)
    return Math.max(Math.round(score), 0)
}

function calculateBaseScore(correctAnswer, totalQuestions) {
    return Math.round((1000 * correctAnswer) / totalQuestions)
}
