import { Constants } from '../../../const/index.js';
import { Response } from './response.js';

const END_TRANSMISSION = '__end_transmission__';

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

	show() {
		this.scene.add.text(25, 25, this.currentMessage.text);

		this.responses = [];
		this.currentResponses.forEach((r, index) => {
			const x = Constants.coordinates.centerOfScreen.x;
			const y = Constants.dimensions.screen.height - 30 * (index + 1);

			const responseObj = new Response({
				scene: this.scene,
				x,
				y,
				responseKey: r.key,
				text: r.text,
				key: Constants.keys.sprites.communicationBorder,
				onSelect: () => {
					console.log('yo');
				}
			});
		});
	}

	endTransmission() {
		console.log('Transmission ended.');
	}

	selectedResponse(key) {
		// TODO: Move response up to next line
		this._clearOldResponses();

		const nextMessageKey = this._mappings[key];

		if (nextMessageKey === END_TRANSMISSION) {
			this.endTransmission();
		}
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

	_clearOldResponses() {
		this.responses.forEach(obj => obj.destroy());
		this.responses = [];
	}
}
