const CURRENT_LEVEL = 'current_level';
const CURRENT_TEXT = 'current_text';
const FINISHED_TUTORIAL = false;

export class GameState {
	constructor(opts) {
		this.currentLevel = opts.currentLevel;
		this.currentText = opts.currentText;
		this.finishedTutorial = opts.finishedTutorial;
	}

	static getInstance() {
		return new GameState({
			currentLevel: parseInt(localStorage.getItem(CURRENT_LEVEL)),
			currentText: parseInt(localStorage.getItem(CURRENT_TEXT)),
			finishedTutorial: (localStorage.getItem(FINISHED_TUTORIAL) == 'true'),
		});
	}

	static init() {
		new GameState({
			currentLevel: 1,
			currentText: 0,
			finishedTutorial: false,
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

	finishedTutorial() {
		this.finishedTutorial = true;
		this._save();
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
		localStorage.setItem(CURRENT_LEVEL, this.currentLevel);
		localStorage.setItem(CURRENT_TEXT, this.currentText);
		localStorage.setItem(FINISHED_TUTORIAL, this.finishedTutorial);
	}
}