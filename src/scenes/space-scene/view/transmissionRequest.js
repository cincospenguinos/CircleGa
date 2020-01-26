import { Constants } from '../../../const/index.js';

export class TransmissionRequest {
	static TEXT = 'Press enter to communicate';

	constructor(scene) {
		this.scene = scene;

		const { transmissionRequest } = Constants.sounds;
		this.sound = this.scene.sound.add(transmissionRequest.key, transmissionRequest.config);

		this.isShown = false;
	}

	show() {
		if (!this.isShown) {
			const { width, height } = Constants.dimensions.screen;

			this.panel = this.scene.add.image(0, 800, Constants.keys.sprites.transmissionRequest);
			this.panel.x = width - (this.panel.width / 2);
			this.panel.y = (height - 100) - (this.panel.height / 2);
			
			this.text = this.scene.add.text(0, 100, TransmissionRequest.TEXT,
				Constants.fonts.spaceSceneTransmission);
			this.text.x = this.panel.x - (this.text.width / 2)
			this.text.y = this.panel.y - 10;

			this.sound.play();

			this.isShown = true;
		}
	}

	hide() {
		this.sound.stop();
		this.panel.destroy();
		this.text.destroy();
	}
}