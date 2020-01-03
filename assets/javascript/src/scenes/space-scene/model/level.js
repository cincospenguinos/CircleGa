import { Constants } from '../../../const/index.js';
import { Bezier } from './bezier.js';
import { Enemy } from './enemy.js';
import { LineExecution } from '../services/lineExecution.js';
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
		this.lock = false;
		this.started = false;
		this.complete = false;
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
		this._runLine();
		debugger;
	}

	update() {
		if (!this.complete) {
			if (this.currentLine && this.currentLine.isComplete() && !this.lock) {
				this.lock = true;
				this.currentLineIndex++;
				this._runLine();
			}
		}
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
			this.currentLine = new LineExecution(this.scene, currentLine, { playersDead: this.playersDead });
			this.currentLine.execute();
			this.lock = false;
		} else {
			this.complete = true;
		}
	}
}
