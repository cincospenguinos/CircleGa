import { Constants } from '../../../const/index.js';
import { Response } from './response.js';
import { Printer } from '../services/printer.js';

const END_TRANSMISSION = {
	key: '__end_transmission__',
	text: '45 78 63 65 70 74 69 6f 6e 20 69 6e 20 74 68 72 65 61 64 20 22 6d 61 69 6e 22 20 6a 61 76 61 2e 6e 65 74 2e 53 6f 63 6b 65 74 45 78 63 65 70 74 69 6f 6e 3a 20 53 6f 63 6b 65 74 20 63 6c 6f 73 65 64',
}

/**
 * Okay, so this is how it works:
 *
 * - The JSON file has four keys and four values: messages, responses, mappings, and firstMessageKey
 * - The first three are hashes, the last is a single string
 * - Each message or response has a text value, a key, and an array of strings representing response keys
 * - The mappings hash simply maps responses from the player to other messages to be printed
 * - The first message key is the first message to present to the player
 * - This class simply holds and presents all of that information in a nice way
 */
export class Communication {
	constructor(scene, data) {
		this.scene = scene;

		this._messages = data.messages;
		this._responses = data.responses;
		this._mappings = data.mappings;

		this.currentMessage = this._messages[data.firstMessageKey];
		this.currentResponses = this._getCurrentResponses();
		this.complete = false;
		this.responseIndex = 0;

		this.printer = new Printer(this.scene);
	}

	next() {
		const oldIndex = this.responseIndex;

		if (this.responseIndex > 0) {
			this.responseIndex -= 1;
		}

		this._updateResponses(oldIndex, this.responseIndex);
	}

	previous() {
		const oldIndex = this.responseIndex;

		if (this.responseIndex < (this.presentedResponses.length - 1)) {
			this.responseIndex += 1;
		}

		this._updateResponses(oldIndex, this.responseIndex);
	}

	select() {
		const selectedResponse = this.presentedResponses[this.responseIndex];
		this.responseSelected(selectedResponse.responseKey);
	}

	show() {
		this.printer.printMessage(this.currentMessage.text);

		this.presentedResponses = [];
		this.currentResponses.forEach((r, index) => {
			const x = Constants.coordinates.centerOfScreen.x;
			const y = Constants.dimensions.screen.height - 30 * (index + 1);

			const responseObj = new Response({
				scene: this.scene,
				x, y,
				text: r.text,
				key: Constants.keys.sprites.communicationBorder,
				responseKey: r.key,
				selected: this.responseIndex === index,
			});

			this.presentedResponses.push(responseObj);
		});
	}

	responseSelected(key) {
		this.printer.printResponse(this._responses[key].text);
		this._clearOldResponses();

		const nextMessageKey = this._mappings[key];

		if (nextMessageKey === END_TRANSMISSION.key) {
			this.endTransmission();
			return;
		}

		this.currentMessage = this._messages[nextMessageKey];
		this.currentResponses = this._getCurrentResponses();
		this.show();
	}

	endTransmission() {
		this.printer.printMessage(END_TRANSMISSION.text);
		this.complete = true;
	}

	isComplete() {
		return this.complete;
	}

	_updateResponses(oldIndex, newIndex) {
		this.presentedResponses[oldIndex].setSelected(false);
		this.presentedResponses[newIndex].setSelected(true);
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
		this.presentedResponses.forEach(obj => obj.destroy());
		this.presentedResponses = [];
	}
}
