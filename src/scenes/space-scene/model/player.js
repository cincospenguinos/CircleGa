import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';
import * as selectors from '../../../state/selectors/playerSelectors.js';

export class Player extends Entity {
	constructor(config) {
		super(config);

		this.direction = 0;
		this.velocity = 0;
		this.fireCooldown = 0;
		this.moveCooldown = 0;
	}

	static updateStaticProps(state) {
		this.MAX_VELOCITY = selectors.getMaxVelocity(state);
		this.ACCELERATION = selectors.getAcceleration(state);
		this.BULLET_COOLDOWN = selectors.getBulletCooldown(state);
		this.MAX_BULLETS = selectors.getMaxBullets(state);
	}

	accelerate(direction) {
		this.setDirection(direction);
		this.velocity += (-this.direction) * Player.ACCELERATION;

		if (Math.abs(this.velocity) > Player.MAX_VELOCITY) {
			this.velocity = (this.velocity < 0 ? -1 : 1) * Player.MAX_VELOCITY;
		}
	}

	slow() {
		if (this.velocity > 0) {
			this.velocity -= Player.ACCELERATION;
		} else if (this.velocity < 0) {
			this.velocity += Player.ACCELERATION;
		}

		if (Math.abs(this.velocity) < Player.ACCELERATION) {
			this.velocity = 0;
		}
	}

	setDirection(direction) {
		this.direction = direction;
	}

	static handleCollision(playerOne, playerTwo) {
		const tmp = playerOne.velocity;
		playerOne.velocity = playerTwo.velocity;
		playerTwo.velocity = tmp;

		playerOne.velocity *= 7/8;
		playerTwo.velocity *= 7/8;

		playerOne.moveCooldown = Player.MOVEMENT_COOLDOWN;
		playerTwo.moveCooldown = Player.MOVEMENT_COOLDOWN;
	}

	update() {
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.theta += this.velocity;
		this._setPosition(polar);

		const position = this.getPosition();
		const { centerOfScreen } = Constants.coordinates;
		this.setRotation(Phaser.Math.Angle.Between(position.x, position.y, 
			centerOfScreen.x, centerOfScreen.y) + Math.PI / 2);

		this.fireCooldown--;
		this.moveCooldown--;
	}

	fireBullet() {
		this.fireCooldown = Player.BULLET_COOLDOWN;
		const polar = coordinateHelpers.toPolar(this.getPosition());
		polar.radius *= 9 / 10
		return coordinateHelpers.toGame(polar);
	}

	canFire() {
		return this.fireCooldown <= 0;
	}

	canMove() {
		return this.moveCooldown <= 0;
	}

	_setPosition(position) {
		const truePosition = coordinateHelpers.toGame(position);
		this.x = truePosition.x;
		this.y = truePosition.y;
	}
}