import { Constants } from '../const/index.js';
import * as playerActions from '../state/actions/playerActions.js';
import * as playerSelectors from '../state/selectors/playerSelectors.js';
import store from '../state/store.js';

export class GameState {
	constructor(opts) {
		this.index = opts.index || 0;
		this.finishedTutorial = opts.finishedTutorial;
		this.getState = store.getState;
		this.dispatch = store.dispatch;
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

	playerDied() {
		store.dispatch(playerActions.playerDied());
	}

	getLifeCount() {
		return playerSelectors.getLifeTotal(this.getState());
	}

	returnToLastLevel(scene) {
		const lastLevel = playerSelectors.getCurrentLevel(this.getState());
		store.dispatch(playerActions.resetLifeTotal());

		this.transition(scene, { orderData: `level-${lastLevel}_1` });
	}

	setTutorialFinished(bool) {
		this.finishedTutorial = bool;
	}

	transition(scene, opts = {}) {
		scene.scene.stop();
		const info = this.getSceneInfo(opts);

		if (this._transitioningToNextLevel(info)) {
			store.dispatch(playerActions.nextLevel());
			store.dispatch(playerActions.resetLifeTotal());
		}

		setTimeout(() => scene.scene.start(info.key, info), 1000);
	}

	getSceneInfo(opts = {}) {
		const order = opts.order || Constants.order[this.index];
		const orderData = order.split('-');
		const key = this._sceneFor(orderData[0]);

		return {
			key: this._sceneFor(orderData[0]),
			content: `${orderData[1]}.json`,
			...opts
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

	_transitioningToNextLevel(info) {
		if (info.key !== 'level') {
			return false;
		}

		const nextLevel = parseInt(info.content[0]);
		const lastLevel = playerSelectors.getCurrentLevel(this.getState());

		return nextLevel === lastLevel + 1;
	}
}