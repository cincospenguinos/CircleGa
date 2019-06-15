import { Entity } from './entity.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Player extends Entity {
	static MAX_VELOCITY = Math.PI / 64;

	constructor(opts) {
		super(opts);
		this.velocity = 0;
	}

	accelerate(direction) {
		this.velocity += direction * Math.PI / 1024;

		if (Math.abs(this.velocity) > Player.MAX_VELOCITY) {
			this.velocity = (this.velocity < 0 ? -1 : 1) * Player.MAX_VELOCITY;
		}
	}

	update() {
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.theta += this.velocity;
		this.setPosition(polar);
	}
}