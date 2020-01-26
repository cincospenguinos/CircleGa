import { Constants } from '../../../const/index.js';

export class LifeCount {
	constructor(scene, lifeCount) {
		this.scene = scene;
		this.currentLives = lifeCount;
		this.lifeSprites = [];
	}

	draw() {
		const edgeOfScreen = {
			x: Constants.dimensions.screen.width - 25,
			y: Constants.dimensions.screen.height - 25,
		};

		const { playerOne } = Constants.sprites;

		for (let i = 0; i < this.currentLives; i++) {
			const sprite = this.scene.add.sprite(edgeOfScreen.x - 25 * i, edgeOfScreen.y,
				playerOne.key);
			sprite.setScale(0.5);
			this.lifeSprites.push(sprite);
		}
	}

	playerDied() {
		this.currentLives -= 1;
		this._update();
	}

	resetLifeTotal() {
		this.currentLives = 3;
		this._update();
	}

	updateLifeTotal(lifeDifference) {
		this.currentLives += lifeDifference;
	}

	get livesLeft() {
		return this.lifeSprites.length;
	}

	_update() {
		this.lifeSprites.forEach(s => s.destroy());
		this.draw();
	}
}
