import { useEffect, useRef, useState } from "react"
import { OptionGroup, StartPlace, FinishPlace } from "./block-types"
import Penguin from "./Penguin"
import ResultNotification from "./ResultNotification"
import ResultPage from "./ResultPage"
import { useTimer } from "../../utilities/timer"

const levels = [
    {
        level: 1,
        questions: [
            {
                question: "2 + 3 = ...",
                options: [5, 7],
                answer: 5
            },
            {
                question: "7 - 2 = ...",
                options: [9, 2, 5],
                answer: 5
            },
            {
                question: "12 + 4 = ...",
                options: [14, 16, 15],
                answer: 16
            }
        ]
    }
]

export default function App () {

    const level = useRef(levels[0]).current
    const [showResultPage, setShowResultPage] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [penguinPosition, setPenguinPosition] = useState({x: 0, y: 0})
    const [result, setResult] = useState({ isFinish: false, isCorrect: null })
    const [gameStats, setGameStats] = useState(null)

    const startPosition = useRef()
    const gridRef = useRef()
    const totalQuestions = useRef(level.questions.length)
    const seaComponentHeight = 130 // h-[82px] pada OptionButton + gap-y-12 pada <div id='sea'>

    const timer = useTimer()
    
    // * PUT PENGUIN IN INITIAL POSITION
    useEffect(() => {
        setPenguinPosition(
            {
                x: startPosition.current.offsetWidth / 2, 
                y: seaComponentHeight * (totalQuestions.current + 2)
            }
        )
    }, [])

    // * CHECK WHETHER THE ANSWER IS WRONG OR NOT
    useEffect(() => {
        if (selectedOption === null) {
            return
        }

        // console.log('Selected option:' + selectedOption)
        // console.log('Answer:' + level.questions[activeQuestion - 1].answer)
        // console.log('Active Question:' + activeQuestion)
        // console.log('Total Question:' + totalQuestions)

        if (result.isCorrect) {
            finishCurrentGame()
        }
        else if (selectedOption !== level.questions[activeQuestion-1].answer) {
            setResult({isCorrect: false, isFinish: true})
            finishCurrentGame()
        }
    }, [selectedOption, result.isCorrect])


    // * MAKE THE PAGE UNSCROLLABLE WHEN SHOWING RESULT NOTIFICATION
    useEffect(() => {
        document.body.style.overflow = result.isFinish ? "hidden" : "auto";
    }, [result.isFinish]);


    const handleOptionButtonClick = (rowIndex, colIndex, optionsLength) => {
        // MAKE ONLY CURRENT QUESTION VISIBLE
        setActiveQuestion(activeQuestion + 1)

        // console.log('Row selected:' + rowIndex)
        // console.log('Col selected:' + colIndex)
        setSelectedOption(level.questions[rowIndex].options[colIndex])

        // CHANGE PENGUIN POSITION
        let gridWidth = gridRef.current.offsetWidth
        let iceWidth = gridWidth / optionsLength

        let positionX = (iceWidth / 2) + iceWidth * colIndex
        let positionY = 2 * seaComponentHeight + seaComponentHeight * (totalQuestions.current - rowIndex - 1)

        setPenguinPosition({ x: positionX, y: positionY })
    }

    const calculatePenaltiedScore = (totalQuestions, playTimeInSeconds) => {
        const MAX_SCORE_PENALTY = 300
        const THRESHOLD_PER_QUESTION = 1

        let score = calculateBaseScore()

        // console.log("BASE SCORE:" + score)

        let penaltyThreshold = THRESHOLD_PER_QUESTION * totalQuestions
        let penaltyByTime = 0

        if ((playTimeInSeconds - penaltyThreshold) < 0) {
            penaltyByTime = 0
        } else {
            penaltyByTime = Math.min((playTimeInSeconds - penaltyThreshold) * 5, MAX_SCORE_PENALTY) 
        }

        // console.log("PENALTY BY TIME:" + penaltyByTime)

        score -= Math.round(penaltyByTime)

        return Math.max(score, 0)
    }

    const calculateBaseScore = () => {
        console.log(activeQuestion)
        return Math.round(1000 * (activeQuestion-1) / totalQuestions.current)
    }

    const finishCurrentGame = () => {
        timer.stopTimer()
        setTimeout(() => setShowResultPage(true), 2000)
        setGameStats(
            {
                level: 1,
                totalQuestions: totalQuestions.current,
                totalCorrect: activeQuestion - 1,
                time: timer.time,
                score: calculatePenaltiedScore(totalQuestions.current, timer.time),
            }
        )
    }

    if (showResultPage) {
        return <ResultPage gameStats={gameStats}/>
    } 
    return (
        <div>
            {
                (result.isFinish) ?
                <ResultNotification isCorrect={result.isCorrect} />
                :
                null
            }
            <div id="question" className="fixed z-50 flex items-center justify-center  top-4 left-1/2 -translate-x-1/2 w-[90%] min-h-24 rounded-lg bg-background ring-4 text-dark text-xl font-semibold p-4">
                {
                    (activeQuestion >= totalQuestions.current) ?
                    <button className="flex flex-row bg-primary rounded-lg px-6 py-4 gap-x-4">
                        <p className="font-bold text-xl">FINISH</p>
                    </button>
                    :
                    level.questions[activeQuestion].question
                }
            </div>
            <img src="/images/penguin-dash/ice-wall.png" alt="Ice Wall" className="w-full h-40" />
            <div id="sea" ref={gridRef} className="relative z-10 flex flex-col-reverse gap-y-12 items-center max-w-[600px] mx-auto">
                {
                    (penguinPosition.x === 0 && penguinPosition.y === 0) ?
                    null
                    :
                    <Penguin position={penguinPosition}/>
                }
                <StartPlace ref={startPosition} />
                {
                    [...levels[0].questions].map((questionDetail, index) => 
                        <OptionGroup 
                            row={index}
                            options={questionDetail.options}
                            optionsLength={questionDetail.options.length} 
                            isActive={activeQuestion === index} 
                            handleOptionButtonClick={handleOptionButtonClick}
                        ></OptionGroup>
                    )
                }
                <div className="h-[82px] max-w-[600px] w-full">
                    <img src="/images/penguin-dash/finish-line.png" alt="Finish line" className="w-full" />
                </div>
                <FinishPlace 
                    handleClick={() => {
                        setPenguinPosition({ x: startPosition.current.offsetWidth / 2, y: 0 })
                        setActiveQuestion(activeQuestion + 1)
                        setResult({isFinish: true, isCorrect: true})
                    } } 
                    isFinish={activeQuestion === totalQuestions.current}
                />
            </div>
        </div>
    )
}