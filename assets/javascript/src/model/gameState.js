import { Constants } from '../const/index.js';

const CURRENT_LEVEL = 'current_level';
const CURRENT_TEXT = 'current_text';
const CURRENT_INDEX = 'current_index';
const FINISHED_TUTORIAL = false;

export class GameState {
	constructor(opts) {
		this.index = opts.index || 0;
		this.finishedTutorial = true || opts.finishedTutorial;
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new GameState({
				index: 0,
				finishedTutorial: false,
			});
		}

		return this.instance;
	}

	levelComplete() {
		this.index += 1;
	}

	textShown() {
		this.index += 1;
	}

	communicationComplete() {
		this.index += 1;
	}

	setTutorialFinished(bool) {
		this.finishedTutorial = bool;
	}

	transition(scene, opts = {}) {
		scene.scene.stop();
		const info = this.getSceneInfo(opts);
		setTimeout(() => scene.scene.start(info.key, info), 1000);
	}

	getSceneInfo() {
		const orderData = Constants.order[this.index].split('-');
		const key = this._sceneFor(orderData[0]);

		return {
			key: this._sceneFor(orderData[0]),
			content: `${orderData[1]}.json`,
		}
	}

	save() {
		localStorage.setItem(CURRENT_INDEX, this.index);
		localStorage.setItem(CURRENT_LEVEL, this.currentLevel);
		localStorage.setItem(CURRENT_TEXT, this.currentText);
		localStorage.setItem(FINISHED_TUTORIAL, this.finishedTutorial);
	}

	getCurrentLevelIndex() {
		return this.currentLevel - 1;
	}

	getCurrentTextIndex() {
		return this.currentText;
	}

	hasFinishedTutorial() {
		return this.finishedTutorial;
	}

	_sceneFor(key) {
		switch(key) {
			case 'level':
				return Constants.scenes.spaceScene;
			case 'text':
				return Constants.scenes.textScene;
			case 'communication':
				return Constants.scenes.communicationScene;
			case 'end':
				return Constants.scenes.endScene;
			default:
				throw `No scene for ${key}`;
		}
	}
}