import { Constants } from '../../const/index.js';
import * as coordinateHelpers from '../../helpers/coordinates.js';
import { Player } from './model/player.js';


export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SpaceScene' });
	}

	init(data) {
		this.playerOne = new Player();
	}

	preload() {
		const player = Constants.getSprite(Constants.keys.sprites.playerOne);
		this.load.spritesheet(Constants.keys.sprites.playerOne, player.location, player.config);

		const track = Constants.getSprite(Constants.keys.sprites.gameTrack);
		this.load.image(Constants.keys.sprites.gameTrack, track.location);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	create() {
		const sprites = Constants.keys.sprites;
		const topOfRing = Constants.coordinates.topOfRing;
		const center = Constants.coordinates.centerOfScreen;

		const spritePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(topOfRing));
		console.log(spritePos);

		this.add.image(center.x, center.y, sprites.gameTrack);
		this.add.sprite(spritePos.x, spritePos.y, sprites.playerOne);
	}

	update() {

	}
}