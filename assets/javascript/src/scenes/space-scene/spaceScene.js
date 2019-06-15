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
		// console.log(Constants);
	}

	create() {
		const sprites = Constants.keys.sprites;
		this.add.sprite(200, 200, sprites.playerOne);
		this.add.image(540, 460, sprites.gameTrack);
	}

	update() {
		
	}
}