import { Constants } from '../../../const/index.js';
import { isOutOfBounds, distanceBetween } from '../../../helpers/coordinates.js';
import { Enemy } from './enemy.js';
import { EntityCollection } from '../services/entityCollection.js';

export class Level {
	constructor(levelData) {
		this.levelData = levelData;
		this.currentDataIndex = 0;

		this.alientCount = 0;
		this.hasStarted = false;
		this.alienTweens = null;
		this.enemies = new EntityCollection();
	}

	aliensFleeing() {
		return this.alienCount > 0;
	}

	createAliens(scene) {
		this.hasStarted = true;
		if (this.alienTweens) {
			this.alienTweens.forEach(a => a.remove());
		}

		this.alienTweens = [];
		this.enemies = new EntityCollection();

		const {
			amount,
			duration,
			points,
			delay,
			firingPoint,
		} = this.levelData[this.currentDataIndex];

		const bezier = new Phaser.Curves.CubicBezier(points[0], points[1], points[2], points[3]);
		const centerOfScreen = Constants.coordinates.centerOfScreen;

		for (let i = 0; i < amount; i++) {
			const sprite = scene.physics.add.sprite(
				centerOfScreen.x, centerOfScreen.y, Constants.sprites.enemyOne.key);
			const enemy = new Enemy(sprite);

			const tween = scene.tweens.add({
				targets: { val: 0 },
				val: 1,
				duration,
				delay: i * delay,
				yoyo: false,
				repeat: 0,
				ease: "Linear",
				callbackScope: this,
				onUpdate: function(tween, target) {
					const position = bezier.getPoint(target.val);

					if (this.isAtFiringPoint({ x: position.x, y: position.y })) {
						scene.enemyFired(enemy);
					}

					const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, position.x, position.y) + Math.PI / 2;
					sprite.x = position.x;
					sprite.y = position.y;
					sprite.rotation = angle;
				},
				onComplete: function(tween, target) {
					this.enemies.remove(enemy);
					this.alienCount -= 1;
				}
			});

			this.alienTweens.push(tween);
			this.enemies.add(enemy);
			tween.play();
		}

		this.alienCount = amount;
		this.currentDataIndex += 1;
	}

	isAtFiringPoint(point) {
		return distanceBetween(this.getFiringPoint(), point) <= 5;
	}

	getAliens() {
		return this.enemies;
	}

	getFiringPoint() {
		return this.levelData[this.currentDataIndex - 1].firingPoint;
	}

	isComplete() {
		return this.currentDataIndex >= this.levelData.length && !this.aliensFleeing();
	}
}