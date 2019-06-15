import { Entity } from './entity.js';
import { COORDINATES } from '../../../const/coordinates.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Player extends Entity {
	static MAX_VELOCITY = Math.PI / 64;
	static MAX_COOLDOWN = 15;

	constructor(opts) {
		super(opts);
		this.velocity = 0;
		this.cooldown = 0;
	}

	accelerate(direction) {
		this.velocity += direction * Math.PI / 1024;

		if (Math.abs(this.velocity) > Player.MAX_VELOCITY) {
			this.velocity = (this.velocity < 0 ? -1 : 1) * Player.MAX_VELOCITY;
		}
	}

	update() {
		// Set the position
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.theta += this.velocity;
		this.setPosition(polar);

		// Set where the sprite is facing
		const position = this.getPosition();
		this.img.rotation = (Phaser.Math.Angle.Between(position.x, position.y, 
			COORDINATES.centerOfScreen.x, COORDINATES.centerOfScreen.y)) + Math.PI / 2;

		// update the cooldown
		this.cooldown--;
	}

	fireBullet() {
		this.cooldown = Player.MAX_COOLDOWN;
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.radius = polar.radius * 9 / 10
		return coordinateHelpers.toGame(polar);
	}

	canFire() {
		return this.cooldown <= 0;
	}
}