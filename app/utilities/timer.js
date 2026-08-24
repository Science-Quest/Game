import { useEffect, useRef, useState } from "react";

function useTimer(run = true, interval = 1000) {
    const [time, setTime] = useState(0);
    const startRef = useRef(Date.now());
    const [isRunning, setIsRunning] = useState(run);

    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            const now = Date.now();
            setTime(Math.floor((now - startRef.current) / 1000));
        }, interval);

        return () => clearInterval(id);
    }, [isRunning, interval]);

    const startTimer = () => {
        startRef.current = Date.now();
        setIsRunning(true);
        setTime(0);
    };

    const stopTimer = () => setIsRunning(false);

    return { time, startTimer, stopTimer };
}

export { useTimer };
