import { Constants } from '../../const/index.js';


export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SpaceScene' });
	}

	preload() {
		const player = Constants.getSprite(Constants.keys.sprites.playerOne);
		this.load.spritesheet(Constants.keys.sprites.playerOne, player.location, player.config);

		const track = Constants.getSprite(Constants.keys.sprites.gameTrack);
		this.load.image(Constants.keys.sprites.gameTrack, track.location);
	}

	create() {
		const sprites = Constants.keys.sprites;
		const topOfRing = Constants.topOfRing;
		this.add.image(Constants.dimensions.screen.width / 2, Constants.dimensions.screen.height / 2, sprites.gameTrack);
		this.add.sprite(topOfRing.x, topOfRing.y, sprites.playerOne);
	}

	update() {

	}
}