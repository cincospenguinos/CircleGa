import { Constants } from '../../const/index.js';

export class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.endScene });
	}

	init() {}

	preload() {}

	create() {
		const text = this.add.text(100, 100, 'FIN', {
			fontFamily: 'Arial',
			fontSize: '24px',
		});
		text.setTint(0xFFFFFF);
	}
}
