import { useEffect, useRef, useState } from "react";

export function useTimer(run = true, interval = 1000) {
    const [time, setTime] = useState(0);
    const startRef = useRef(Date.now());

    const [isRunning, setIsRunning] = useState(run)

    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            const now = Date.now();
            setTime(Math.floor((now - startRef.current) / 1000));
        }, interval);

        return () => clearInterval(id);
    }, [isRunning, interval]);

    // useEffect(() => {
    //     console.log(time)
    // }, [time])

    return {time, stopTimer : () => setIsRunning(false)};
}