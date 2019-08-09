import { Constants } from '../../const/index.js';
import { TextExcerpt } from './model/textExcerpt.js';

export class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.textScene });
	}

	preload() {
		this.excerpt = new TextExcerpt(Constants.text.indigenousExclusion);
		this.keys = this.input.keyboard.addKeys({
			space: 'SPACE',
			esc: 'ESC',
			enter: 'ENTER',
		});
	}

	create() {
		this.add.text(25, 25, this.excerpt.getText(), this.excerpt.getFont());
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
			return;
		}
	}
}