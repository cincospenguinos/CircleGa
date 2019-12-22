import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import * as coordinateHelpers from '../../../helpers/coordinates.js';

export class Bullet extends Entity {
	constructor(config) {
		super(config);

		this.firingOrigin = config.firingOrigin;
		this.xVel = config.xVel;
		this.yVel = config.yVel;
	}

	update() {
		const pos = this.getPosition();
		pos.x += this.xVel;
		pos.y += this.yVel;
		this._setPosition(pos);
	}

	isOutOfBounds() {
		const position = this.getPosition();
		const screen = Constants.dimensions.screen;
		return position.x < 0 || position.y < 0 || position.x > screen.width || position.y > screen.height;
	}

	_setPosition(position) {
		this.x = position.x;
		this.y = position.y;
	}
}

export class Bullets {
	static PLAYER_BULLET_VEL = 15;
	static ENEMY_BULLET_VEL = 10;

	constructor(scene) {
		this.scene = scene;
		this.nextKey = 1;
		this.bullets = [];
		this.originCounts = {};
	}

	addBullet(firingOrigin, bulletPosition, target = undefined) {
		const bullet = this._createBullet(firingOrigin, bulletPosition, target);
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
			b.destroy();
		});
	}

	all() {
		return this.bullets;
	}

	_createBullet(firingOrigin, bulletPosition, target = Constants.coordinates.centerOfScreen) {
		const rotation = Phaser.Math.Angle.Between(bulletPosition.x, bulletPosition.y, target.x, target.y) + Math.PI / 2;

		const totalVel = firingOrigin === Constants.keys.sprites.enemyOne ? Bullets.ENEMY_BULLET_VEL : Bullets.PLAYER_BULLET_VEL;
		const key = this._spriteKeyFor(firingOrigin);

		const xVel = totalVel * Math.cos(rotation - Math.PI / 2);
		const yVel = totalVel * Math.sin(rotation - Math.PI / 2);

		const bullet = new Bullet({
			scene: this.scene,
			x: bulletPosition.x,
			y: bulletPosition.y,
			key,
			xVel,
			yVel,
			rotation,
			firingOrigin,
		});
		bullet.rotation = rotation;

		this.bullets.push(bullet);

		return bullet;
	}

	_spriteKeyFor(origin) {
		if (origin === Constants.keys.sprites.playerOne) {
			return Constants.keys.sprites.redBullet;
		} else if(origin === Constants.keys.sprites.playerTwo) {
			return Constants.keys.sprites.blueBullet;
		}
	}
}
