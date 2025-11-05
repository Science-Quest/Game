import { useEffect, useRef, useState } from "react"
import { OptionGroup, StartPlace, FinishPlace } from "./block-types"
import Penguin from "./Penguin"
import ResultNotification from "../../components/ResultNotification"
import ResultPage from "../../components/ResultPage"
import { useTimer } from "../../utilities/timer"
import { Howl } from "howler"

const levels = [
    {
        "level": 1,
        "questions": [
            { "question": "2 + 3 = ...", "options": [5, 6], "answer": 5 },
            { "question": "7 - 4 = ...", "options": [2, 3, 5], "answer": 3 },
            { "question": "7 - 4 = ...", "options": [2, 3, 5], "answer": 3 }
        ]
    },
    {
        "level": 2,
        "questions": [
            { "question": "6 - 2 = ...", "options": [3, 4], "answer": 4 },
            { "question": "1 + 8 = ...", "options": [8, 9, 10], "answer": 9 }
        ]
    },
    {
        "level": 3,
        "questions": [
            { "question": "2 + 6 - 3 = ...", "options": [5, 4, 6], "answer": 5 },
            { "question": "9 - 7 + 2 = ...", "options": [3, 4], "answer": 4 }
        ]
    },
    {
        "level": 4,
        "questions": [
            { "question": "4 + 3 = ...", "options": [6, 7, 8], "answer": 7 },
            { "question": "8 - 5 = ...", "options": [2, 3, 4], "answer": 3 }
        ]
    },
    {
        "level": 5,
        "questions": [
            { "question": "9 - 2 + 1 = ...", "options": [7, 8], "answer": 8 },
            { "question": "3 + 5 - 4 = ...", "options": [4, 5, 6], "answer": 4 }
        ]
    },
    {
        "level": 6,
        "questions": [
            { "question": "5 + 4 - 6 = ...", "options": [2, 3], "answer": 3 },
            { "question": "7 - 2 - 1 = ...", "options": [4, 5], "answer": 4 }
        ]
    },
    {
        "level": 7,
        "questions": [
            { "question": "6 + 2 + 1 = ...", "options": [8, 9, 10], "answer": 9 },
            { "question": "9 - 7 + 4 = ...", "options": [5, 6], "answer": 6 }
        ]
    },
    {
        "level": 8,
        "questions": [
            { "question": "3 + 2 + 5 = ...", "options": [9, 10], "answer": 10 },
            { "question": "1 + 7 - 5 = ...", "options": [2, 3, 4], "answer": 3 }
        ]
    },
    {
        "level": 9,
        "questions": [
            { "question": "8 - 3 + 2 = ...", "options": [6, 7], "answer": 7 },
            { "question": "4 + 2 - 1 = ...", "options": [4, 5], "answer": 5 }
        ]
    },
    {
        "level": 10,
        "questions": [
            { "question": "7 - 3 + 5 = ...", "options": [9, 10], "answer": 9 },
            { "question": "2 + 5 - 2 = ...", "options": [4, 5], "answer": 5 }
        ]
    },

    {
        "level": 11,
        "questions": [
            { "question": "2 × 3 = ...", "options": [5, 6, 7], "answer": 6 },
            { "question": "8 ÷ 4 = ...", "options": [1, 2, 3], "answer": 2 }
        ]
    },
    {
        "level": 12,
        "questions": [
            { "question": "(2 × 3) ÷ 2 = ...", "options": [2, 3], "answer": 3 },
            { "question": "9 ÷ 3 × 2 = ...", "options": [5, 6], "answer": 6 }
        ]
    },
    {
        "level": 13,
        "questions": [
            { "question": "(6 ÷ 2) × 3 = ...", "options": [6, 9], "answer": 9 },
            { "question": "4 × (2 ÷ 2) = ...", "options": [2, 3, 4], "answer": 4 }
        ]
    },
    {
        "level": 14,
        "questions": [
            { "question": "8 ÷ (2 × 2) = ...", "options": [2, 4], "answer": 2 },
            { "question": "(3 × 2) × 2 = ...", "options": [10, 12], "answer": 12 }
        ]
    },
    {
        "level": 15,
        "questions": [
            { "question": "9 ÷ (3 ÷ 1) = ...", "options": [2, 3], "answer": 3 },
            { "question": "(8 ÷ 2) ÷ 2 = ...", "options": [2, 4], "answer": 2 }
        ]
    },
    {
        "level": 16,
        "questions": [
            { "question": "(2 × 2) × 2 = ...", "options": [6, 8], "answer": 8 },
            { "question": "12 ÷ (3 × 2) = ...", "options": [2, 3, 4], "answer": 2 }
        ]
    },
    {
        "level": 17,
        "questions": [
            { "question": "(5 × 3) ÷ 5 = ...", "options": [2, 3], "answer": 3 },
            { "question": "15 ÷ (3 × 1) = ...", "options": [4, 5, 6], "answer": 5 }
        ]
    },
    {
        "level": 18,
        "questions": [
            { "question": "(4 × 2) ÷ 2 = ...", "options": [3, 4], "answer": 4 },
            { "question": "(9 ÷ 3) × 2 = ...", "options": [5, 6], "answer": 6 }
        ]
    },
    {
        "level": 19,
        "questions": [
            { "question": "(2 × 4) × 2 = ...", "options": [12, 14, 16], "answer": 16 },
            { "question": "(12 ÷ 2) ÷ 3 = ...", "options": [2, 3], "answer": 2 }
        ]
    },
    {
        "level": 20,
        "questions": [
            { "question": "(18 ÷ 3) × 2 = ...", "options": [10, 12], "answer": 12 },
            { "question": "20 ÷ (2 × 2) = ...", "options": [4, 5], "answer": 5 }
        ]
    },

    {
        "level": 21,
        "questions": [
            { "question": "12 + 7 - 5 = ...", "options": [13, 14], "answer": 14 },
            { "question": "25 - 14 + 9 = ...", "options": [20, 21], "answer": 20 }
        ]
    },
    {
        "level": 22,
        "questions": [
            { "question": "15 ÷ 3 + 4 = ...", "options": [8, 9], "answer": 9 },
            { "question": "40 ÷ 5 - 2 = ...", "options": [6, 7], "answer": 6 }
        ]
    },
    {
        "level": 23,
        "questions": [
            { "question": "(20 - 8) ÷ 2 = ...", "options": [5, 6], "answer": 6 },
            { "question": "(30 ÷ 6) + 12 = ...", "options": [16, 17], "answer": 17 }
        ]
    },
    {
        "level": 24,
        "questions": [
            { "question": "14 × 2 - 10 = ...", "options": [18, 20], "answer": 18 },
            { "question": "(22 - 7) + 10 = ...", "options": [24, 25], "answer": 25 }
        ]
    },
    {
        "level": 25,
        "questions": [
            { "question": "(18 ÷ 3) + (25 - 17) = ...", "options": [9, 11], "answer": 11 },
            { "question": "45 - (20 ÷ 2) = ...", "options": [33, 35], "answer": 35 }
        ]
    }
]


export default function PenguinDashApp(params) {

    const penguinJumpSound = useRef(new Howl({src: '/sounds/jump.mp3'}))

    const levelParam = params.level

    const levelNumber = parseInt(levelParam, 10)
    const level = levels.find(l => l.level === levelNumber)

    const [showResultPage, setShowResultPage] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [penguinPosition, setPenguinPosition] = useState({ x: 0, y: 0 })
    const [result, setResult] = useState({ isFinish: false, isCorrect: null })
    const [gameStats, setGameStats] = useState(null)
    const [correctCount, setCorrectCount] = useState(0)
    const finishRef = useRef()


    const startPosition = useRef()
    const gridRef = useRef()
    const totalQuestions = useRef(level ? level.questions.length : 0)
    const seaComponentHeight = 130

    const timer = useTimer()

    // If invalid level, show message
    if (!level) {
        return <p className="text-center mt-20 text-xl">Level {levelNumber} not found ❌</p>
    }

    // * PUT PENGUIN IN INITIAL POSITION
    useEffect(() => {
        setPenguinPosition({
            x: startPosition.current.offsetWidth / 2,
            y: seaComponentHeight * (totalQuestions.current + 2),
        })
    }, [])

    // * CHECK WHETHER THE ANSWER IS WRONG OR NOT
    useEffect(() => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === level.questions[activeQuestion - 1].answer
    const isLastQuestion = activeQuestion === totalQuestions.current

    if (isCorrect) {
        if (isLastQuestion) {
            // Kalau soal terakhir benar → lompat ke balok finish
            const gridWidth = gridRef.current.offsetWidth
            const finishX = gridWidth / 2
            const finishY = seaComponentHeight // posisi kira-kira di atas balok finish

            setPenguinPosition({ x: finishX, y: finishY })

            // tunggu 1 detik supaya penguin sempat "melompat"
            setTimeout(() => {
                setResult({ isFinish: true, isCorrect: true })
                finishCurrentGame()
            }, 1000)
        } else {
            // kalau belum soal terakhir, lanjut ke pertanyaan berikutnya
            setResult({ isCorrect: true, isFinish: false })
        }
    } else {
        // kalau jawaban salah
        setResult({ isCorrect: false, isFinish: true })
        finishCurrentGame()
    }
}, [selectedOption])


    // * MAKE THE PAGE UNSCROLLABLE WHEN SHOWING RESULT NOTIFICATION
    useEffect(() => {
        document.body.style.overflow = result.isFinish ? "hidden" : "auto"
    }, [result.isFinish])

    const handleOptionButtonClick = (rowIndex, colIndex, optionsLength) => {
    penguinJumpSound.current.play()

    const selected = level.questions[rowIndex].options[colIndex]
    const isCorrect = selected === level.questions[rowIndex].answer
    const isLastQuestion = rowIndex === totalQuestions.current - 1

    // posisi klik pada grid (animasi lompatan ke es yang diklik)
    let gridWidth = gridRef.current.offsetWidth
    let iceWidth = gridWidth / optionsLength
    let positionX = iceWidth / 2 + iceWidth * colIndex
    let positionY = 2 * seaComponentHeight + seaComponentHeight * (totalQuestions.current - rowIndex - 1)

    // langsung buat penguin lompat ke es yang diklik
    setPenguinPosition({ x: positionX, y: positionY })

    if (!isCorrect) {
        // jawaban salah -> langsung game over, correctCount tidak berubah
        setResult({ isCorrect: false, isFinish: true })
        finishCurrentGame()
        return
    }

    // jawaban benar -> tambah hitungan benar
    const newCorrect = correctCount + 1
    setCorrectCount(newCorrect)

    if (isLastQuestion) {
    // beri waktu animasi lompatan ke es yang terakhir dulu (klik)
    setTimeout(() => {
        // safety checks
        const gridEl = gridRef.current
        const finishEl = finishRef.current

        if (gridEl && finishEl) {
            const gridRect = gridEl.getBoundingClientRect()
            const finishRect = finishEl.getBoundingClientRect()

            // x relatif ke grid: jarak kiri finish ke kiri grid + setengah lebar finish
            const finishX = (finishRect.left - gridRect.left) + (finishRect.width / 2)

            // Geser sedikit ke atas (penguin berdiri di atas es)
            const finishY = (finishRect.top - gridRect.top) + (finishRect.height / 2) - 60


            // sekarang set posisi penguin ke koordinat relatif ini
            setPenguinPosition({ x: finishX, y: finishY })
            console.log("gridRect:", gridRect)
            console.log("finishRect:", finishRect)
            console.log("computed finishX, finishY:", finishX, finishY)
            console.log("penguinPosition before set:", penguinPosition)

        } else {
            // fallback: grid tengah bottom
            const gridWidth = gridEl ? gridEl.offsetWidth : 0
            setPenguinPosition({ x: gridWidth ? gridWidth / 2 : 0, y: seaComponentHeight })
        }

        // selesai game
        setResult({ isCorrect: true, isFinish: true })
        finishCurrentGame(newCorrect)
    }, 700)
} else {
        // bukan soal terakhir -> lanjut ke soal berikutnya
        setActiveQuestion(prev => prev + 1)
        setSelectedOption(selected)
        setResult({ isCorrect: true, isFinish: false })
    }
}



    const calculatePenaltiedScore = (totalQuestions, playTimeInSeconds) => {
        const MAX_SCORE_PENALTY = 300
        const THRESHOLD_PER_QUESTION = 1
        let score = calculateBaseScore()
        let penaltyThreshold = THRESHOLD_PER_QUESTION * totalQuestions
        let penaltyByTime = Math.max(0, (playTimeInSeconds - penaltyThreshold) * 5)
        score -= Math.min(penaltyByTime, MAX_SCORE_PENALTY)
        return Math.max(score, 0)
    }

    const calculateBaseScore = () => {
        return Math.round((1000 * (activeQuestion - 1)) / totalQuestions.current)
    }

    const finishCurrentGame = (totalCorrectArg = null) => {
    timer.stopTimer()
    setTimeout(() => setShowResultPage(true), 2000)

    const totalCorrect = totalCorrectArg !== null ? totalCorrectArg : correctCount

    setGameStats({
        level: levelNumber,
        totalQuestions: totalQuestions.current,
        totalCorrect: totalCorrect,
        time: timer.time,
        score: calculatePenaltiedScore(totalQuestions.current, timer.time),
    })
}


    if (showResultPage) {
        return <ResultPage questName={"Penguin Dash"} gameStats={gameStats} />
    }

    return (
        <div>
            {result.isFinish && <ResultNotification isCorrect={result.isCorrect} />}
            <div
                id="question"
                className="fixed z-50 flex items-center justify-center  top-4 left-1/2 -translate-x-1/2 w-[90%] min-h-24 rounded-lg bg-background ring-4 text-dark text-xl font-semibold p-4"
            >
                {activeQuestion >= totalQuestions.current ? (
                    <button className="flex flex-row bg-primary rounded-lg px-6 py-4 gap-x-4">
                        <p className="font-bold text-xl">FINISH</p>
                    </button>
                ) : (
                    level.questions[activeQuestion].question
                )}
            </div>
            <img src="/images/penguin-dash/ice-wall.png" alt="Ice Wall" className="w-full h-40" />
            <div
                id="sea"
                ref={gridRef}
                className="relative z-10 flex flex-col-reverse gap-y-12 items-center max-w-[600px] mx-auto"
            >
                {penguinPosition.x !== 0 && penguinPosition.y !== 0 && <Penguin position={penguinPosition} />}
                <StartPlace ref={startPosition} />
                {level.questions.map((questionDetail, index) => (
                    <OptionGroup
                        key={index}
                        row={index}
                        options={questionDetail.options}
                        optionsLength={questionDetail.options.length}
                        isActive={activeQuestion === index}
                        handleOptionButtonClick={handleOptionButtonClick}
                    />
                ))}
                <div className="h-[82px] max-w-[600px] w-full">
                    <img src="/images/penguin-dash/finish-line.png" alt="Finish line" className="w-full" />
                </div>
                <FinishPlace
                    ref={finishRef}
                    handleClick={() => {
                        // bila user masih ingin bisa klik manual benderanya
                        const gridWidth = gridRef.current ? gridRef.current.offsetWidth : 0
                        const fallbackX = gridWidth ? gridWidth / 2 : startPosition.current?.offsetWidth / 2 || 0
                        setPenguinPosition({ x: fallbackX, y: 0 })
                        setActiveQuestion(prev => prev + 1)
                        setResult({ isFinish: true, isCorrect: true })
                        setCorrectCount(prev => prev + 1)
                        finishCurrentGame(correctCount + 1)
                    }}
                    isFinish={activeQuestion === totalQuestions.current}
                />
            </div>
        </div>
    )
}
