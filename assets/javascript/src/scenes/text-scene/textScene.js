import { Constants } from '../../const/index.js';
import { TextExcerpt } from './model/textExcerpt.js';

export class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.textScene });
	}

	preload() {
		this.excerpt = new TextExcerpt(Constants.text.indigenousExclusion);
	}

	create() {
		this.add.text(25, 25, this.excerpt.getText(), this.excerpt.getFont());
		this.add.text(0, 800, `${this.excerpt.getText().length}`, this.excerpt.getFont());
	}

	update() {}
}