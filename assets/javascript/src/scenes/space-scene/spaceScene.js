import { Constants } from '../../const/index.js';
import * as coordinateHelpers from '../../helpers/coordinates.js';
import { Entity } from './model/entity.js'
import { Player } from './model/player.js';
import { Bullets } from './model/bullets.js';
import { Enemies } from './model/enemies.js';

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.spaceScene });
	}

	init(data) {
		this.playerOne = new Player();
		this.playerTwo = new Player();
		this.bullets = new Bullets();
		this.enemies = new Enemies();
	}

	preload() {
		const background = Constants.sprites.background;
		this.load.image(Constants.keys.sprites.background, background.location);

		const playerOne = Constants.sprites.playerOne;
		this.load.spritesheet(Constants.keys.sprites.playerOne, playerOne.location, playerOne.config);

		const playerTwo = Constants.sprites.playerTwo;
		this.load.spritesheet(Constants.keys.sprites.playerTwo, playerTwo.location, playerTwo.config);

		const track = Constants.sprites.gameTrack;
		this.load.image(Constants.keys.sprites.gameTrack, track.location);

		const p1Bullet = Constants.sprites.redBullet;
		this.load.spritesheet(Constants.keys.sprites.redBullet, p1Bullet.location, p1Bullet.config);

		const p2Bullet = Constants.sprites.blueBullet;
		this.load.spritesheet(Constants.keys.sprites.blueBullet, p2Bullet.location, p2Bullet.config);

		const enemyBullet = Constants.sprites.enemyBullet;
		this.load.spritesheet(Constants.keys.sprites.enemyBullet, enemyBullet.location, enemyBullet.config);

		const enemyOne = Constants.sprites.enemyOne;
		this.load.spritesheet(Constants.keys.sprites.enemyOne, enemyOne.location, enemyOne.config);

		const cursors = this.input.keyboard.createCursorKeys();

		this.keys = {
			p1Right: cursors.right,
			p1Left: cursors.left,
			p1Fire: cursors.up,
			p2Right: this.input.keyboard.addKey('D'),
			p2Left: this.input.keyboard.addKey('A'),
			p2Fire: this.input.keyboard.addKey('W'),
		};
	}

	create() {
		const sprites = Constants.keys.sprites;
		const topOfRing = Constants.coordinates.topOfRing;
		const center = Constants.coordinates.centerOfScreen;

		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(topOfRing));

		this.add.image(center.x, center.y, sprites.background);
		this.add.image(center.x, center.y, sprites.gameTrack);
		const playerImg = this.physics.add.sprite(playerOnePos.x, playerOnePos.y, sprites.playerOne);
		this.playerOne.setImg(playerImg);

		const playerTwoPos = coordinateHelpers.toGame({ radius: coordinateHelpers.radius, theta: Math.PI, type: 'polar' });
		const playerTwoImg = this.physics.add.sprite(playerTwoPos.x, playerTwoPos.y, sprites.playerTwo);
		this.playerTwo.setImg(playerTwoImg);

		const enemy = this.physics.add.sprite(center.x, center.y, sprites.enemyOne);
		this.enemies.addEnemy(enemy, Constants.keys.enemies.domeHead);
	}

	update() {
		this._handleInput();

		// player collision management
		Entity.handleCollision(this.playerOne, this.playerTwo, () => {
			if (this.playerOne.canMove() && this.playerTwo.canMove()) {
				this.playerOne.collidedWithPlayer();
				this.playerTwo.collidedWithPlayer();
			}
		});

		// Enemy collisions
		this.enemies.all().forEach((e) => {
			Entity.handleCollision(this.playerOne, e, () => {
				console.log('Enemy crashed into player 1');
			});

			Entity.handleCollision(this.playerTwo, e, () => {
				console.log('Enemy crashed into player 2');
			});
		});

		// Bullet collisions
		this.bullets.all().forEach((b) => {
			Entity.handleCollision(this.playerOne, b, () => {
				if (b.firingOrigin !== Constants.keys.sprites.playerOne) {
					console.log('Player one is hit!');
				}
			});

			Entity.handleCollision(this.playerTwo, b, () => {
				if (b.firingOrigin !== Constants.keys.sprites.playerTwo) {
					console.log('Player two is hit!');
				}
			});

			this.enemies.all().forEach((e) => {
				Entity.handleCollision(e, b, () => {
					if (b.firingOrigin !== Constants.keys.sprites.enemyOne) {
						console.log('Enemy is hit!');
					}
				});
			});
		});

		this.playerOne.update();
		this.playerTwo.update();
		this.bullets.update();

		const enemyBullets = this.enemies.update();
		if (enemyBullets.length) {
			enemyBullets.forEach((bullet) => {
				const sprite = this.physics.add.sprite(bullet.x, bullet.y, Constants.keys.sprites.enemyBullet);
				this.bullets.addBullet(sprite, Constants.keys.sprites.enemyOne, Math.random() < 0.5 ? this.playerOne.getPosition() : this.playerTwo.getPosition());
			});
		}
	}

	_handleInput() {
		if (this.keys.p1Right.isDown) {
			this.playerOne.accelerate(1);
		} else if (this.keys.p1Left.isDown) {
			this.playerOne.accelerate(-1);
		}

		if (this.keys.p1Fire.isDown) {
			this._fireBullet(this.playerOne, Constants.keys.sprites.playerOne, Constants.keys.sprites.redBullet);
		}

		if (this.keys.p2Right.isDown) {
			this.playerTwo.accelerate(1);
		} else if (this.keys.p2Left.isDown) {
			this.playerTwo.accelerate(-1);
		}

		if (this.keys.p2Fire.isDown) {
			this._fireBullet(this.playerTwo, Constants.keys.sprites.playerTwo, Constants.keys.sprites.blueBullet);
		}
	}

	_fireBullet(player, playerSpriteKey, bulletSpriteKey) {
		if (this.bullets.bulletCountFor(playerSpriteKey) < 2 && player.canFire()) {
			const bullet = player.fireBullet();
			const sprite = this.physics.add.sprite(bullet.x, bullet.y, bulletSpriteKey);
			this.bullets.addBullet(sprite, playerSpriteKey);
		}
	}
}