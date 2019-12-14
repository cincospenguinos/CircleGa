import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import { distanceBetween, parameterizedDistance } from '../../../helpers/coordinates.js';

export class Enemy extends Entity {
	constructor(config) {
		super(config);

		this.allPoints = config.allPoints;
		this.bezier = config.bezier;
		this.tweenConfig = config.tweenConfig;

		this._setupMovement();
	}

	move(tween, target) {
		const position = this.bezier.getTweenPoint(target.val);
		const angle = Phaser.Math.Angle.Between(this.x, this.y, position.x, position.y) + Math.PI / 2;

		this.setX(position.x);
		this.setY(position.y);
		this.setRotation(angle);
	}

	_setupMovement() {
		const tweens = this._generateTweens(this.allPoints);
		this.currentTimeline = this.scene.tweens.timeline({
			loop: -1,
			duration: 3000,
			tweens,
		});
	}

	_generateTweens() {
		return this.allPoints.map((position, index) => {
			return {
				targets: { val: 0 },
				val: 1,
				yoyo: false,
				ease: "Linear",
				callbackScope: this,
				onStart: () => {
					if (index === 0) {
						const initialPosition = this.allPoints[0];
						this.setX(initialPosition.x);
						this.setY(initialPosition.y);
					}
				},
				onUpdate: this.move,
			}
		});
	}
}
