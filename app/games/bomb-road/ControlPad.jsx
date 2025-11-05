export default function ControlPad({ handleMove }) {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {/* Up */}
            <button
                onClick={() => handleMove("up")}
                className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center text-2xl active:bg-gray-500"
            >
                ▲
            </button>

            {/* Middle row */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleMove("left")}
                    className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center text-2xl active:bg-gray-500"
                >
                    ◀
                </button>
                <div className="w-12 h-12" /> {/* empty center */}
                <button
                    onClick={() => handleMove("right")}
                    className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center text-2xl active:bg-gray-500"
                >
                    ▶
                </button>
            </div>

            {/* Down */}
            <button
                onClick={() => handleMove("down")}
                className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center text-2xl active:bg-gray-500"
            >
                ▼
            </button>
        </div>
    )
}
