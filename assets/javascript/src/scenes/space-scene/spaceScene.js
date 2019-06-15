import { Constants } from '../../const/index.js';
import * as coordinateHelpers from '../../helpers/coordinates.js';
import { Player } from './model/player.js';
import { Bullets } from './model/bullets.js';


export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SpaceScene' });
	}

	init(data) {
		this.playerOne = new Player();
		this.playerTwo = new Player();
		this.bullets = new Bullets();
	}

	preload() {
		const player = Constants.getSprite(Constants.keys.sprites.playerOne);
		this.load.spritesheet(Constants.keys.sprites.playerOne, player.location, player.config);

		const playerTwo = Constants.getSprite(Constants.keys.sprites.playerTwo);
		this.load.spritesheet(Constants.keys.sprites.playerTwo, playerTwo.location, playerTwo.config);

		const track = Constants.getSprite(Constants.keys.sprites.gameTrack);
		this.load.image(Constants.keys.sprites.gameTrack, track.location);

		const p1Bullet = Constants.getSprite(Constants.keys.sprites.redBullet);
		this.load.spritesheet(Constants.keys.sprites.redBullet, p1Bullet.location, p1Bullet.config);

		const cursors = this.input.keyboard.createCursorKeys();

		this.keys = {
			p1Right: cursors.right,
			p1Left: cursors.left,
			p1Fire: this.input.keyboard.addKey('SPACE'),
			p2Right: this.input.keyboard.addKey('D'),
			p2Left: this.input.keyboard.addKey('A'),
		};
	}

	create() {
		const sprites = Constants.keys.sprites;
		const topOfRing = Constants.coordinates.topOfRing;
		const center = Constants.coordinates.centerOfScreen;

		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(topOfRing));

		this.add.image(center.x, center.y, sprites.gameTrack);
		const playerImg = this.add.sprite(playerOnePos.x, playerOnePos.y, sprites.playerOne);
		this.playerOne.setImg(playerImg);

		const playerTwoPos = coordinateHelpers.toGame({ radius: coordinateHelpers.radius, theta: Math.PI, type: 'polar' });
		const playerTwoImg = this.add.sprite(playerTwoPos.x, playerTwoPos.y, sprites.playerTwo);
		this.playerTwo.setImg(playerTwoImg);
	}

	update() {
		if (this.keys.p1Right.isDown) {
			this.playerOne.accelerate(1);
		} else if (this.keys.p1Left.isDown) {
			this.playerOne.accelerate(-1);
		}

		if (this.keys.p1Fire.isDown) {
			const bullet = this.playerOne.fireBullet();

			if (bullet) {
				const sprite = this.add.sprite(bullet.x, bullet.y, Constants.keys.sprites.redBullet);
				this.bullets.addBullet(sprite);
			}
		}

		if (this.keys.p2Right.isDown) {
			this.playerTwo.accelerate(1);
		} else if (this.keys.p2Left.isDown) {
			this.playerTwo.accelerate(-1);
		}

		this.playerOne.update();
		this.playerTwo.update();
		this.bullets.update();
	}
}