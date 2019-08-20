import { Constants } from '../../const/index.js';
import { TextExcerpt } from './model/textExcerpt.js';
import { GameState } from '../../model/gameState.js';

export class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.textScene });
	}

	preload() {
		const gameState = GameState.getInstance();
		this.currentTextKey = Constants.textOrder[gameState.getCurrentTextIndex()];
		this.load.json(this.currentTextKey, Constants.texts[this.currentTextKey].location);
		// this.excerpt = new TextExcerpt(Constants.text.indigenousExclusion);
		this.load.audio(Constants.keys.sounds.theMachine, Constants.sounds.theMachine.location);
	}

	create() {
		const excerpt = new TextExcerpt(this.cache.json.get(this.currentTextKey));
		this.add.text(25, 25, excerpt.getText(), excerpt.getFont());
		this.keys = this.input.keyboard.addKeys({
			space: 'SPACE',
			esc: 'ESC',
			enter: 'ENTER',
		});

		this.backgroundMusic = this.sound.add(Constants.keys.sounds.theMachine, Constants.sounds.theMachine.config);
		this.backgroundMusic.play();
	}

	update() {
		let moveOn = false;
		Object.keys(this.keys).forEach((k) => {
			const key = this.keys[k];
			if (Phaser.Input.Keyboard.JustDown(key)) {
				moveOn = true;
				return;
			}
		});

		if (moveOn) {
			this.scene.start(Constants.scenes.spaceScene);
			this.backgroundMusic.stop();
			return;
		}
	}
}