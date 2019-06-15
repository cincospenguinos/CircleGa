import { Entity } from './entity.js';
import { COORDINATES } from '../../../const/coordinates.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';
import { DIMENSIONS } from '../../../const/gameConfig.js';

export class Bullet extends Entity {
	constructor(img, opts = {}) {
		super(opts);

		this.origin = origin;
		this.xVel = opts.xVel;
		this.yVel = opts.yVel;

		this.setImg(img);
	}

	update() {
		const pos = this.getPosition();
		pos.x += this.xVel;
		pos.y += this.yVel;
		this.setPosition(pos);
	}

	isOutOfBounds() {
		const position = this.getPosition();
		return position.x < 0 || position.y < 0 || position.x > DIMENSIONS.screen.width || position.y > DIMENSIONS.screen.height;
	}
}

export class Bullets {
	static BULLET_VEL = 20;

	constructor() {
		this.nextKey = 1;
		this.bullets = [];
		this.originCounts = {};
	}

	addBullet(bulletImg, origin) {
		const bullet = this._createBullet(bulletImg);
		this.originCounts[origin] ? this.originCounts[origin]++ : this.originCounts[origin] = 1;
	}

	bulletCountFor(key) {
		return this.originCounts[key] || 0;
	}

	update() {
		const toRemove = [];
		this.bullets.forEach((b) => {
			if (b.isOutOfBounds()) {
				toRemove.push(b);
			} else {
				b.update();
			}
		});

		toRemove.forEach((b) => this.originCounts[b.origin]--);
		this.bullets = this.bullets.filter((b) => !toRemove.includes(b));
		console.log(this.bullets);
	}

	_createBullet(bulletImg, origin) {
		const angle = Phaser.Math.Angle.Between(bulletImg.x, bulletImg.y,
			COORDINATES.centerOfScreen.x, COORDINATES.centerOfScreen.y) + Math.PI / 2;
		bulletImg.rotation = angle;

		const xVel = Bullets.BULLET_VEL * Math.cos(angle - Math.PI / 2);
		const yVel = Bullets.BULLET_VEL * Math.sin(angle - Math.PI / 2);

		const bullet = new Bullet(bulletImg, {
			xVel,
			yVel,
			origin,
		});

		this.bullets.push(bullet);

		return bullet;
	}
}