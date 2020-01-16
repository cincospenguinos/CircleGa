export class TextExcerpt {
	constructor(data = {}) {
		this.type = data.type;
		this.text = data.text;
		this.author = data.author || null;
		this.source = data.source || null;
	}

	getText() {
		const split = this.text.split(' ');
		let newString = '';
		let lineLength = 0;
		this.lines = 1;

		for (let i = 0; i < split.length; i++) {
			const piece = split[i];
			if (lineLength + piece.length > this._getStep()) {
				newString += '\n';
				lineLength = 0;
				this.lines += 1;
			}

			newString = `${newString} ${piece}`;
			lineLength += piece.length + 1;
		}

		return newString;
	}

	getLines() {
		if (!this.lines) {
			getText();
		}

		return this.lines;
	}

	getAuthor() {
		return this.author || '';
	}

	getSource() {
		return this.source || '';
	}

	getFont() {
		return {
			fontFamily: 'Arial',
			fontSize: '24px',
		}
	}

	_getStep() {
		if (this.type === 'quote') {
			return 75;
		}

		return 100;
	}
}