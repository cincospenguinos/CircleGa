import { SpaceScene } from './scenes/space-scene/spaceScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 920,
    parent: 'game',
    scene: [ SpaceScene ],
    physics: {
    	default: 'arcade',
    	arcade: {
    		gravity: {},
    		debug: true,
    	},
    },
};

const game = new Phaser.Game(config);
