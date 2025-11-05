import { useEffect } from "react";

export function usePreloadImages(srcArray) {
    useEffect(() => {
        srcArray.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [srcArray]);
}
