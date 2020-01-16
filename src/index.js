import Phaser from 'phaser';
import { Constants } from './const/index.js';
import { MenuScene } from './scenes/menu/menuScene.js';
import { SpaceScene } from './scenes/space-scene/spaceScene.js';
import { LevelEditorScene } from './scenes/level-editor/levelEditorScene.js';
import { TextScene } from './scenes/text-scene/textScene.js';
import { CommunicationScene } from './scenes/communication-scene/communicationScene.js';
import { EndScene } from './scenes/end-scene/endScene.js';

const screenDimensions = Constants.dimensions.screen;
const scenes = [ MenuScene, SpaceScene, TextScene, CommunicationScene, LevelEditorScene, EndScene];

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
    		debug: Constants.config.debugPhysics,
    	},
    },
    dom: {
      createContainer: true,
    },
};

const game = new Phaser.Game(config);
