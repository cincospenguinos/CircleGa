import { Constants } from '../../../const/index.js';
export class Response extends Phaser.GameObjects.Image {
	constructor(config) {
		super(config.scene, config.x, config.y, Constants.keys.sprites.communicationBorder);

		this.scene = config.scene;
		this.responseKey = config.responseKey;
		this.text = config.text;
		this.selected = config.selected || false;

		this.scene.add.existing(this);
		this.responseText = this.scene.add.text(this.x, this.y - 8, this.text);

		this._update();
	}

	destroy() {
		this.responseText.destroy();
		super.destroy();
	}

	setSelected(bool) {
		this.selected = bool;
		this._update();
	}

	_update() {
		if (this.selected) {
			this.setAlpha(1);
			this.responseText.setTint(0xF84444);
		} else {
			this.setAlpha(0.01);
			this.responseText.setTint(0xE83030);
		}
	}
}