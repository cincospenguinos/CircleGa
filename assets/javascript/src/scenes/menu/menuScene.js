import { Constants } from '../../const/index.js';
import { GameState } from '../../model/gameState.js';
import { KonamiCodeListener } from './konamiCodeListener.js';

export class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.menuScene });
	}

	init() {
		this.selection = {
			onePlayer: { x: 165, y: 385, type: 'game' },
			twoPlayer: { x: 165, y: 405, type: 'game' },
			flicker: {
				colors: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFA, 0xFFFFAF, 0xFFFAFF, 0xFFAFFF, 0xFAFFFF, 0xAFFFFF],
				currentIndex: 0,
			},
			current: 'onePlayer',
		}

		this.keyValues = {
			up: 'up',
			down: 'down',
			select: 'enter',
			left: 'left',
			right: 'right',
			b: 'B',
			a: 'A',
		};
	}

	preload() {
		const menuSprite = Constants.sprites.mainMenu;
		this.load.image(Constants.keys.sprites.mainMenu, menuSprite.location);

		this.load.audio(Constants.keys.sounds.mainMenu, Constants.sounds.mainMenu.location);
		this.load.audio(Constants.keys.sounds.switchOptions, Constants.sounds.switchOptions.location);
		this.load.audio(Constants.keys.sounds.acceptOption, Constants.sounds.acceptOption.location);

		this.keys = this.input.keyboard.addKeys(this.keyValues);
	}

	create() {
		const center = Constants.coordinates.centerOfScreen;
		const menu = this.add.image(center.x, center.y, Constants.keys.sprites.mainMenu);
		menu.scale = Constants.dimensions.scale.sprite;

		this.backgroundMusic = this.sound.add(Constants.keys.sounds.mainMenu, Constants.sounds.mainMenu.config);
		this.backgroundMusic.play();

		this.switchOptionSound = this.sound.add(Constants.keys.sounds.switchOptions, Constants.sounds.switchOptions.config);
		this.acceptOptionSound = this.sound.add(Constants.keys.sounds.acceptOption, Constants.sounds.acceptOption.config);

		this.graphics = this.add.graphics();

		this.konami = new KonamiCodeListener();

		Object.keys(this.keyValues).forEach((keyName) => {
			const keyObj = this.keys[keyName];
			keyObj.addListener('down', () => {
				if (this.konami.keyPressed(keyName) || this.konami.isComplete()) {
					this.scene.start(Constants.scenes.levelEditorScene, {});
				}
			});
		});
	}

	update() {
		this.drawSelection();

		if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
			this._toggleSelection();
			this.switchOptionSound.play();
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
			this._toggleSelection();
			this.switchOptionSound.play();
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.select)) {
			this.makeSelection();
			this.acceptOptionSound.play();
		}
	}

	makeSelection() {
		const players = this.selection.current === 'onePlayer' ? 1 : 2;
		this.backgroundMusic.stop();
		GameState.init();

		setTimeout(() => this.scene.start(Constants.scenes.spaceScene, { players }), 500);
		this.scene.pause();
	}

	drawSelection() {
		this.graphics.clear();
		const pos = this._currentSelection();
		const color = this._currentColor();

		this.graphics.lineStyle(3, color, 1.0);
		this.graphics.beginPath();
		this.graphics.moveTo(pos.x, pos.y);
		this.graphics.lineTo(pos.x + 20, pos.y + 10);
		this.graphics.lineTo(pos.x, pos.y + 20);
		this.graphics.strokePath();

		this._toggleColor();
	}

	_currentSelection() {
		return this.selection[this.selection.current];
	}

	_currentColor() {
		return this.selection.flicker.colors[this.selection.flicker.currentIndex];
	}

	_toggleColor() {
		this.selection.flicker.currentIndex = (this.selection.flicker.currentIndex + 1) % this.selection.flicker.colors.length;
	}

	_toggleSelection() {
		this.selection.current = this.selection.current === 'onePlayer' ? 'twoPlayer' : 'onePlayer';
	}
}