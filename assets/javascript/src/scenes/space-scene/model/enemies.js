import { Entity } from './entity.js';
import { ENEMY_TYPES } from '../../../const/enemies.js';
import { DIMENSIONS } from '../../../const/gameConfig.js';

class Enemy extends Entity {
	static UpdateFuncs = {
		domeHead: (entity) => {
			if (++entity.currentSwitch % entity.switchTime === 0) {
				entity.changeDirections();
			}

			const position = entity.getPosition();

			switch (entity.directions[entity.currentDirection]) {
				case 'up':
					position.y -= entity.speed;
					break;
				case 'right':
					position.x += entity.speed;
					break;
				case 'down':
					position.y += entity.speed;
					break;
				case 'left':
					position.x -= entity.speed;
					break;
			}

			entity.setPosition(position);
		}
	};

	constructor(img, opts) {
		super(opts);

		this.type = opts.type;
		this.speed = opts.speed;
		this.switchTime = opts.switchTime;
		this.currentSwitch = 0;
		this.directions = opts.directions;
		this.currentDirection = 0;
		this.setImg(img);
	}

	update() {
		Enemy.UpdateFuncs[this.type](this);
	}

	isOutOfBounds() {
		const position = this.getPosition();
		return position.x < 0 || position.y < 0 || position.x > DIMENSIONS.screen.width || position.y > DIMENSIONS.screen.height;
	}

	changeDirections() {
		this.currentDirection = (this.currentDirection + 1) % this.directions.length;
	}
}

export class Enemies {
	constructor() {
		this.enemies = [];
	}

	addEnemy(enemyImg, type) {
		const info = ENEMY_TYPES[type];
		const dir = Math.floor(Math.random() * Math.floor(info.directions.length));
		const enemy = new Enemy(enemyImg, {
			...info,
			directions: info.directions[dir],
			type,
		});

		this.enemies.push(enemy);
	}

	update() {
		const toRemove = [];
		this.enemies.forEach((e) => {
			if (e.isOutOfBounds()) {
				toRemove.push(e);
			} else {
				e.update();
			}
		});

		this.enemies = this.enemies.filter(e => !toRemove.includes(e));
		toRemove.forEach((e) => {
			e.img.destroy();
		});
	}
}