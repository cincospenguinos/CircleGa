import { Entity } from './entity.js';
import { COORDINATES } from '../../../const/coordinates.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Bullet extends Entity {
	constructor(img, opts = {}) {
		super(opts);

		this.xVel = opts.xVel || 1;
		this.yVel = opts.yVel || 1;

		this.setImg(img);
	}

	update() {
		const pos = this.getPosition();
		pos.x += this.xVel;
		pos.y += this.yVel;
		this.setPosition(pos);
	}
}

export class Bullets {
	static BULLET_VEL = 10;

	constructor() {
		this.bullets = [];
	}

	addBullet(bulletImg, opts) {
		const angle = Phaser.Math.Angle.Between(bulletImg.x, bulletImg.y,
			COORDINATES.centerOfScreen.x, COORDINATES.centerOfScreen.y) + Math.PI / 2;
		bulletImg.rotation = angle;

		const xVel = Bullets.BULLET_VEL * Math.cos(angle - Math.PI / 2);
		const yVel = Bullets.BULLET_VEL * Math.sin(angle - Math.PI / 2);

		const bullet = new Bullet(bulletImg, {
			...opts,
			xVel,
			yVel,
		});
		this.bullets.push(bullet);
	}

	update() {
		this.bullets.forEach((b) => b.update());
	}
}