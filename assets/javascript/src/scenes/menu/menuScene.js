import { Constants } from '../../const/index.js';

export class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: 'MenuScene' });
	}

	init() {}

	preload() {
		const menu = Constants.getSprite(Constants.keys.sprites.mainMenu);
		this.load.image(Constants.keys.sprites.mainMenu, menu.location);
	}

	create() {
		const center = Constants.coordinates.centerOfScreen;
		this.add.image(center.x, center.y, Constants.keys.sprites.mainMenu);
	}

	update() {}
}