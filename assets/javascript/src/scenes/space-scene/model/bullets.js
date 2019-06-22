import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Bullet extends Entity {
	constructor(img, opts = {}) {
		super(opts);

		this.firingOrigin = opts.firingOrigin;
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
		const screen = Constants.dimensions.screen;
		return position.x < 0 || position.y < 0 || position.x > screen.width || position.y > screen.height;
	}
}

export class Bullets {
	static BULLET_VEL = 10;

	constructor() {
		this.nextKey = 1;
		this.bullets = [];
		this.originCounts = {};
	}

	addBullet(bulletImg, firingOrigin, target = undefined) {
		const bullet = this._createBullet(bulletImg, firingOrigin, target);
		this.originCounts[firingOrigin] ? this.originCounts[firingOrigin]++ : this.originCounts[firingOrigin] = 1;
	}

	remove(bullet) {
		const index = this.bullets.indexOf(bullet);
		if (index > -1) {
			this.originCounts[bullet.firingOrigin] ? this.originCounts[bullet.firingOrigin] -= 1 : this.originCounts[bullet.firingOrigin] = 0;
			bullet.img.destroy();
		  this.bullets.splice(index, 1);
		}
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

		this.bullets = this.bullets.filter((b) => !toRemove.includes(b));

		toRemove.forEach((b) => {
			this.originCounts[b.firingOrigin] -= 1;
			b.img.destroy();
		});
	}

	all() {
		return this.bullets;
	}

	_createBullet(bulletImg, firingOrigin, target = Constants.coordinates.centerOfScreen) {
		const angle = Phaser.Math.Angle.Between(bulletImg.x, bulletImg.y, target.x, target.y) + Math.PI / 2;
		bulletImg.rotation = angle;

		const xVel = Bullets.BULLET_VEL * Math.cos(angle - Math.PI / 2);
		const yVel = Bullets.BULLET_VEL * Math.sin(angle - Math.PI / 2);

		const bullet = new Bullet(bulletImg, {
			xVel,
			yVel,
			firingOrigin,
		});

		this.bullets.push(bullet);

		return bullet;
	}
}