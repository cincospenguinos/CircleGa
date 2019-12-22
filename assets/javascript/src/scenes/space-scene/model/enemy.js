import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import { distanceBetween, parameterizedDistance } from '../../../helpers/coordinates.js';

export class Enemy extends Entity {
	constructor(config) {
		super(config);

		this.lines = config.lines;
		this.tweenConfig = config.tweenConfig || {};
		this.completionCallback = config.completionCallback;
		this._executeMovement();
	}

	_executeMovement() {
		const tweens = this._generateTweens();
		this.currentTimeline = this.scene.tweens.timeline({
			tweens,
			duration: this.tweenConfig.duration,
			onComplete: () => {
				this.destroy();
				this.completionCallback();
			},
		});
	}

	_generateTweens() {
		return this.lines.map((bezier, index) => {
			const points = bezier.getPoints();

			return {
				targets: { val: 0 },
				val: 1,
				yoyo: false,
				ease: "Linear",
				callbackScope: this,
				onStart: () => {
					if (index === 0) {
						const initialPosition = points[0];
						this.setX(initialPosition.x);
						this.setY(initialPosition.y);
					}
				},
				onUpdate: (tween, target) => {
					const position = bezier.getTweenPoint(target.val);
					const angle = Phaser.Math.Angle.Between(this.x, this.y, position.x, position.y) + Math.PI / 2;

					this.setX(position.x);
					this.setY(position.y);
					this.setRotation(angle);
				},
			}
		});
	}
}
