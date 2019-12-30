import { Constants } from '../../../const/index.js';
export class Response extends Phaser.GameObjects.Image {
	constructor(config) {
		super(config.scene, config.x, config.y, Constants.keys.sprites.communicationBorder);

		this.scene = config.scene;
		this.responseKey = config.responseKey;
		this.text = config.text;
		this.onSelect = config.onSelect;

		this.scene.add.existing(this);
		this.responseText = this.scene.add.text(this.x, this.y - 8, this.text);
		this.responseText.setTint(0xFF2222);

		this.setAlpha(0.01);
		this.setInteractive();
		this.on('pointerover', () => this._onHover());
		this.on('pointerout', () => this._onOut());
		this.on('pointerdown', () => this.onSelect());
	}

	destroy() {
		this.responseText.destroy();
		super.destroy();
	}

	_onHover() {
		this.setAlpha(1);
		this.responseText.setTint(0xFF0000);
	}

	_onOut() {
		this.setAlpha(0.01);
		this.responseText.setTint(0xFF2222);
	}
}