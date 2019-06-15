import { Entity } from './entity.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Player extends Entity {
	constructor(opts) {
		super(opts);
		this.velocity = 0;
	}

	setVelocity(angularVel) {
		this.velocity = angularVel || 0;
	}

	update() {
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.theta += this.velocity;
		this.setPosition(polar);
	}
}