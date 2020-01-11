import { Constants } from '../../../const/index.js';
import { Bezier } from './bezier.js';
import { Enemy } from './enemy.js';
import { LineExecution } from '../services/lineExecution.js';
import { EntityCollection } from '../services/entityCollection.js';

const STAR_KEYS = {
	red: Constants.keys.sprites.redStar,
	blue: Constants.keys.sprites.blueStar,
	yellow: Constants.keys.sprites.yellowStar,
};

export class Level {
	constructor(scene, lines, stars, fireCallback = undefined) {
		this.lines = lines;
		this.stars = stars;
		this.scene = scene;

		this.enemies = [];
		this.lock = false;
		this.started = false;
		this.complete = false;
		this.fireCallback = fireCallback;
	}

	draw() {
		this.stars.forEach((s) => {
			const spriteKey = STAR_KEYS[s.color];
			this.scene.add.sprite(s.x, s.y, spriteKey);
		});
	}

	start() {
		this.started = true;
		this.currentLineIndex = 0;
		setTimeout(() => this._runLine(), 1000);
	}

	update() {
		if (!(this.complete || this.lock)) {
			if (this.currentLine && this.currentLine.isComplete()) {
				this.lock = true;
				this.currentLineIndex++;
				this._runLine();
			}

			if (this.playersDead) {
				this.currentLine.setPlayersDead(true);
				this.lock = true;
			}
		}
	}

	unlock() {
		this.lock = false;
	}

	isStarted() {
		return this.started;
	}

	isComplete() {
		return this.started && this.complete;
	}

	setPlayersDead(bool) {
		this.playersDead = bool;
	}

	getAliens() {
		const aliens = this.currentLine ? this.currentLine.enemies : [];
		return new EntityCollection(aliens);
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

	_runLine() {
		if (this.currentLineIndex < this.lines.length) {
			const currentLine = this.lines[this.currentLineIndex];
			this.currentLine = new LineExecution(this.scene, currentLine, {
				playersDead: this.playersDead,
				enemyOpts: this._enemyOpts(),
			});
			this.currentLine.execute();
			this.lock = false;
		} else {
			this.complete = true;
		}
	}

	_enemyOpts() {
		return {
			yellowStarPositions: this.stars.filter(star => star.color === 'yellow'),
			fireCallback: (enemy) => {
				if (this.fireCallback) {
					this.fireCallback(enemy);
				}
			},
		}
	}
}
