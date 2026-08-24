import {
  LucideRefreshCcw,
  LucideArrowBigRight,
  LucideHome,
} from "lucide-react";
import { Link } from "react-router";
import { useLocation } from "react-router";

import { sounds } from "../utilities/sound";
import TimeDisplay from "./TimeDisplay";

import { useEffect } from "react";
import axios from "axios";

export default function ResultPage({ gameStats }) {
  const { level, totalQuestions, totalCorrect, time, score } = gameStats;

  let soundEffect =
    totalCorrect === totalQuestions ? sounds.victory : sounds.lose;
  soundEffect.play();

  const currentLocation = useLocation();
  const parts = currentLocation.pathname.split("/").filter(Boolean);
  const base = `/${parts[0]}/${parts[1]}`;
  const currentLevel = Number(parts[2] || 1);
  const nextLevel = currentLevel + 1;

  async function submitProgress() {
    try {
      // STEP 1 — Load CSRF cookie (REQUIRED)
      await axios.get(`${import.meta.env.VITE_APP_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      // STEP 2 — Make authenticated POST request
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/progress/${gameId}/complete`,
        {
          level,
          score,
          num_of_correct: totalCorrect,
          time,
        },
        {
          withCredentials: true, // required for Sanctum
        }
      );

      console.log("Saved:", response.data);
    } catch (error) {
      console.error("Error saving progress:", error.response?.data || error);
    }
  }

  useEffect(() => {
    console.log("useEffect ran");
    submitProgress();
  }, []);

  return (
    <div
      id="result-page"
      className="relative min-h-screen w-screen text-light overflow-y-auto bg-transparent"
    >
      {/* Centered container with max-width so it looks good on desktop/tablet */}
      <div className="relative z-20 max-w-lg sm:max-w-2xl md:max-w-3xl w-full mx-auto flex flex-col items-center gap-y-4 px-4 py-12">
        {totalCorrect === totalQuestions ? (
          <div className="flex flex-col gap-y-2 items-center">
            <h2 className="font-bold text-xl">SELAM</h2>
            <h1 className="font-bold text-3xl">KAMU BERHASIL !!!</h1>
          </div>
        ) : (
          <h1 className="font-bold text-3xl">KAMU GAGAL !!!</h1>
        )}

        <img
          src="/images/trophy.png"
          alt="Big Trophy"
          width={235}
          height={212}
        />

        <hr className="bg-light h-2 w-full" />

        <div id="result-detail" className="flex flex-col gap-y-8 w-[95%]">
          <div className="flex flex-row justify-between w-full font-bold text-xl">
            <p>QUEST</p>
            <p>Box Recall</p>
          </div>
          <div className="flex flex-row justify-between w-full font-bold text-xl">
            <p>LEVEL</p>
            <p>{level}</p>
          </div>
          <div className="flex flex-row justify-between w-full font-bold text-xl">
            <p>WAKTU</p>
            <TimeDisplay seconds={time} />
          </div>
          <div className="flex flex-row justify-between w-full font-bold text-xl">
            <p>TEPAT</p>
            <p>
              {totalCorrect} / {totalQuestions}
            </p>
          </div>
          <div className="flex flex-row justify-between w-full font-bold text-xl">
            <p>SCORE</p>
            <p>+{score} pts</p>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-y-6 w-full max-w-[360px] mx-auto">
          {/* Row tombol retry + next */}
          <div className="flex flex-row w-full justify-between gap-x-4">
            <button
              onClick={() => window.location.reload()}
              className="flex flex-row items-center bg-primary rounded-lg px-4 py-3 gap-x-2 min-w-[130px] justify-center"
            >
              <LucideRefreshCcw strokeWidth={2.5} size={20} />
              <p className="font-bold text-base">RETRY</p>
            </button>

            <Link to={level === 25 ? "/" : `${base}/${nextLevel}`}>
              <button className="flex flex-row items-center bg-primary rounded-lg px-4 py-3 gap-x-2 min-w-[130px] justify-center">
                <p className="font-bold text-base">NEXT</p>
                <LucideArrowBigRight strokeWidth={2.5} size={20} />
              </button>
            </Link>
          </div>

          {/* Tombol Back to Home */}
          <button
            className="mx-auto flex flex-row items-center justify-center bg-primary rounded-lg px-4 py-3 gap-x-2 max-w-[190px] w-full"
            onClick={() =>
              (window.location.href = import.meta.env.VITE_APP_URL)
            }
          >
            <LucideHome strokeWidth={2.5} size={20} />
            <p className="font-bold text-base">Back to home</p>
          </button>
        </div>
      </div>

      {/* Background Overlay (tidak memblok interaksi/scroll karena pointer-events-none) */}
      <div
        id="darken-background"
        className="absolute z-10 top-0 left-0 bg-black opacity-35 w-full h-full pointer-events-none"
      ></div>
    </div>
  );
}
