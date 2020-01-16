import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Constants } from './const/index.js';
import { MenuScene } from './scenes/menu/menuScene.js';
import { SpaceScene } from './scenes/space-scene/spaceScene.js';
import { LevelEditorScene } from './scenes/level-editor/levelEditorScene.js';
import { TextScene } from './scenes/text-scene/textScene.js';
import { CommunicationScene } from './scenes/communication-scene/communicationScene.js';
import { EndScene } from './scenes/end-scene/endScene.js';
import Editor from './scenes/level-editor/components/editor.jsx';
import store from './state/store.js';

const screenDimensions = Constants.dimensions.screen;
const scene = [MenuScene, SpaceScene, TextScene, CommunicationScene, LevelEditorScene, EndScene];

const config = {
  type: Phaser.AUTO,
  width: screenDimensions.width,
  height: screenDimensions.height,
  parent: 'game',
  scene,
  scale: {
  	mode: Phaser.Scale.NONE,
  	autoCenter: Phaser.Scale.CENTER_BOTH,
  },
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

const rootElement = document.getElementById('game');
ReactDOM.render(
  <Provider store={store}>
    <Editor />
  </Provider>,
  rootElement,
);
