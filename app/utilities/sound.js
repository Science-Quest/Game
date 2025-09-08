// sounds.js
import { Howl } from "howler";

export const sounds = {
    correct: new Howl({ src: ["/sounds/correct.mp3"], preload: true }),
    wrong: new Howl({ src: ["/sounds/wrong.mp3"], preload: true, volume: 0.5 }),
    victory: new Howl({ src: ["/sounds/victory.mp3"], preload: true }),
    lose: new Howl({ src: ["/sounds/lose.mp3"], preload: true }),
};
