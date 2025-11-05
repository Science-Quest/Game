export default function GameGrid({ level, phase, carPosition }) {
    const { arenaSize, start, destination, safePath } = level

    return (
        <div className="flex justify-center items-center w-full mt-4">
            <div
                className="grid gap-2 place-items-center"
                style={{
                    gridTemplateColumns: `repeat(${arenaSize}, minmax(0, 1fr))`,
                    width: "90vw",
                    maxWidth: "500px"
                }}
            >
                {Array.from({ length: arenaSize }).map((_, row) =>
                    Array.from({ length: arenaSize }).map((_, col) => {
                        const isStart = start.row === row && start.col === col
                        const isDest = destination.row === row && destination.col === col
                        const isCar = carPosition?.row === row && carPosition?.col === col

                        const inSafePath = safePath.some(p => p.row === row && p.col === col)

                        let bg = "bg-gray-300" // default

                        if (phase === "memorize" && inSafePath) {
                            bg = "bg-green-400"
                        }

                        if (isStart) bg = "bg-blue-500"
                        if (isDest) bg = "bg-yellow-500"
                        if (isCar) bg = "bg-red-600"

                        return (
                            <div
                                key={`${row}-${col}`}
                                className={`aspect-square w-full flex items-center justify-center text-white font-bold ${bg} rounded`}
                            >
                                {isCar ? "🚗" : isStart ? "S" : isDest ? "🏁" : ""}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
