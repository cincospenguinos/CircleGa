import { Constants } from '../../../const/index.js';
import { EntityCollection } from './entityCollection.js';
import { Enemy } from '../model/enemy.js';

export class LineExecution {
	constructor(scene, line) {
		this.scene = scene;
		this.currentLine = line;

		this.enemies = [];
		this.started = false;
		this.complete = false;
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
							this.complete = true;
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

	isComplete() {
		return this.enemies.length === 0 && this.started || this.complete;
	}

	_enemyProps() {
		const { duration, delay } = this.currentLine;
		const firstPosition = this.currentLine.paths[0].getPoints()[0];

		return {
			scene: this.scene,
			x: firstPosition.x,
			y: firstPosition.y,
			lines: this.currentLine.paths,
			tweenConfig: {
				duration,
			},
			key: Constants.keys.sprites.enemyOne
		};
	}
}
