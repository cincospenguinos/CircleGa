import { Constants } from '../../../const/index.js';
import { Bezier } from './bezier.js';
import { Enemy } from './enemy.js';
import { EntityCollection } from '../services/entityCollection.js';

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
		return new EntityCollection(this.enemies);
	}

	toJson() {
		const enemies = this.lines.map((p) => {
			const points = p.paths.map(b => b.getPoints());
			return { duration: p.duration, amount: p.amount, delay: p.delay, points, };
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

	// TODO: There is still something just a little bit fishy with how things are working
	// here. The first line works just fine, but then the next line has like five or six
	// enemies and it just turns into a mess. I think this needs to be rewritten
	_runLine() {
		if (this.currentLineIndex < this.lines.length) {
			const currentLine = this.lines[this.currentLineIndex];

			const enemyProps = this._enemyPropsFor(currentLine);

			for (let i = 0; i < currentLine.amount; i++) {
				const completionCallback = () => {
					if (i === currentLine.amount - 1) {
						this.currentLineIndex++;
					}

					this.scene.time.addEvent({
						delay: 1000,
						callbackScope: this,
						loop: false,
						callback: () => this._runLine(),
					});
				};

				enemyProps.completionCallback = completionCallback;

				this.scene.time.addEvent({
					delay: i * currentLine.delay,
					callbackScope: this,
					loop: false,
					callback: () => {
						this.enemies.push(new Enemy(enemyProps));
					},
				});
			}
		} else {
			this.complete = true;
		}
	}

	_enemyPropsFor(line) {
		const { duration, delay } = line;
		const firstPosition = line.paths[0].getPoints()[0];

		return {
			scene: this.scene,
			x: firstPosition.x,
			y: firstPosition.y,
			lines: line.paths,
			tweenConfig: {
				duration,
			},
			key: Constants.keys.sprites.enemyOne
		};
	}
}
