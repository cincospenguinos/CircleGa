import { Constants } from './const/index.js';
import { SpaceScene } from './scenes/space-scene/spaceScene.js';
import { MenuScene } from './scenes/menu/menuScene.js';
import { LevelEditorScene } from './scenes/level-editor/levelEditorScene.js';

const screenDimensions = Constants.dimensions.screen;
const scenes = Constants.config.runLevelEditor ? [ LevelEditorScene ] : [ MenuScene, SpaceScene ];

const config = {
    type: Phaser.AUTO,
    width: screenDimensions.width,
    height: screenDimensions.height,
    parent: 'game',
    scene: scenes,
    physics: {
    	default: 'arcade',
    	arcade: {
    		gravity: {},
    		debug: true,
    	},
    },
    dom: {
      createContainer: Constants.config.runLevelEditor,
    },
};

const game = new Phaser.Game(config);
