import { Constants } from '../../../const/index.js';
import { Response } from './response.js';
import { Printer } from '../services/printer.js';

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

		this.printer = new Printer(this.scene);

		this.complete = false;
	}

	show() {
		this.printer.printMessage(this.currentMessage.text);

		this.responses = [];
		this.currentResponses.forEach((r, index) => {
			const x = Constants.coordinates.centerOfScreen.x;
			const y = Constants.dimensions.screen.height - 30 * (index + 1);
			const onSelect = () => this.selectedResponse(r.key);

			const responseObj = new Response({
				scene: this.scene,
				x, y,
				text: r.text,
				key: Constants.keys.sprites.communicationBorder,
				onSelect,
			});

			this.responses.push(responseObj);
		});
	}

	selectedResponse(key) {
		this.printer.printResponse(this._responses[key].text);
		this._clearOldResponses();

		const nextMessageKey = this._mappings[key];

		if (nextMessageKey === END_TRANSMISSION.key) {
			this.endTransmission();
		}
	}

	endTransmission() {
		this.printer.printMessage(END_TRANSMISSION.text);
		this.complete = true;
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
