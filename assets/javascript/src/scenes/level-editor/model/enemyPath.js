import { Constants } from '../../../const/index.js';
import { Bezier } from './bezier.js';

export class EnemyPath {
	constructor(scene, opts = {}) {
		this.scene = scene;
		this.paths = [];
		this.colors = ['0x00ff00', '0x008800', '0x880000', '0xff0000'];

		this.createBezier();
	}

	getPath() {
		throw 'Implement me!';
	}

	getPaths() {
		return this.paths.concat([this.bezier.getPoints()]);
	}

	commitCurrentSet() {
		const oldPoints = this.bezier.getPoints();
		this.bezier.disable();
		this.paths.push(oldPoints);

		const points = [this._createPoint(oldPoints[3], this.colors[0])];
		for (let i = 1; i < 4; i++) {
			const position = { x: 100 * (i + 1), y: 100 * (i + 1) };
			const point = this._createPoint(position, this.colors[i]);
			points.push(point);
		}

		this.bezier = new Bezier(this.scene.input, this.scene.add.graphics(), { points });
	}

	createBezier() {
		const points = this._defaultPoints();

		this.bezier = new Bezier(this.scene.input, this.scene.add.graphics(), { points });
		this.bezier.draw();
	}

	_createPoint(position, color) {
		const point = this.scene.add.image(position.x, position.y, Constants.sprites.point.key);
		point.setTint(color);
		point.setInteractive();

		return point;
	}

	_defaultPoints() {
		const { centerOfScreen } = Constants.coordinates;
		const points = [];

		points.push(this._createPoint(centerOfScreen, this.colors[0]));

		for (let i = 1; i < 4; i++) {
			const position = { x: 100 * (i + 1), y: 100 * (i + 1) };
			const point = this._createPoint(position, this.colors[i]);
			points.push(point);
		}

		return points;
	}
}
