import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';

const FIRING_DISTANCE = 10;

export class Enemy extends Entity {
	constructor(config) {
		const key = config.canFire ? Constants.keys.sprites.warrior : Constants.keys.sprites.nonWarrior;
		super({ ...config, key });

		this.lines = config.lines;
		this.tweenConfig = config.tweenConfig || {};
		this.completionCallback = config.completionCallback;
		this.yellowStarPositions = config.yellowStarPositions || [];
		this.fireCallback = config.fireCallback;
		this.canFire = config.canFire || true;
		this._executeMovement();
	}

	doubleTime() {
		this.currentTimeline.setTimeScale(2);
	}

	normalTime() {
		this.currentTimeline.setTimeScale(1);
	}

	setCanFire(bool) {
		this.canFire = bool;
	}

	_executeMovement() {
		const tweens = this._generateTweens();
		this.currentTimeline = this.scene.tweens.timeline({
			tweens,
			duration: this.tweenConfig.duration,
			onComplete: () => {
				this.destroy();
				
				if (this.completionCallback) {
					this.completionCallback();
				}
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

					if (this.fireCallback && this.canFire) {
						this.yellowStarPositions.forEach((yellowStar) => {
							const { x, y } = yellowStar;
							const distance = Phaser.Math.Distance.Between(x, y, this.x, this.y);

							if (distance < FIRING_DISTANCE) {
								this.fireCallback(this);
								this.canFire = false;
							}
						});
					}

					this.setX(position.x);
					this.setY(position.y);
					this.setRotation(angle);
				},
			}
		});
	}
}
