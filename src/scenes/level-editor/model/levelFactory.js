import { Constants } from '../../../const/index.js';
import { Level } from '../../space-scene/model/level.js';
import { Bezier } from '../../space-scene/model/bezier.js';

/**
 * Okay, we need to name some shit:
 *
 * - The line that an enemy travels is called a path, represented by the Bezier class (rename class forthcoming.)
 * - The set of paths that one or more enemies follow is called a Line
 * - A set of lines is what makes up a level
 */

const getDefaultPoints = () => {
	return [
		Constants.coordinates.centerOfScreen,
		{ x: 100, y: 200 },
		{ x: 100, y: 300 },
		{ x: 100, y: 400 },
	];
};

const STAR_KEYS = {
	red: Constants.keys.sprites.redStar,
	blue: Constants.keys.sprites.blueStar,
	yellow: Constants.keys.sprites.yellowStar,
};

export class LevelFactory {
	constructor(scene) {
		this.scene = scene;

		this.lines = [];
		this.paths = [];
		this.currentPath = this._createNewPath();
		this.tweenConfig = {
			duration: 500,
			amount: 1,
			delay: 300,
		};
		this.stars = {
			red: [],
			blue: [],
			yellow: [],
		};
	}

	appendPath() {
		const nextPositions = this._nextPositions();

		this.currentPath.disable();
		this.paths.push(this.currentPath);
		this.currentPath = this._createNewPath(nextPositions);
	}

	newPath() {
		this.paths.push(this.currentPath);
		this.paths.forEach(p => p.erase());
		this.lines.push({
			duration: this.tweenConfig.duration,
			amount: this.tweenConfig.amount,
			delay: this.tweenConfig.delay,
			paths: this.paths,
		});

		this.paths = [];
		this.currentPath = this._createNewPath();
	}

	addStar(starColor) {
		const spriteKey = STAR_KEYS[starColor];
		const star = this.scene.add.sprite(this.scene.input.x, this.scene.input.y, spriteKey)
			.setInteractive({ draggable: true });
		this.stars[starColor].push(star);
	}

	getCurrentLine() {
		return this.paths.concat(this.currentPath);
	}

	getLevel(oldDimensions) {
		const { screen } = Constants.dimensions;
		const originalX = (screen.width - oldDimensions.width) / 2;
		const originalY = (screen.height - oldDimensions.height) / 2;

		const stars = {};
		Object.keys(this.stars).forEach((color) => {
			stars[color] = this.stars[color].map((star) => {
				star.x -= originalX;
				star.y -= originalY;

				return star;
			});
		});

		const lines = this.lines.map((line) => {
			line.paths.forEach((bezier) => {
				bezier.points.forEach((p) => {
					p.x -= originalX;
					p.y -= originalY;
				});
			});

			return line;
		});

		return new Level(this.scene, lines, stars);
	}

	getTweenConfig() {
		return this.tweenConfig;
	}

	setTweenConfig(config) {
		this.tweenConfig = config;
	}

	_nextPositions() {
		const previousPosition = this.currentPath.getPoints()[3];
		return getDefaultPoints().map((position, index) => {
			if (index === 0) {
				return { x: previousPosition.x, y: previousPosition.y };
			}

			return { x: position.x, y: position.y };
		});
	}

	_createNewPath(points = null) {
		return new Bezier(this.scene, points || getDefaultPoints());
	}
}
