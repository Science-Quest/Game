import { useEffect, useRef, useState } from "react";
import { OptionGroup, StartPlace, FinishPlace } from "./block-types";
import Penguin from "./Penguin";
import ResultNotification from "../../components/ResultNotification";
import ResultPage from "../../components/ResultPage";
import { useTimer } from "../../utilities/timer";
import { Howl } from "howler";

const levels = [
  {
    level: 1,
    questions: [
      { question: "2 + 3 = ...", options: [5, 6], answer: 5 },
      { question: "7 - 4 = ...", options: [2, 3, 5], answer: 3 },
      { question: "10 - 3 = ...", options: [7, 9], answer: 7 },
    ],
  },
  {
    level: 2,
    questions: [
      { question: "6 + 2 + 1 = ...", options: [8, 9, 10], answer: 9 },
      { question: "9 - 7 + 4 = ...", options: [5, 6], answer: 6 },
    ],
  },
  {
    level: 3,
    questions: [
      { question: "3 + 2 + 5 = ...", options: [9, 10], answer: 10 },
      { question: "1 + 7 - 5 = ...", options: [2, 3, 4], answer: 3 },
    ],
  },
  {
    level: 4,
    questions: [
      { question: "8 - 3 + 2 = ...", options: [6, 7], answer: 7 },
      { question: "4 + 2 - 1 = ...", options: [4, 5], answer: 5 },
    ],
  },
  {
    level: 5,
    questions: [
      { question: "7 - 3 + 5 = ...", options: [9, 10], answer: 9 },
      { question: "2 + 5 - 2 = ...", options: [4, 5], answer: 5 },
    ],
  },
  {
    level: 6,
    questions: [
      { question: "15 + 7 = ...", options: [20, 22], answer: 22 },
      { question: "1 + 8 + 10 = ...", options: [8, 19, 20], answer: 19 },
    ],
  },
  {
    level: 7,
    questions: [
      { question: "10 + 17 + 2 = ...", options: [23, 29], answer: 29 },
      { question: "12 + 6 + 23 = ...", options: [41, 38, 35], answer: 41 },
      { question: "24 + 12 + 7 = ...", options: [43, 37], answer: 43 },
    ],
  },
  {
    level: 8,
    questions: [
      { question: "20 - 3 - 4 = ...", options: [13, 15, 11], answer: 13 },
      { question: "12 - (5 - 6) = ...", options: [1, 3, 4], answer: 1 },
    ],
  },
  {
    level: 9,
    questions: [
      { question: "24 - 10 - 3 = ...", options: [11, 7, 10], answer: 11 },
      { question: "32 - 12 - 15 = ...", options: [10, 5], answer: 5 },
      { question: "(35 - 15) - 4 = ...", options: [16, 17, 18], answer: 16 },
    ],
  },
  {
    level: 10,
    questions: [
      { question: "25 + 14 - 26 = ...", options: [12, 13], answer: 13 },
      { question: "11 - 23 + 32 = ...", options: [16, 20, 12], answer: 20 },
    ],
  },

  {
    level: 11,
    questions: [
      {
        question: "12 + 23 - 15 + 14 = ...",
        options: [33, 34, 35],
        answer: 34,
      },
      {
        question: "45 - 22 + 18 - 11 = ...",
        options: [29, 30, 31],
        answer: 30,
      },
      {
        question: "17 + 26 + 19 - 20 = ...",
        options: [41, 42, 43],
        answer: 42,
      },
      {
        question: "33 + 15 - 12 + 21 = ...",
        options: [56, 57, 58],
        answer: 57,
      },
    ],
  },
  {
    level: 12,
    questions: [
      {
        question: "28 + 34 - 19 + 22 = ...",
        options: [64, 65, 66],
        answer: 65,
      },
      {
        question: "47 - 18 + 26 - 12 = ...",
        options: [42, 43, 44],
        answer: 43,
      },
      {
        question: "36 + 29 - 14 + 11 = ...",
        options: [61, 62, 63],
        answer: 62,
      },
      {
        question: "25 + 48 - 22 + 17 = ...",
        options: [67, 68, 69],
        answer: 68,
      },
    ],
  },
  {
    level: 13,
    questions: [
      {
        question: "59 - 27 + 18 - 14 = ...",
        options: [35, 36, 37],
        answer: 36,
      },
      {
        question: "44 + 33 - 25 + 12 = ...",
        options: [63, 64, 65],
        answer: 64,
      },
      {
        question: "19 + 28 + 22 - 17 = ...",
        options: [51, 52, 53],
        answer: 52,
      },
      {
        question: "32 + 45 - 21 + 18 = ...",
        options: [73, 74, 75],
        answer: 74,
      },
    ],
  },
  {
    level: 14,
    questions: [
      {
        question: "61 + 27 - 35 + 14 = ...",
        options: [67, 68, 69],
        answer: 67,
      },
      {
        question: "29 + 38 + 22 - 31 = ...",
        options: [57, 58, 59],
        answer: 58,
      },
      {
        question: "46 - 19 + 33 - 22 = ...",
        options: [37, 38, 39],
        answer: 38,
      },
      {
        question: "53 + 21 - 18 + 29 = ...",
        options: [84, 85, 86],
        answer: 85,
      },
    ],
  },
  {
    level: 15,
    questions: [
      {
        question: "72 - 34 + 29 - 18 = ...",
        options: [48, 49, 50],
        answer: 49,
      },
      {
        question: "25 + 47 - 22 + 36 = ...",
        options: [85, 86, 87],
        answer: 86,
      },
      {
        question: "58 + 19 - 23 + 15 = ...",
        options: [68, 69, 70],
        answer: 69,
      },
      {
        question: "41 + 27 + 18 - 29 = ...",
        options: [56, 57, 58],
        answer: 57,
      },
    ],
  },
  {
    level: 16,
    questions: [
      {
        question: "124 + 215 - 138 + 92 = ...",
        options: [292, 293, 294],
        answer: 293,
      },
      {
        question: "356 - 142 + 218 - 127 = ...",
        options: [304, 305, 306],
        answer: 305,
      },
    ],
  },
  {
    level: 17,
    questions: [
      {
        question: "478 - 236 + 129 - 87 = ...",
        options: [283, 284, 285],
        answer: 284,
      },
      {
        question: "129 + 387 - 215 + 142 = ...",
        options: [442, 443, 444],
        answer: 443,
      },
    ],
  },
  {
    level: 18,
    questions: [
      {
        question: "246 + 138 - 92 + 117 = ...",
        options: [408, 409, 410],
        answer: 409,
      },
      {
        question: "527 - 218 + 134 - 76 = ...",
        options: [366, 367, 368],
        answer: 367,
      },
    ],
  },
  {
    level: 19,
    questions: [
      {
        question: "635 - 427 + 218 - 89 = ...",
        options: [336, 337, 338],
        answer: 337,
      },
      {
        question: "198 + 267 - 134 + 79 = ...",
        options: [409, 410, 411],
        answer: 410,
      },
    ],
  },
  {
    level: 20,
    questions: [
      {
        question: "713 - 289 + 174 - 96 = ...",
        options: [501, 502, 503],
        answer: 502,
      },
      {
        question: "356 + 174 - 218 + 137 = ...",
        options: [448, 449, 450],
        answer: 449,
      },
    ],
  },
  {
    level: 21,
    questions: [
      { question: "(6 × 4) ÷ 3 = ...", options: [7, 8, 9], answer: 8 },
      { question: "12 ÷ (2 × 2) = ...", options: [2, 3, 4], answer: 3 },
      { question: "(5 × 3) ÷ 5 = ...", options: [2, 3, 4], answer: 3 },
      { question: "(18 ÷ 3) × 2 = ...", options: [11, 12, 13], answer: 12 },
    ],
  },
  {
    level: 22,
    questions: [
      { question: "24 ÷ (6 × 2) = ...", options: [1, 2, 3], answer: 2 },
      { question: "(8 × 7) ÷ 4 = ...", options: [13, 14, 15], answer: 14 },
      { question: "(9 × 2) ÷ 6 = ...", options: [2, 3, 4], answer: 3 },
      { question: "36 ÷ (9 ÷ 3) = ...", options: [11, 12, 13], answer: 12 },
    ],
  },
  {
    level: 23,
    questions: [
      { question: "(15 ÷ 3) × 4 = ...", options: [19, 20, 21], answer: 20 },
      { question: "48 ÷ (6 × 2) = ...", options: [3, 4, 5], answer: 4 },
      { question: "(7 × 5) ÷ (2 + 3) = ...", options: [6, 7, 8], answer: 7 }, // includes 2+3 inside
      { question: "(16 ÷ 4) × 3 = ...", options: [11, 12, 13], answer: 12 },
    ],
  },
  {
    level: 24,
    questions: [
      { question: "(9 × 6) ÷ 2 = ...", options: [26, 27, 28], answer: 27 },
      { question: "42 ÷ (7 × 1) = ...", options: [5, 6, 7], answer: 6 },
      { question: "(20 ÷ 5) × 9 = ...", options: [35, 36, 37], answer: 36 },
      { question: "56 ÷ (2 × 4) = ...", options: [6, 7, 8], answer: 7 },
    ],
  },
  {
    level: 25,
    questions: [
      { question: "(8 × 3) ÷ 2 = ...", options: [11, 12, 13], answer: 12 },
      { question: "72 ÷ (9 × 2) = ...", options: [3, 4, 5], answer: 4 },
      {
        question: "(10 ÷ 2) × (3 × 2) = ...",
        options: [29, 30, 31],
        answer: 30,
      },
      { question: "(18 ÷ 6) × 7 = ...", options: [20, 21, 22], answer: 21 },
    ],
  },
];

export default function PenguinDashApp(params) {
  const penguinJumpSound = useRef(new Howl({ src: "/sounds/jump.mp3" }));

  const levelParam = params.level;

  const levelNumber = parseInt(levelParam, 10);
  const level = levels.find((l) => l.level === levelNumber);

  const [showResultPage, setShowResultPage] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [penguinPosition, setPenguinPosition] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState({ isFinish: false, isCorrect: null });
  const [gameStats, setGameStats] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const finishRef = useRef();

  const startPosition = useRef();
  const gridRef = useRef();
  const totalQuestions = useRef(level ? level.questions.length : 0);
  const seaComponentHeight = 130;

  const timer = useTimer();

  // If invalid level, show message
  if (!level) {
    return (
      <p className="text-center mt-20 text-xl">
        Level {levelNumber} not found ❌
      </p>
    );
  }

  // * RESET STATE SETIAP GANTI LEVEL
  // * RESET STATE SETIAP GANTI LEVEL
  useEffect(() => {
    // Reset semua state utama agar tidak mewarisi dari level sebelumnya
    setActiveQuestion(0);
    setSelectedOption(null);
    setResult({ isFinish: false, isCorrect: null });
    setShowResultPage(false);
    setCorrectCount(0);
    setGameStats(null);
    setPenguinPosition({ x: 0, y: 0 });

    // Reset dan mulai timer ulang
    timer.stopTimer();
    timer.startTimer();

    // Update jumlah soal
    totalQuestions.current = level ? level.questions.length : 0;

    console.log(`Level ${levelNumber} dimulai ulang`);
  }, [levelNumber]);

  // * PUT PENGUIN IN INITIAL POSITION
  useEffect(() => {
    setPenguinPosition({
      x: startPosition.current.offsetWidth / 2,
      y: seaComponentHeight * (totalQuestions.current + 2),
    });
  }, []);

  // * CHECK WHETHER THE ANSWER IS WRONG OR NOT
  useEffect(() => {
    if (selectedOption === null) return;

    const isCorrect =
      selectedOption === level.questions[activeQuestion - 1].answer;
    const isLastQuestion = activeQuestion === totalQuestions.current;

    if (isCorrect) {
      if (isLastQuestion) {
        const gridWidth = gridRef.current.offsetWidth;
        const finishX = gridWidth / 2;
        const finishY = seaComponentHeight;
        setPenguinPosition({ x: finishX, y: finishY });
        setTimeout(() => {
          setResult({ isFinish: true, isCorrect: true });
          finishCurrentGame();
        }, 1000);
      } else {
        setResult({ isCorrect: true, isFinish: false });
      }
    } else {
      setResult({ isCorrect: false, isFinish: true });
      finishCurrentGame();
    }
  }, [selectedOption]);

  // * MAKE THE PAGE UNSCROLLABLE WHEN SHOWING RESULT NOTIFICATION
  useEffect(() => {
    document.body.style.overflow = result.isFinish ? "hidden" : "auto";
  }, [result.isFinish]);

  const handleOptionButtonClick = (rowIndex, colIndex, optionsLength) => {
    penguinJumpSound.current.play();

    const selected = level.questions[rowIndex].options[colIndex];
    const isCorrect = selected === level.questions[rowIndex].answer;
    const isLastQuestion = rowIndex === totalQuestions.current - 1;
    let gridWidth = gridRef.current.offsetWidth;
    let iceWidth = gridWidth / optionsLength;
    let positionX = iceWidth / 2 + iceWidth * colIndex;
    let positionY =
      2 * seaComponentHeight +
      seaComponentHeight * (totalQuestions.current - rowIndex - 1);
    setPenguinPosition({ x: positionX, y: positionY });

    if (!isCorrect) {
      setResult({ isCorrect: false, isFinish: true });
      finishCurrentGame();
      return;
    }
    const newCorrect = correctCount + 1;
    setCorrectCount(newCorrect);

    if (isLastQuestion) {
      setTimeout(() => {
        const gridEl = gridRef.current;
        const finishEl = finishRef.current;

        if (gridEl && finishEl) {
          const gridRect = gridEl.getBoundingClientRect();
          const finishRect = finishEl.getBoundingClientRect();
          const finishX =
            finishRect.left - gridRect.left + finishRect.width / 2;
          const finishY =
            finishRect.top - gridRect.top + finishRect.height / 2 - 60;
          setPenguinPosition({ x: finishX, y: finishY });
          console.log("gridRect:", gridRect);
          console.log("finishRect:", finishRect);
          console.log("computed finishX, finishY:", finishX, finishY);
          console.log("penguinPosition before set:", penguinPosition);
        } else {
          const gridWidth = gridEl ? gridEl.offsetWidth : 0;
          setPenguinPosition({
            x: gridWidth ? gridWidth / 2 : 0,
            y: seaComponentHeight,
          });
        }
        setResult({ isCorrect: true, isFinish: true });
        finishCurrentGame(newCorrect);
      }, 700);
    } else {
      setActiveQuestion((prev) => prev + 1);
      setSelectedOption(selected);
      setResult({ isCorrect: true, isFinish: false });
    }
  };

  const calculatePenaltiedScore = (
    totalQuestions,
    playTimeInSeconds,
    totalCorrect3
  ) => {
    const MAX_SCORE_PENALTY = 300;
    const THRESHOLD_PER_QUESTION = 1;
    let baseScore = Math.round((1000 * totalCorrect) / totalQuestions);
    let penaltyThreshold = THRESHOLD_PER_QUESTION * totalQuestions;
    let penaltyByTime = Math.max(0, (playTimeInSeconds - penaltyThreshold) * 5);
    let finalScore = baseScore - Math.min(penaltyByTime, MAX_SCORE_PENALTY);
    return Math.max(finalScore, 0);
  };

  const calculateBaseScore = (totalCorrectArg = correctCount) => {
    return Math.round((1000 * totalCorrectArg) / totalQuestions.current);
  };

  const finishCurrentGame = (totalCorrectArg = null) => {
    timer.stopTimer();
    setTimeout(() => setShowResultPage(true), 2000);

    const totalCorrect =
      totalCorrectArg !== null ? totalCorrectArg : correctCount;

    setGameStats({
      level: levelNumber,
      totalQuestions: totalQuestions.current,
      totalCorrect: totalCorrect,
      time: timer.time,
      score: calculatePenaltiedScore(
        totalQuestions.current,
        timer.time,
        totalCorrect
      ),
    });
  };

  if (showResultPage) {
    return <ResultPage questName={"Penguin Dash"} gameStats={gameStats} />;
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
      <img
        src="/images/penguin-dash/ice-wall.png"
        alt="Ice Wall"
        className="w-full h-40"
      />
      <div
        id="sea"
        ref={gridRef}
        className="relative z-10 flex flex-col-reverse gap-y-12 items-center max-w-[600px] mx-auto"
      >
        {penguinPosition.x !== 0 && penguinPosition.y !== 0 && (
          <Penguin position={penguinPosition} />
        )}
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
          <img
            src="/images/penguin-dash/finish-line.png"
            alt="Finish line"
            className="w-full"
          />
        </div>
        <FinishPlace
          ref={finishRef}
          handleClick={() => {
            const gridWidth = gridRef.current ? gridRef.current.offsetWidth : 0;
            const fallbackX = gridWidth
              ? gridWidth / 2
              : startPosition.current?.offsetWidth / 2 || 0;
            setPenguinPosition({ x: fallbackX, y: 0 });
            setActiveQuestion((prev) => prev + 1);
            setResult({ isFinish: true, isCorrect: true });
            setCorrectCount((prev) => prev + 1);
            finishCurrentGame(correctCount + 1);
          }}
          isFinish={activeQuestion === totalQuestions.current}
        />
      </div>
    </div>
  );
}
