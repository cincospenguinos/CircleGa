const CURRENT_LEVEL = 'current_level';
const CURRENT_TEXT = 'current_text';

export class GameState {
	constructor(opts) {
		this.currentLevel = opts.currentLevel;
		this.currentText = opts.currentText;
	}

	static getInstance() {
		return new GameState({
			currentLevel: parseInt(localStorage.getItem(CURRENT_LEVEL)),
			currentText: parseInt(localStorage.getItem(CURRENT_TEXT)),
		});
	}

	static init() {
		new GameState({
			currentLevel: 1,
			currentText: 0,
		})._save();
	}

	levelComplete() {
		this.currentLevel += 1;
		this._save();
	}

	textShown() {
		this.currentText += 1;
		this._save();
	}

	getCurrentLevelIndex() {
		return this.currentLevel - 1;
	}

	getCurrentTextIndex() {
		return this.currentText;
	}

	_save() {
		localStorage.setItem(CURRENT_LEVEL, this.currentLevel);
		localStorage.setItem(CURRENT_TEXT, this.currentText);
	}
}