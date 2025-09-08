import { useEffect, useState,useRef } from "react";
import { motion } from "motion/react";

const pathColors = {
    "🍎": { light: "bg-red-200", dark: "bg-red-400" },
    "🍌": { light: "bg-yellow-200", dark: "bg-yellow-400" },
    "🥕": { light: "bg-orange-200", dark: "bg-orange-400" },
    "🍇": { light: "bg-purple-200", dark: "bg-purple-400" },
    "🍈": { light: "bg-lime-200", dark: "bg-lime-400" },
};

const fruitPulse = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.5, 1], transition: { duration: 0.4 } },
};

// --- Pure helpers ---
const getCellContent = (level, row, col) => {
    for (let pair of level.pairs) {
        if (pair.positions.some((p) => p.row === row && p.col === col)) {
            return pair.id;
        }
    }
    return null;
};

const isCellInPath = (paths, row, col) => {
    return Object.values(paths).some((cells) =>
        cells.some((c) => c.row === row && c.col === col)
    );
};

const isAdjacent = (a, b) => {
    return (
        (Math.abs(a.row - b.row) === 1 && a.col === b.col) ||
        (Math.abs(a.col - b.col) === 1 && a.row === b.row)
    );
};

export default function GameGrid({ level, phase, paths, setPaths }) {
    
    const boxSelectionSound = useRef(new Howl({ src: '/sounds/cancel-selection-pop.mp3'}))
    const pathCancelationSound = useRef(new Howl({ src: '/sounds/cancel.mp3' }))
    const finishPathSound = useRef(new Howl({src: '/sounds/select-pop.mp3'}))
    
    const [activePath, setActivePath] = useState(null);
    
    // Handle mouse release
    useEffect(() => {
        const onGlobalMouseUp = () => {
            if (activePath) finalizeActivePath();
        };
        document.addEventListener("mouseup", onGlobalMouseUp);
        return () => document.removeEventListener("mouseup", onGlobalMouseUp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePath, paths]);

    const grid = Array.from({ length: level.size }, (_, row) =>
        Array.from({ length: level.size }, (_, col) => ({ row, col }))
    );

    // Start dragging from an image cell
    const handleStart = (row, col) => {
        if (phase !== "do") return;
        const symbol = getCellContent(level, row, col);
        if (!symbol) return;

        // If this pair is already connected, pressing its image cancels the saved path
        if (paths[symbol]) {
            setPaths((prev) => {
                const next = { ...prev };
                delete next[symbol];
                return next;
            });
            return;
        }

        // Prevent starting on a cell that's occupied by another saved path
        if (isCellInPath(paths, row, col)) return;

        setActivePath({ id: symbol, cells: [{ row, col }] });
    };

    // While dragging, attempt to add a cell to the active path
    const handleEnter = (row, col) => {
        if (!activePath) return;

        const last = activePath.cells[activePath.cells.length - 1];

        // 0) backtracking — if user moves onto the *previous* cell, pop the last one
        if (
            activePath.cells.length > 1 &&
            row === activePath.cells[activePath.cells.length - 2].row &&
            col === activePath.cells[activePath.cells.length - 2].col
        ) {
            setActivePath((prev) => ({
                ...prev,
                cells: prev.cells.slice(0, -1),
            }));
            pathCancelationSound.current.play()
            return;
        }

        // 1) must be adjacent (ignore if not)
        if (!isAdjacent(last, { row, col })) return;

        // 2) overlapping with other saved paths not allowed
        if (
            isCellInPath(paths, row, col) &&
            !activePath.cells.some((c) => c.row === row && c.col === col)
        ) {
            return;
        }

        const cellSymbol = getCellContent(level, row, col);
        const isStartCell =
            row === activePath.cells[0].row && col === activePath.cells[0].col;

        // 3) stepping on another image of DIFFERENT pair is invalid (ignore)
        if (cellSymbol && cellSymbol !== activePath.id && !isStartCell) {
            return;
        }

        // 4) allow adding the correct end cell, even if start already has same symbol
        const alreadyInPath = activePath.cells.some(
            (c) => c.row === row && c.col === col
        );
        if (alreadyInPath) {
            const isEndOfSamePair =
                cellSymbol === activePath.id && !isStartCell;

            if (!isEndOfSamePair) return; // block all other repeats
        }

        // valid — append
        setActivePath((prev) => ({
            ...prev,
            cells: [...prev.cells, { row, col }],
        }));
        boxSelectionSound.current.play()
    };

    // Finalize path
    const finalizeActivePath = () => {
        if (!activePath) return;

        const last = activePath.cells[activePath.cells.length - 1];
        const lastSymbol = getCellContent(level, last.row, last.col);

        // Commit only if path ends on correct image
        if (lastSymbol === activePath.id && activePath.cells.length > 1) {
            setPaths((prev) => ({ ...prev, [activePath.id]: activePath.cells }));
            finishPathSound.current.play()
        } else {
            pathCancelationSound.current.play()
        }

        // Always clear active path
        setActivePath(null);
    };

    return (
        <div
            className="grid w-full h-full max-w-md gap-1 select-none "
            style={{
                gridTemplateColumns: `repeat(${level.size}, 1fr)`,
                gridTemplateRows: `repeat(${level.size}, 1fr)`, 
            }}
            onMouseUp={finalizeActivePath}
        >
            {grid.flat().map((cell, i) => {
                const content = getCellContent(level, cell.row, cell.col);
                const isActive = activePath?.cells.some(
                    (c) => c.row === cell.row && c.col === cell.col
                );
                const isConnected = isCellInPath(paths, cell.row, cell.col);
                isConnected ? console.log('Connected') : null

                // ==============================
                const pair = level.pairs.find(p =>
                    p.positions.some(pos => pos.row === cell.row && pos.col === cell.col)
                );

                let bgClass = "bg-white"; // default for all

                if (isConnected || isActive) {
                    if (pair) {
                        // Fruit tile → darker color
                        bgClass = pathColors[pair.id]?.dark || "bg-gray-400";
                    } else {
                        // Path tile → lighter color
                        // Need to know which fruit started this path
                        const pathId = Object.keys(paths).find(id =>
                            paths[id].some(p => p.row === cell.row && p.col === cell.col)
                        ) || activePath?.id;

                        bgClass = pathColors[pathId]?.light || "bg-gray-200";
                    }
                }

                
                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        whileTap={{ scale: 0.9 }}
                        className={`aspect-square flex items-center justify-center rounded-lg shadow-md backdrop-blur-sm border-2 border-gray-600 ${bgClass}`}
                        onMouseDown={() => handleStart(cell.row, cell.col)}
                        onMouseEnter={(e) => {
                            if (e.buttons === 1) handleEnter(cell.row, cell.col);
                        }}
                    >
                        {pair && (
                            <motion.span
                                className="text-4xl sm:text-5xl"
                                variants={fruitPulse}
                                animate={
                                    // Animate only when the path containing this fruit is completed
                                    paths[pair.id] ? "animate" : "initial"
                                }
                            >
                                {pair.id} {/* 🍎, 🍌, 🍈, etc. */}
                            </motion.span>
                        )}
                    </motion.div>

                );
            })}
        </div>
    );
}
