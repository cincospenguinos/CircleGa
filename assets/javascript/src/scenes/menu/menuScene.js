import { Constants } from '../../const/index.js';

export class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.menuScene });
	}

	init() {
		this.selection = {
			onePlayer: { x: 145, y: 445, type: 'game' },
			twoPlayer: { x: 145, y: 476, type: 'game' },
			flicker: {
				colors: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFA, 0xFFFFAF, 0xFFFAFF, 0xFFAFFF, 0xFAFFFF, 0xAFFFFF],
				currentIndex: 0,
			},
			current: 'onePlayer',
		}
	}

	preload() {
		const menuSprite = Constants.sprites.mainMenu;
		this.load.image(Constants.keys.sprites.mainMenu, menuSprite.location);

		this.load.audio(Constants.keys.sounds.mainMenu, Constants.sounds.mainMenu.location);

		this.keys = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			select: 'enter',
		});
	}

	create() {
		const center = Constants.coordinates.centerOfScreen;
		this.add.image(center.x, center.y, Constants.keys.sprites.mainMenu);

		this.backgroundMusic = this.sound.add(Constants.keys.sounds.mainMenu, Constants.sounds.mainMenu.config);
		this.backgroundMusic.play();

		this.graphics = this.add.graphics();
	}

	update() {
		this.drawSelection();

		if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
			this._toggleSelection();
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
			this._toggleSelection();
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.select)) {
			this.makeSelection();
		}
	}

	makeSelection() {
		const players = this.selection.current === 'onePlayer' ? 1 : 2;
		this.backgroundMusic.stop();
		this.scene.start(Constants.scenes.spaceScene, { players });
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