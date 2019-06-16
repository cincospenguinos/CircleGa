import { SpaceScene } from './scenes/space-scene/spaceScene.js';
import { MenuScene } from './scenes/menu/menuScene.js';
import { Constants } from './const/index.js';

const screenDimensions = Constants.dimensions.screen;

const config = {
    type: Phaser.AUTO,
    width: screenDimensions.width,
    height: screenDimensions.height,
    parent: 'game',
    scene: [ MenuScene, SpaceScene ],
    physics: {
    	default: 'arcade',
    	arcade: {
    		gravity: {},
    		debug: true,
    	},
    },
};

const game = new Phaser.Game(config);
