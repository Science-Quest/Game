import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }


    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('/assets');

        this.load.image('background-pattern', 'quest-pattern.png')
        this.load.image('success-quest-icon', 'success-quest.png')
        this.load.image('fail-quest-icon', 'fail-quest.png')

        this.load.font('Poppins-Bold', 'fonts/poppins.bold.ttf', 'truetype')
        this.load.font('Poppins-Semibold', 'fonts/poppins.semibold.ttf', 'truetype')
        this.load.font('Poppins-Medium', 'fonts/poppins.medium.ttf', 'truetype')
        this.load.font('Poppins-Regular', 'fonts/poppins.regular.ttf', 'truetype')
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('LevelFinish');
    }
}
