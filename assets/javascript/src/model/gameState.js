const CURRENT_LEVEL = 'current_level';

export class GameState {
	constructor(opts) {
		this.currentLevel = opts.currentLevel;
	}

	static getInstance() {
		return new GameState({
			currentLevel: localStorage.getItem(CURRENT_LEVEL)
		});
	}

	static init() {
		new GameState({
			currentLevel: 1,
		})._save();
	}

	levelComplete() {
		this.currentLevel += 1;
		this._save();
	}

	_save() {
		localStorage.setItem(CURRENT_LEVEL, this.currentLevel);
	}
}