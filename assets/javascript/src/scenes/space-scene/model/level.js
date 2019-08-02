import { Constants } from '../../../const/index.js';
import { isOutOfBounds } from '../../../helpers/coordinates.js';

export class Level {
	constructor(levelData) {
		this.levelData = levelData;
		this.currentDataIndex = 0;

		this.alientCount = 0;
		this.hasStarted = false;
		this.aliens = null;
	}

	aliensFleeing() {
		return this.alienCount > 0;
	}

	createAliens(scene) {
		this.hasStarted = true;
		if (this.aliens) {
			this.aliens.forEach(a => a.remove());
		}

		this.aliens = [];

		const {
			amount,
			duration,
			points,
			delay,
		} = this.levelData[this.currentDataIndex];
		const bezier = new Phaser.Curves.CubicBezier(points[0], points[1], points[2], points[3]);

		for (let i = 0; i < amount; i++) {
			const sprite = scene.physics.add.sprite(
				Constants.coordinates.centerOfScreen.x, Constants.coordinates.centerOfScreen.y, 
				Constants.sprites.enemyOne.key);
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
					const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, position.x, position.y) + Math.PI / 2;

					sprite.x = position.x;
					sprite.y = position.y;
					sprite.rotation = angle;
				},
				onComplete: function(tween, target) {
					sprite.destroy();
					this.alienCount -= 1;
				}
			});

			tween.play();
			this.aliens.push(tween);
		}

		this.alienCount = amount;
		this.currentDataIndex += 1;
	}

	isComplete() {
		return this.currentDataIndex >= this.levelData.length && !this.aliensFleeing();
	}
}