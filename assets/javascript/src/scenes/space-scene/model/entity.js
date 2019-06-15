import * as coordinateHelper from '../../../helpers/coordinates.js';

export class Entity {
	constructor(opts = {}) {
		this.img = opts.img || null;
		this.coordinates = opts.coordinates || null;
	}

	getPosition() {
		if (this.img) {
			return {
				x: this.img.x,
				y: this.img.y,
				type: 'game',
			}
		} else {
			return this.coordinates;
		}
	}

	setPosition(coordinates) {
		coordinates = coordinateHelper.toGame(coordinates);

		if (this.img) {
			this.img.setPosition(coordinates.x, coordinates.y);
		} else {
			this.coordinates = coordinates;
		}
	}

	setImg(img) {
		this.img = img;
	}
}