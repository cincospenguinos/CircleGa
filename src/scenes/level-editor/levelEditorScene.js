import ReactDOM from 'react-dom';
import { Constants } from '../../const/index.js';
import { Enemy } from '../space-scene/model/enemy.js';
import { distanceBetween } from '../../helpers/coordinates.js';
import { LevelFactory } from './model/levelFactory.js';
import store from '../../state/store.js';
import * as actions from '../../state/actions/levelEditorActions.js';
import * as selectors from '../../state/selectors/levelEditorSelectors.js';

export class LevelEditorScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.levelEditorScene });

		this.paths = [];
		this.beziers = [];
		this.stars = {
			red: [],
			blue: [],
		};

		this.dispatch = store.dispatch;

		this.keyMapping = {
			toggleMenu: 'M',
			addItem: 'A',
			execute: 'E',
			createBezier: 'B',
			export: 'ENTER',
			nextPath: 'N',
		};
	}

	preload() {
		this._increaseScreenSize();
		const { warrior, nonWarrior, point, gameTrack,
						redStar, blueStar, yellowStar } = Constants.sprites;

		this.load.image(gameTrack.key, gameTrack.location, gameTrack.config);
		this.load.spritesheet(warrior.key, warrior.location, warrior.config);
		this.load.spritesheet(nonWarrior.key, nonWarrior.location, nonWarrior.config);
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
		this.lineGraphics = this.add.graphics();
		this.lineGraphics.setDefaultStyles({
			lineStyle: {
				width: 1,
				color: 0x22FF22,
				alpha: 1,
			},
		});

		this._showOldBoundaries();
		const { centerOfScreen } = Constants.coordinates;
		const track = this.add.image(centerOfScreen.x, centerOfScreen.y, Constants.sprites.gameTrack.key);
		track.setScale(Constants.dimensions.scale.gameTrack);

		store.dispatch(actions.setEditorVisible(true));
		this.factory = new LevelFactory(this);
	}

	update() {
		this._handleInput();

		this.lineGraphics.clear();
		if (selectors.showStarLines(store.getState())) {
			const { centerOfScreen } = Constants.coordinates;

			Object.values(this.factory.stars).flat().forEach((star) => {
				let line = new Phaser.Geom.Line(star.x, star.y, centerOfScreen.x, centerOfScreen.y);
				line = Phaser.Geom.Line.Extend(line, 1000, 1000);
				this.lineGraphics.strokeLineShape(line);
			});
		}
	}

	_increaseScreenSize() {
		this.oldDimensions = { ...Constants.dimensions.screen };

		Constants.dimensions.screen.width *= 1.5;
		Constants.dimensions.screen.height *= 1.5;
		const { width, height } = Constants.dimensions.screen;

		Constants.coordinates.centerOfScreen = {
			x: width / 2,
			y: height / 2,
		};

		this.scale.resize(width, height);
	}

	_showOldBoundaries() {
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
	}

	_handleInput() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.toggleMenu)) {
			const isVisible = selectors.isEditorVisible(store.getState());
			this.dispatch(actions.setEditorVisible(!isVisible));
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.execute)) {
			this._runEnemy();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.createBezier)) {
			this.factory.appendPath();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.addItem)) {
			const selectedItem = selectors.getSelectedItem(store.getState());
			switch(selectedItem) {
				case 'red':
				case 'blue':
				case 'yellow': {
					this.factory.addStar(selectedItem);
				}
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.export)) {
			const level = this.factory.getLevel(this.oldDimensions);
			const json = level.toJson();
			console.log(json);
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.nextPath)) {
			this.factory.newPath();
		}
	}

	_runEnemy() {
		const { centerOfScreen } = Constants.coordinates;
		const lines = this.factory.getCurrentLine();
		const tweenConfig = selectors.getTweenConfig(store.getState());
		this.factory.setTweenConfig(tweenConfig);

		new Enemy({
			scene: this,
			x: centerOfScreen.x,
			y: centerOfScreen.y,
			lines,
			tweenConfig,
		});
	}
}