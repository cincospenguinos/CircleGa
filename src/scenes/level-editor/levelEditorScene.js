import { Constants } from '../../const/index.js';
import { Enemy } from '../space-scene/model/enemy.js';
import { PathMenu } from './view/pathMenu.js';
import { LevelDataView } from './view/levelDataView.js';
import { InputView } from './view/inputView.js';
import { distanceBetween } from '../../helpers/coordinates.js';
import { LevelFactory } from './model/levelFactory.js';

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
		this.stars = {
			red: [],
			blue: [],
		};

		this.keyMapping = {
			toggleMenu: 'M',
			execute: 'E',
			createBezier: 'SPACE',
			redStar: 'R',
			blueStar: 'B',
			yellowStar: 'Y',
			export: 'ENTER',
			nextPath: 'N',
			showInputView: 'H',
		};
	}

	preload() {
		this.oldDimensions = { ...Constants.dimensions.screen };

		Constants.dimensions.screen.width *= 1.5;
		Constants.dimensions.screen.height *= 1.5;
		const { width, height } = Constants.dimensions.screen;

		Constants.coordinates.centerOfScreen = {
			x: width / 2,
			y: height / 2,
		};

		this.scale.resize(width, height);
		this.cameras.main.setBounds(0, 0, width, height);

		const { enemyOne, point, gameTrack, redStar, blueStar, yellowStar } = Constants.sprites;

		this.load.image(gameTrack.key, gameTrack.location, gameTrack.config);
		this.load.spritesheet(enemyOne.key, enemyOne.location, enemyOne.config);
		this.load.image(point.key, point.location, point.config);
		this.load.image(redStar.key, redStar.location, redStar.config);
		this.load.image(blueStar.key, blueStar.location, blueStar.config);
		this.load.image(yellowStar.key, yellowStar.location, yellowStar.config);

		this.keys = this.input.keyboard.addKeys(this.keyMapping);

		this.input.on('drag', (_, point, posX, posY) => {
			point.x = posX;
			point.y = posY;
		});
	}

	create() {
		const graphics = this.add.graphics();
		graphics.setDefaultStyles({
			lineStyle: {
				width: 1,
				color: 0xffffff,
				alpha: 1,
			},
			fillStyle: {
				alpha: 0,
			}
		});

		const x = (Constants.dimensions.screen.width - this.oldDimensions.width) / 2;
		const y = (Constants.dimensions.screen.height - this.oldDimensions.height) / 2;

		graphics.strokeRect(x, y, this.oldDimensions.width, this.oldDimensions.height);

		const { centerOfScreen } = Constants.coordinates;
		const track = this.add.image(centerOfScreen.x, centerOfScreen.y, Constants.sprites.gameTrack.key);
		track.setScale(Constants.dimensions.scale.gameTrack);

		const menuNode = this.add.dom(200, 200, 'div', '');
		this.menu = new PathMenu(menuNode, (amount, duration, delay) => this.factory.updateTweenConfig(amount, duration, delay));

		const levelDataNode = this.add.dom(350, 350, 'div', '');
		this.levelDataView = new LevelDataView(levelDataNode);

		const inputViewNode = this.add.dom(centerOfScreen.x, 700, 'div', '');
		this.inputView = new InputView(inputViewNode, this.keyMapping);
		this.factory = new LevelFactory(this);
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
			this.factory.appendPath();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.redStar)) {
			this.factory.addStar('red');
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.blueStar)) {
			this.factory.addStar('blue');
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.yellowStar)) {
			this.factory.addStar('yellow');
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.export)) {
			const level = this.factory.getLevel();
			const json = level.toJson();
			this.levelDataView.show(json);
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.nextPath)) {
			this.factory.newPath();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.showInputView)) {
			this.inputView.toggle();
		}
	}

	_runEnemy() {
		const { centerOfScreen } = Constants.coordinates;
		const lines = this.factory.getCurrentLine();
		const tweenConfig = this.factory.getTweenConfig();

		new Enemy({
			scene: this,
			x: centerOfScreen.x,
			y: centerOfScreen.y,
			key: Constants.sprites.enemyOne.key,
			lines,
			tweenConfig,
		});
	}
}