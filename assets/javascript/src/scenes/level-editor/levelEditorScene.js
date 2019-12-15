import { Constants } from '../../const/index.js';
import { Enemy } from '../space-scene/model/enemy.js';
import { Bezier } from './model/bezier.js';
import { Level } from './model/level.js';
import { PathMenu } from './view/pathMenu.js';
import { distanceBetween } from '../../helpers/coordinates.js';

const DEFAULT_POINTS = [
	Constants.coordinates.centerOfScreen,
	{ x: 100, y: 200 },
	{ x: 100, y: 300 },
	{ x: 100, y: 400 },
];

export class LevelEditorScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.levelEditorScene });

		this.paths = [];
		this.beziers = [];
		this.tweenConfig = {
			duration: 500,
			amount: 1,
			// delay: 300, // TODO: Fix the delay or something
		};
		this.stars = {
			red: [],
			blue: [],
		};
	}

	preload() {
		const { enemyOne, point, gameTrack, redStar, blueStar } = Constants.sprites;

		this.load.spritesheet(enemyOne.key, enemyOne.location, enemyOne.config);
		this.load.image(point.key, point.location, point.config);
		this.load.image(gameTrack.key, gameTrack.location, gameTrack.config);
		this.load.image(redStar.key, redStar.location, redStar.config);
		this.load.image(blueStar.key, blueStar.location, blueStar.config);

		this.keys = this.input.keyboard.addKeys({
			toggleMenu: 'M',
			execute: 'E',
			createBezier: 'SPACE',
			redStar: 'R',
			blueStar: 'B',
			export: 'ENTER',
			nextPath: 'N',
		});

		this.input.on('drag', (_, point, posX, posY) => {
			point.x = posX;
			point.y = posY;
		});
	}

	create() {
		const { centerOfScreen } = Constants.coordinates;
		this.add.image(centerOfScreen.x, centerOfScreen.y, Constants.sprites.gameTrack.key);

		const menuNode = this.add.dom(200, 200, 'div', '');
		this.menu = new PathMenu(menuNode, (a, b, c) => this._updateTweenConfig(a, b, c));
		this.bezier = new Bezier(this, { points: DEFAULT_POINTS });
	}

	update() {
		this._handleInput();
	}

	_handleInput() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.toggleMenu)) {
			this.menu.toggle();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.execute)) {
			this._runEnemy();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.createBezier)) {
			this._addNewBezier();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.redStar)) {
			this._addStar(Constants.sprites.redStar.key, this.stars.red);
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.blueStar)) {
			this._addStar(Constants.sprites.blueStar.key, this.stars.blue);
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.export)) {
			const path = this.beziers.concat(this._getEnemyPathFrom(this.bezier));
			const stars = Object.keys(this.stars)
				.map((starColor) => this.stars[starColor].map(s => {
					return { x: s.x, y: s.y, key: s.texture.key };
				}))
				.flat();

			const level = new Level(path, stars);
			console.log(level.toJson());
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.nextPath)) {
			this._getCurrentPath().forEach(b => b.erase());
			const path = this.beziers.concat(this.bezier);
			this.paths.push(path);
			this.beziers = [];
			this.bezier = new Bezier(this, { points: DEFAULT_POINTS });
		}
	}

	_runEnemy() {
		const { centerOfScreen } = Constants.coordinates;
		const path = this._getCurrentPath();

		new Enemy({
			scene: this,
			x: centerOfScreen.x,
			y: centerOfScreen.y,
			key: Constants.sprites.enemyOne.key,
			path,
			tweenConfig: this.tweenConfig,
		});
	}

	_addNewBezier() {
		const previousPoints = this.bezier.getPoints();
		const nextPoints = DEFAULT_POINTS.map((position, index) => {
			if (index === 0) {
				return { x: previousPoints[3].x, y: previousPoints[3].y };
			}

			return { x: position.x, y: position.y};
		});

		this.bezier.disable();

		const enemyPath = this._getEnemyPathFrom(this.bezier);

		this.beziers.push(enemyPath);
		this.bezier = new Bezier(this, { points: nextPoints });
	}

	_updateTweenConfig(duration, amount, delay) {
		this.tweenConfig = {
			duration,
			amount,
			// delay, // TODO: delay is being used incorrectly. We want to create that number of enemies, spaced across that delay
		};
	}

	_addStar(spriteKey, set) {
		const star = this.add.sprite(this.input.x, this.input.y, spriteKey).setInteractive({ draggable: true });
		set.push(star);
	}

	_getCurrentPath() {
		return this.beziers.map(p => p.bezier).concat(this.bezier);
	}

	_getEnemyPathFrom(bezier) {
		return {
			duration: this.tweenConfig.duration,
			amount: this.tweenConfig.amount,
			bezier,
		};
	}
}