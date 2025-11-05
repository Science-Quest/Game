// SoundContext.js
import { createContext, useContext, useState } from "react";
import { Howler } from "howler";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        Howler.mute(!isMuted);
        setIsMuted(!isMuted);
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => useContext(SoundContext);
