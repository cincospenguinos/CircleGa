import { Constants } from '../../../const/index.js';

export class LifeCount {
	constructor(scene, opts = {}) {
		this.scene = scene;
		this.lifeCount = opts.lifeCount || 3;
		this.lifeSprites = [];
	}

	draw() {
		const edgeOfScreen = {
			x: Constants.dimensions.screen.width - 25,
			y: Constants.dimensions.screen.height - 25,
		};

		const { playerOne } = Constants.sprites;

		for (let i = 0; i < this.lifeCount; i++) {
			const sprite = this.scene.add.sprite(edgeOfScreen.x - 25 * i, edgeOfScreen.y,
				playerOne.key);
			sprite.setScale(0.5);
			this.lifeSprites.push(sprite);
		}
	}

	updateLifeTotal(lifeDifference) {
		this.lifeCount += lifeDifference;

		this._clear();
		this.draw();
	}

	get livesLeft() {
		return this.lifeSprites.length;
	}

	_clear() {
		this.lifeSprites.forEach(s => s.destroy());
	}
}
