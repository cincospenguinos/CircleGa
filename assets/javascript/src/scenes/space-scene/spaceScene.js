import { Constants } from '../../const/index.js';


export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SpaceScene' });
	}

	preload() {
		const player = Constants.getSprite(Constants.keys.sprites.playerOne);
		this.load.spritesheet(Constants.keys.sprites.playerOne, player.location, player.config);
		// console.log(Constants);
	}

	create() {
		this.add.sprite(200, 200, Constants.keys.sprites.playerOne);
	}

	update() {}
}