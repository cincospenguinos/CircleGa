export class KonamiCodeListener {
	constructor() {
		this.code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
		this.currentKeyIndex = 0;
		this.complete = false;
	}

	keyPressed(key) {
		const currentKey = this._currentKey();

		if (key === currentKey) {
			this.currentKeyIndex += 1;

			if (this.currentKeyIndex === this.code.length) {
				this.complete = true;
			}
		} else {
			this.currentKeyIndex = 0;
		}

		return this.isComplete();
	}

	isComplete() {
		return this.complete;
	}

	_currentKey() {
		return this.code[this.currentKeyIndex];
	}
}
