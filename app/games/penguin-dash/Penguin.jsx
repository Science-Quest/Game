
import { motion, useAnimationControls } from "motion/react"
import { useRef, useEffect, memo } from "react"

const Penguin = memo(({ position, className }) => {
    const controls = useAnimationControls();
    const prev = useRef(position);
    const first = useRef(true);

    useEffect(() => {
        const from = prev.current;
        const to = position;

        if (first.current) {
            // First paint: jump to the initial place (no animation)
            controls.set({ x: to.x, y: to.y });
            first.current = false;
        } else {
            // Subsequent updates: arc from previous -> peak -> new
            const arc = 120; // static; make this dynamic if you want
            controls.start({
                x: [from.x, to.x],
                y: [from.y, from.y - arc, to.y],
                transition: { duration: 1, ease: "easeInOut" },
            });
        }

        prev.current = to; // ready for next move
    }, [position, controls]);

    return (
        // Wrapper can have layout classes, but avoid transform utilities here too.
        <div className={`absolute ${className}`} style={{ left: 0, top: 0 }}>
            <motion.div
                animate={controls}
                // IMPORTANT: No Tailwind transform utilities on this element.
                className="absolute w-16 h-16 z-50 bg-[url(/images/penguin-dash/penguin.png)] bg-contain bg-no-repeat"
                style={{ willChange: "transform" }}
            />
        </div>
    );
});


export default Penguin