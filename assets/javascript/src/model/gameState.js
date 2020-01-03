import { Constants } from '../const/index.js';

const CURRENT_LEVEL = 'current_level';
const CURRENT_TEXT = 'current_text';
const CURRENT_INDEX = 'current_index';
const FINISHED_TUTORIAL = false;

export class GameState {
	constructor(opts) {
		this.currentLevel = opts.currentLevel;
		this.currentText = opts.currentText;
		this.finishedTutorial = opts.finishedTutorial;
		this.index = 0;
	}

	static getInstance() {
		return new GameState({
			index: parseInt(localStorage.getItem(CURRENT_INDEX)),
			currentText: parseInt(localStorage.getItem(CURRENT_TEXT)),
			finishedTutorial: (localStorage.getItem(FINISHED_TUTORIAL) == 'true'),
		});
	}

	static init() {
		new GameState({
			index: 0,
			currentText: 0,
			finishedTutorial: false,
		})._save();
	}

	static nextSceneInfo(opts = {}) {
		const data = this.getInstance().getSceneInfo();
		return data;
	}

	levelComplete() {
		this.index += 1;
		this._save();
	}

	textShown() {
		this.currentText += 1;
		this._save();
	}

	setTutorialFinished(bool) {
		this.finishedTutorial = bool;
		this._save();
	}

	getSceneInfo() {
		const orderData = Constants.order[this.index].split('-');
		const key = this._sceneFor(orderData[0]);

		return {
			key: this._sceneFor(orderData[0]),
			content: `${orderData[1]}.json`,
		}
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

	_save() {
		localStorage.setItem(CURRENT_INDEX, this.index);
		localStorage.setItem(CURRENT_LEVEL, this.currentLevel);
		localStorage.setItem(CURRENT_TEXT, this.currentText);
		localStorage.setItem(FINISHED_TUTORIAL, this.finishedTutorial);
	}

	_sceneFor(key) {
		switch(key) {
			case 'level':
				return Constants.scenes.spaceScene;
			case 'text':
				return Constants.scenes.textScene;
			case 'communication':
				return Constants.scenes.communicationScene;
			default:
				throw `No scene for ${key}`;
		}
	}
}