import { Constants } from '../../../const/index.js';
import { Response } from '../model/response.js';

export class Printer {
	static LINE_HEIGHT = 25;
	static CARRIAGE_START = 25;
	static CARRIAGE_BUFFER = 25;
	static CARRIAGE_END = Constants.dimensions.screen.width - Printer.CARRIAGE_BUFFER;

	constructor(scene) {
		this.scene = scene;

		this.lineNumber = 1;
		this.pixelsPerChar = this._averagePixelsPerChar();
		this.font = {};
	}

	printMessage(text) {
		this._extractLinesFrom(text).forEach((line) => {
			const textObj = this._printLine(line);
		});
	}

	printResponse(text) {
		this._extractLinesFrom(text).forEach((line) => {
			const textObj = this._printLine(line);
			textObj.setTint(0xF84444);
		});
	}

	_averagePixelsPerChar() {
		const text = 'The quick brown fox jumped over the lazy dog.?!@#$%^&*()-=1234567890';
		const obj = this.scene.add.text(0, 0, text, Constants.fonts.communicationScene);
		const average = obj.displayWidth / text.length;

		obj.destroy();

		return average;
	}

	_extractLinesFrom(text) {
		const lines = [];
		let currentLine = '';

		text.split(' ').forEach((word) => {
			const currentPixels = `${currentLine} `.length * this.pixelsPerChar;
			const thisWordPixels = word.length * this.pixelsPerChar;

			if (currentPixels + thisWordPixels < Printer.CARRIAGE_END) {
				currentLine = `${currentLine} ${word}`;
			} else {
				lines.push(currentLine);
				currentLine = '';
			}
		});

		lines.push(currentLine);
		currentLine = '';

		return lines;
	}

	_printLine(line) {
		const x = Printer.CARRIAGE_START;
		const y = this.lineNumber * Printer.LINE_HEIGHT;
		this.lineNumber += 1;

		return this.scene.add.text(x, y, line, this.font);
	}
}
