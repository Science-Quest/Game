import { LucideRefreshCcw, LucideArrowBigRight } from "lucide-react"
import TimeDisplay from "../../components/TimeDisplay"

export default function ResultPage({gameStats}) {
    const {
        level,
        totalQuestions,
        totalCorrect,
        time,
        score
    } = gameStats

    console.log(gameStats)

    return(
        <div id="result-page" className="relative h-[100vh] w-[100vw] text-light">
            <div className="relative h-full z-20 flex flex-col items-center gap-y-8 px-8 py-12">
                {
                    (totalCorrect === totalQuestions)? 
                    <div className="flex flex-col gap-y-2 items-center">
                        <h2 className="font-bold text-xl">SELAMAT</h2>
                        <h1 className="font-bold text-3xl">KAMU BERHASIL !!!</h1>
                    </div>
                    :
                        <h1 className="font-bold text-3xl">KAMU GAGAL !!!</h1>
                }
                <img src="/images/trophy.png" alt="Big Trophy" width={235} height={212} />
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
                        <TimeDisplay seconds={time}/>
                    </div>
                    <div className="flex flex-row justify-between w-full font-bold text-xl">
                        <p>TEPAT</p>
                        <p>{totalCorrect} / {totalQuestions}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full font-bold text-xl">
                        <p>SCORE</p>
                        <p>+{score} pts</p>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <button className="flex flex-row bg-primary rounded-lg px-6 py-4 gap-x-4">
                        <LucideRefreshCcw strokeWidth={2.5} />
                        <p className="font-bold text-xl">RETRY</p>
                    </button>
                    <button className="flex flex-row bg-primary rounded-lg px-6 py-4 gap-x-4">
                        <p className="font-bold text-xl">NEXT</p>
                        <LucideArrowBigRight strokeWidth={2.5} />
                    </button>
                </div>
            </div>
            <div id="darken-background" className="absolute z-10 top-0 left-0 bg-black opacity-35 w-full h-full">
            </div>
        </div>
    )
}