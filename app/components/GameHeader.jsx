import { AlarmClock, Volume2, VolumeOff, LogOut } from "lucide-react"

import { useSound } from "./SoundProvider"

import TimeDisplay from "./TimeDisplay"


export default function GameHeader({showQuitNotification, seconds}) {
    const { isMuted, toggleMute } = useSound()

    return(
        <div className="flex flex-row justify-between gap-x-4 px-4 h-16 items-center">
            <button onClick={showQuitNotification}>
                <LogOut strokeWidth={2.5} />
            </button>
            <div className="flex flex-row gap-x-4">
                <AlarmClock strokeWidth={2.5} />
                <TimeDisplay seconds={seconds} />
            </div>
            <button onClick={toggleMute}>
                {isMuted ? <VolumeOff strokeWidth={2.5} /> : <Volume2 strokeWidth={2.5} />}
            </button>
        </div>
    )
}