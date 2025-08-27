import { useRef } from 'react';
import { PhaserGame } from './PhaserGame';

export default function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    
    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
        </div>
    )
}

