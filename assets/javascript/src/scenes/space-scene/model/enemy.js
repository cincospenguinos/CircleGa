import { Entity } from './entity.js';
import { Constants } from '../../../const/index.js';
import { distanceBetween, parameterizedDistance } from '../../../helpers/coordinates.js';

export class Enemy extends Entity {
	constructor(config) {
		super(config);

		this.path = config.path;

		this._setupMovement(config.tweenConfig);
	}

	move(tween, target) {
		const position = this.path.bezier.getTweenPoint(target.val);
		const angle = Phaser.Math.Angle.Between(this.x, this.y, position.x, position.y) + Math.PI / 2;

		this.setX(position.x);
		this.setY(position.y);
		this.setRotation(angle);
	}

	_setupMovement(tweenConfig) {
		const initialPosition = this.path.bezier.getPoints()[0];

		const tween = this.scene.tweens.add({
			targets: { val: 0 },
			val: 1,
			yoyo: false,
			repeat: -1,
			ease: "Linear",
			callbackScope: this,
			onStart: () => { this.setX(initialPosition.x); this.setY(initialPosition.y); },
			onUpdate: this.move,
			...tweenConfig,
		});
	}
}
