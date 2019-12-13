import { Constants } from '../../const/index.js';
import { Enemy } from '../space-scene/model/enemy.js';
import { EnemyPath } from './model/enemyPath.js';
import { PathMenu } from './view/pathMenu.js';
import { distanceBetween } from '../../helpers/coordinates.js';

// TODO: Handle a firing point

export class LevelEditorScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.levelEditorScene });
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
			update: 'U',
			commit: 'enter',
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
		this.enemyPath = new EnemyPath(this);

    this.run();
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.toggleMenu)) {
			this.menu.toggle();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.update)) {
			// TODO: Update properly
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.commit)) {
			this.enemyPath.commitCurrentSet();
		}
	}

	run() {
		const enemy = new Enemy({
			scene: this,
			x: -100,
			y: -100,
			key: Constants.sprites.enemyOne.key,
			path: this.enemyPath,
			tweenConfig: {
				duration: this.menu.getDuration(),
				delay: this.menu.getDelay(),
			}
		});
	}

	_createPoint(position, color) {
		const point = this.add.image(position.x, position.y, Constants.sprites.point.key);
		point.setTint(color);
		point.setInteractive();

		return point;
	}
}