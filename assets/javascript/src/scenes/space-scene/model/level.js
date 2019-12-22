import { Constants } from '../../../const/index.js';
import { Bezier } from './bezier.js';
import { Enemy } from './enemy.js';

const STAR_KEYS = {
	red: Constants.keys.sprites.redStar,
	blue: Constants.keys.sprites.blueStar,
};

export class Level {
	constructor(scene, lines, stars) {
		this.lines = lines;
		this.stars = stars;
		this.scene = scene;

		this.enemies = [];
	}

	draw() {
		this.stars.forEach((s) => {
			const spriteKey = STAR_KEYS[s.color];
			this.scene.add.sprite(s.x, s.y, spriteKey);
		});
	}

	start() {
		this.complete = false;
		this.currentLineIndex = 0;
		this._runLine();
	}

	isComplete() {
		return this.complete;
	}

	getAliens() {
		return this.enemies;
	}

	toJson() {
		// TODO: Delay needs to be included
		const enemies = this.lines.map((p) => {
			const points = p.paths.map(b => b.getPoints());
			return { duration: p.duration, amount: p.amount, points, };
		});

		const stars = Object.keys(this.stars).map((starKey) => {
			const starSet = this.stars[starKey];
			return starSet.map((star) => {
				return { color: starKey, x: star.x, y: star.y };
			});
		}).flat();

		return JSON.stringify({
			stars,
			enemies,
		});
	}

	_runLine() {
		if (this.currentLineIndex < this.lines.length) {
			const currentLine = this.lines[this.currentLineIndex];
			const firstPosition = currentLine.paths[0].getPoints()[0];

			const completionCallback = () => {
				this.currentLineIndex++;
				this.scene.time.addEvent({
					delay: 1000,
					callbackScope: this,
					loop:false,
					callback: () => this._runLine(),
				});
			};

			this.enemies.push(new Enemy({
				scene: this.scene,
				x: firstPosition.x,
				y: firstPosition.y,
				lines: currentLine.paths,
				tweenConfig: {
					duration: currentLine.duration,
				},
				completionCallback,
				key: Constants.keys.sprites.enemyOne
			}));
		} else {
			this.complete = true;
		}
	}
}
