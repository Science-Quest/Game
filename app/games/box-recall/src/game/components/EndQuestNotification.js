class EndQuestNotification {
    constructor(scene, message='BENAR') {
        this.scene = scene;
        const { width, height } = scene.scale;

        // OVERLAY
        this.overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0)
            .setDepth(1000);

        // CONTAINER
        this.container = scene.add.container(width / 2, height / 2).setDepth(1001);

        // BACKGROUND
        const box = scene.add.rectangle(0, 0, 200, 270, 0xF5FBFF, 1).setRounded(20)

        // ICON
        let icon;
        if (message !== 'BENAR') {
            this.color = '#CE4545'
            icon = scene.add.image(0, 0, 'fail-quest-icon')
        } else {
            this.color = '#31BC31'
            icon = scene.add.image(0, 0, 'success-quest-icon')
        }
        icon.setOrigin(0.5)
        icon.displayHeight = 164
        icon.displayWidth = 164
        icon.setY(-(box.width / 6))

        // TEXT
        const text = scene.add.text(0, 80, message, {
            fontSize: "32px",
            color: this.color,
            fontStyle: "bold"
        }).setOrigin(0.5);

        

        this.container.add([box, icon, text]);



        // Start invisible & scaled down
        this.container.setScale(0);

        // Pop-up animation
        scene.tweens.add({
            targets: this.container,
            scale: 1,
            ease: "Back.Out",
            duration: 500,
            onComplete: () => {
                // Gentle pulse animation after pop
                scene.tweens.add({
                    targets: this.container,
                    scale: { from: 1, to: 1.05 },
                    yoyo: true,
                    repeat: -1,
                    duration: 800,
                    ease: "Sine.easeInOut"
                });
            }
        });
    }

    destroy() {
        this.overlay.destroy();
        this.container.destroy();
    }
}

export default EndQuestNotification
