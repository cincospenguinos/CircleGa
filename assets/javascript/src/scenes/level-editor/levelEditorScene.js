import { Constants } from '../../const/index.js';
import { Enemy } from '../space-scene/model/enemy.js';
import { Bezier } from './model/bezier.js';
// import { EnemyPath } from './model/enemyPath.js';
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

		this.beziers = [];
	}

	init(data) {}

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
		});

		this.input.on('drag', (_, point, posX, posY) => {
			point.x = posX;
			point.y = posY;
		});
	}

	create() {
		const { centerOfScreen } = Constants.coordinates;
		this.add.image(centerOfScreen.x, centerOfScreen.y, Constants.sprites.gameTrack.key);

		const redStar = this.add.sprite(500, 50, Constants.sprites.redStar.key).setInteractive({ draggable: true });
		const blueStar = this.add.sprite(700, 50, Constants.sprites.blueStar.key).setInteractive({ draggable: true });

		const menuNode = this.add.dom(200, 200, 'div', '');
		this.menu = new PathMenu(menuNode);
		this.bezier = new Bezier(this, { points: DEFAULT_POINTS });
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.toggleMenu)) {
			this.menu.toggle();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.execute)) {
			// TODO: Run the enemy
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.createBezier)) {
			const previousPoints = this.bezier.getPoints();
			const nextPoints = DEFAULT_POINTS.map((position, index) => {
				if (index === 0) {
					return { x: previousPoints[3].x, y: previousPoints[3].y };
				}

				return { x: position.x, y: position.y};
			});

			this.bezier.disable();
			this.beziers.push(this.bezier);
			this.bezier = new Bezier(this, { points: nextPoints });
		}
	}
}