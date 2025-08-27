import Phaser from 'phaser';
import { Game } from './scenes/Game';
import {LevelFinish} from './scenes/LevelFinish'
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#42BFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 402,
        height: 874
    },
    scene: [
        Preloader,
        // Game,
        LevelFinish
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
