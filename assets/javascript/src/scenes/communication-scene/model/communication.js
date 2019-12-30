import { Constants } from '../../../const/index.js';

export class Communication {
	constructor(scene, data) {
		this.scene = scene;

		this._messages = data.messages;
		this._responses = data.responses;
		this._mappings = data.mappings;

		this.currentMessage = this._messages[data.firstMessageKey];
		this.currentResponses = this._getCurrentResponses();

		this.complete = false;
	}

	show () {
		this.scene.add.text(25, 25, this.currentMessage.text);

		this.currentResponses.forEach((r, index) => {
			const x = Constants.coordinates.centerOfScreen.x;
			const y = Constants.dimensions.screen.height - 30 * (index + 1);
			const position = { x, y };

			const response = this.scene.add.text(position.x, position.y - 8, r.text);
			response.setTint(0xFF4444);

			const border = this.scene.add.image(position.x, position.y, Constants.keys.sprites.communicationBorder);
			border.setInteractive();
			border.setTint(0x000000);

			border.on('pointerover', () => {
				border.setTint(0xFF0000);
				response.setTint(0xFF0000);
			});

			border.on('pointerout', () => {
				border.setTint(0x000000);
				response.setTint(0xFF4444);
			});

			border.on('pointerdown', () => {
				// TODO: This
				console.log(`Selected response ${r.text}`);
			});
		});
	}

	isComplete() {
		return this.complete;
	}

	_getCurrentResponses() {
		return this.currentMessage.responses
			.map((key) => {
				if (!this._responses[key]) {
					throw `Invalid data! No response for key "${key}"`
				}

				return this._responses[key];
			});
	}
}
