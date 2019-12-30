import { Constants } from '../../../const/index.js';
import { Response } from './response.js';

const END_TRANSMISSION = {
	key: '__end_transmission__',
	text: '45 78 63 65 70 74 69 6f 6e 20 69 6e 20 74 68 72 65 61 64 20 22 6d 61 69 6e 22 20 6a 61 76 61 2e 6e 65 74 2e 53 6f 63 6b 65 74 45 78 63 65 70 74 69 6f 6e 3a 20 53 6f 63 6b 65 74 20 63 6c 6f 73 65 64',
}

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
			const onSelect = () => this.selectedResponse(r.key);

			const responseObj = new Response({
				scene: this.scene,
				x,
				y,
				text: r.text,
				key: Constants.keys.sprites.communicationBorder,
				onSelect,
			});

			this.responses.push(responseObj);
		});
	}

	selectedResponse(key) {
		const selectedResponse = this.scene.add.text(25, 50, this._responses[key].text);
		selectedResponse.setTint(0xFF2222);

		this._clearOldResponses();

		const nextMessageKey = this._mappings[key];

		if (nextMessageKey === END_TRANSMISSION.key) {
			this.endTransmission();
		}
	}

	endTransmission() {
		this.scene.add.text(25, 75, END_TRANSMISSION.text);
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
