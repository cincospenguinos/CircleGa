import { Entity } from './entity.js';
import { EntityCollection } from './entityCollection.js'
import { Constants } from '../../../const/index.js';
import { distanceBetween, parameterizedDistance } from '../../../helpers/coordinates.js';

export class Enemy extends Entity {
	constructor(img, opts) {
		super(opts);

		this.type = opts.type;
		this.speed = opts.speed;
		this.positions = opts.points;
		this.terminalPosition = opts.terminalPosition;
		this.currentPositionIndex = 0;

		this.setImg(img);
		this._updateVelocity();
	}

	update() {
		if (this._shouldUpdateVelocity(this.getPosition(), this._nextPosition())) {
			this._updateVelocity();
		}

		const currentPosition = this.getPosition();

		const newPosition = { x: currentPosition.x + this.xVel, y: currentPosition.y + this.yVel, type: 'game' };
		this.setPosition(newPosition);
	}

	_shouldUpdateVelocity() {
		const distance = distanceBetween(this.getPosition(), this._nextPosition());
		return this._nextPosition() && distance <= 50;
	}

	_updateVelocity() {
		this.currentPositionIndex++;
		console.log(this.getPosition());
		const distance = distanceBetween(this.getPosition(), this._nextPosition());
		const { x, y } = parameterizedDistance(this.getPosition(), this._nextPosition());
		this.xVel = x * this.speed / distance;
		this.yVel = y * this.speed / distance;
	}

	_nextPosition() {
		return this.positions[this.currentPositionIndex] || this.terminalPosition;
	}
}
