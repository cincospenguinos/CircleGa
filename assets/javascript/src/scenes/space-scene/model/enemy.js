import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import { distanceBetween, parameterizedDistance } from '../../../helpers/coordinates.js';

export class Enemy extends Entity {
	constructor(img, opts) {
		super({ img, ...opts });

		this.shotsFired = 0;
	}

	canFire() {
		return this.shotsFired < 1;
	}

	fireBullet() {
		this.shotsFired += 1;
	}
}
