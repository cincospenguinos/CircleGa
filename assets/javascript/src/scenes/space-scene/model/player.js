import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Player extends Entity {
	static MAX_VELOCITY = Math.PI / 64;
	static MAX_COOLDOWN = 15;

	constructor(opts) {
		super(opts);
		this.direction = 0;
		this.velocity = 0;
		this.fireCooldown = 0;
		this.moveCooldown = 0;
	}

	accelerate(direction) {
		this.setDirection(direction);
		this.velocity += this.direction * Math.PI / 1024;

		if (Math.abs(this.velocity) > Player.MAX_VELOCITY) {
			this.velocity = (this.velocity < 0 ? -1 : 1) * Player.MAX_VELOCITY;
		}
	}

	setDirection(direction) {
		this.direction = direction;
	}

	collidedWithPlayer() {
		this.velocity = -this.velocity * 3 / 4;
		this.moveCooldown = 20;
	}

	update() {
		// Set the position
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.theta += this.velocity;
		this.setPosition(polar);

		// Set where the sprite is facing
		const position = this.getPosition();
		const { centerOfScreen } = Constants.coordinates;
		this.setRotation(Phaser.Math.Angle.Between(position.x, position.y, 
			centerOfScreen.x, centerOfScreen.y) + Math.PI / 2);

		// update the cooldown
		this.fireCooldown--;
		this.moveCooldown--;
	}

	fireBullet() {
		this.fireCooldown = Player.MAX_COOLDOWN;
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.radius = polar.radius * 9 / 10
		return coordinateHelpers.toGame(polar);
	}

	canFire() {
		return this.fireCooldown <= 0;
	}

	canMove() {
		return this.moveCooldown <= 0;
	}
}