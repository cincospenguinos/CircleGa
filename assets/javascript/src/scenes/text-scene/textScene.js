import { Constants } from '../../const/index.js';
import { TextExcerpt } from './model/textExcerpt.js';

export class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.textScene });
	}

	preload() {
		this.excerpt = new TextExcerpt(Constants.text.indigenousExclusion);
		this.load.audio(Constants.keys.sounds.theMachine, Constants.sounds.theMachine.location);
	}

	create() {
		this.add.text(25, 25, this.excerpt.getText(), this.excerpt.getFont());
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