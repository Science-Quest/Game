import { LucideRefreshCcw, LucideArrowBigRight, LucideHome } from "lucide-react";
import { Link, useLocation } from "react-router";
import { sounds } from "../utilities/sound";
import TimeDisplay from "./TimeDisplay";

export default function ResultPage({ gameStats }) {
  const { level, totalQuestions, totalCorrect, time, score } = gameStats;

  // Main sound
  let soundEffect = totalCorrect === totalQuestions ? sounds.victory : sounds.lose;
  soundEffect.play();

  // Get current route info
  const currentLocation = useLocation();
  const parts = currentLocation.pathname.split("/").filter(Boolean);
  const base = `/${parts[0]}/${parts[1]}`;
  const gameKey = parts[1];
  const currentLevel = Number(parts[2] || 1);
  const nextLevel = currentLevel + 1;

  // Nama game
  const gameNames = {
    "penguin-dash": "Penguin Dash",
    "connect-things": "Connect Things",
    "box-recall": "Box Recall",
    "bomb-road": "Bomb Road",
  };
  const gameName = gameNames[gameKey] || "Unknown Game";

  return (
    <div
      id="result-page"
      className="relative min-h-screen w-full flex flex-col justify-between items-center 
                 bg-[#89D7FF] text-light overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center text-center 
                   px-4 sm:px-6 md:px-8 pt-1 sm:pt-8 pb-4 sm:pb-6 w-full max-w-[700px] flex-grow"
      >
        {/* Title */}
        {totalCorrect === totalQuestions ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-white drop-shadow-md">
              SELAMAT
            </h2>
            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight drop-shadow-md">
              KAMU BERHASIL !!!
            </h1>
          </div>
        ) : (
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            KAMU GAGAL !!!
          </h1>
        )}

        {/* Trophy image */}
        <div className="relative flex justify-center items-center w-full mt-4 sm:mt-6">
          <img
            src="/images/trophy.png"
            alt="Trophy"
            className="w-[90px] sm:w-[130px] md:w-[150px] lg:w-[160px] 
                       h-auto object-contain drop-shadow-lg"
            loading="eager"
          />
        </div>

        <hr className="bg-white/70 h-[1.5px] w-full my-4 sm:my-6" />

        {/* Result details */}
        <div className="flex flex-col gap-y-2 sm:gap-y-3 w-full text-sm sm:text-lg md:text-xl font-semibold text-white">
          <div className="flex justify-between">
            <p>QUEST</p>
            <p>{gameName}</p>
          </div>
          <div className="flex justify-between">
            <p>LEVEL</p>
            <p>{level}</p>
          </div>
          <div className="flex justify-between">
            <p>WAKTU</p>
            <TimeDisplay seconds={time} />
          </div>
          <div className="flex justify-between">
            <p>TEPAT</p>
            <p>{totalCorrect} / {totalQuestions}</p>
          </div>
          <div className="flex justify-between">
            <p>SCORE</p>
            <p>+{score} pts</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div
        className="relative z-20 flex flex-col items-center gap-y-3 
                   px-4 sm:px-8 pb-6 sm:pb-10 w-full max-w-[700px]"
      >
        {/* Retry & Next sejajar */}
        <div className="flex justify-between items-center w-full max-w-[350px] sm:max-w-[400px] gap-3">
          {/* Retry */}
          <button
            onClick={() => window.location.reload()}
            className="flex justify-center items-center gap-x-2 
                       bg-[#54B9FF] hover:bg-[#3fa4ea] rounded-lg 
                       px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold 
                       w-[45%] transition-all duration-200"
          >
            <LucideRefreshCcw strokeWidth={2.5} />
            RETRY
          </button>

          {/* Next */}
          <Link to={level === 25 ? "/" : `${base}/${nextLevel}`} className="w-[45%]">
            <button
              className="flex justify-center items-center gap-x-2 
                         bg-[#54B9FF] hover:bg-[#3fa4ea] rounded-lg 
                         px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold 
                         w-full transition-all duration-200"
            >
              NEXT
              <LucideArrowBigRight strokeWidth={2.5} />
            </button>
          </Link>
        </div>

        {/* Back to Home */}
        <button
  onClick={() => (window.location.href = "http://sciencequest.local")}
  className="mx-auto flex flex-row justify-center items-center gap-x-2 
             bg-[#54B9FF] hover:bg-[#3fa4ea] rounded-lg 
             px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold 
             transition-all duration-200 w-[70%] sm:w-[40%] md:w-[30%]
             whitespace-nowrap leading-none"
>
  <LucideHome strokeWidth={2.5} className="shrink-0" />
  <span className="leading-none">Back to Home</span>
</button>
      </div>
    </div>
  );
}
