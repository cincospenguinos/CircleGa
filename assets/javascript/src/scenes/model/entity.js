import * as coordinateHelper from '../helpers/coordinates.js';

export class Entity {
	constructor(opts) {
		this.img = opts.img || null;
		this.coordinates = opts.coordinates || null;
	}

	setPosition(coordinates) {
	}
}