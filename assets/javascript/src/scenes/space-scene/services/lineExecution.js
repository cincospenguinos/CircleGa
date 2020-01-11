import { Constants } from '../../../const/index.js';
import { EntityCollection } from './entityCollection.js';
import { Enemy } from '../model/enemy.js';

export class LineExecution {
	constructor(scene, line, config = {}) {
		this.scene = scene;
		this.currentLine = line;

		this.enemies = [];
		this.started = false;
		this.complete = false;
		this.playersDead = config.playersDead || false;
		this.amountLeft = this.currentLine.amount;
		this.executions = [];
		this.enemyOpts = config.enemyOpts || {};
	}

	execute() {
		const props = this._enemyProps();

		for (let i = 0; i < this.currentLine.amount; i++) {
			this.scene.time.addEvent({
				delay: i * this.currentLine.delay,
				callback: () => {
					const enemy = new Enemy({
						...props,
						completionCallback: () => {
							this.amountLeft -= 1;

							if (this.amountLeft === 0) {
								this.enemies = [];
							}
						},
					});

					this.enemies.push(enemy);
					this.started = true;
				},
				callbackScope: this,
				loop: false,
			});
		}
	}

	setPlayersDead(bool) {
		this.playersDead = bool;

		if (this.playersDead) {
			this.enemies.forEach(e => e.doubleTime());
		} else {
			this.enemies.forEach(e => e.normalTime());
		}
	}

	isComplete() {
		return this.amountLeft <= 0;
	}

	_enemyProps() {
		const { duration, delay } = this.currentLine;
		const firstPosition = this.currentLine.paths[0].getPoints()[0];
		const trueDuration = this.playersDead ? duration / 2 : duration;

		return {
			scene: this.scene,
			x: firstPosition.x,
			y: firstPosition.y,
			lines: this.currentLine.paths,
			tweenConfig: {
				duration: trueDuration,
			},
			...this.enemyOpts,
			key: Constants.keys.sprites.enemyOne
		};
	}
}
