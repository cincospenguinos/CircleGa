import { Entity } from './entity.js';

export class Player extends Entity {
	constructor(opts) {
		super(opts);
	}

	setVelocity(angularVel) {
		console.log(`setVelocity ${angularVel}`)
	}

	update() {
		console.log('update!');
	}
}