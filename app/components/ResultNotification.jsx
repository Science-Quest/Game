import { motion } from "framer-motion";
import { sounds } from "../utilities/sound";

export default function ResultNotification({ isCorrect }) {
    const soundEffect = isCorrect
        ? sounds.correct
        : sounds.wrong
    soundEffect.play();

    return (
        <div
            style={{ top: window.scrollY }}
            className="absolute w-[100vw] h-full z-20 flex justify-center items-center"
        >
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="z-20 flex flex-col items-center bg-background rounded-2xl w-[175px] h-[225px] p-4 gap-y-4 shadow-lg"
            >
                {isCorrect ? (
                    <>
                        <img src="/images/success-quest.png" alt="" />
                        <p className="font-bold text-xl">FINISH</p>
                    </>
                ) : (
                    <>
                        <img src="/images/fail-quest.png" alt="" />
                        <p className="font-bold text-xl">SALAH</p>
                    </>
                )}
            </motion.div>

            <div
                id="overlay"
                className="z-10 absolute bg-black opacity-30 w-full h-full"
            ></div>
        </div>
    );
}
