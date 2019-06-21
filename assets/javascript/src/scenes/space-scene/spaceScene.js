import { Constants } from '../../const/index.js';
import * as coordinateHelpers from '../../helpers/coordinates.js';
import { Entity } from './model/entity.js'
import { Player } from './model/player.js';
import { Enemy } from './model/enemy.js';
import { Bullets } from './model/bullets.js';
import { EntityCollection } from './model/entityCollection.js';

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.spaceScene });
	}

	init(data) {
		this.playerOne = new Player();
		this.playerTwo = new Player();
		this.bullets = new Bullets();
		this.enemies = new EntityCollection();
	}

	preload() {
		const { 
			background, playerOne, playerTwo,
			gameTrack, redBullet, blueBullet,
			enemyBullet, enemyOne
		} = Constants.sprites;

		this.load.image(gameTrack.key, gameTrack.location);
		this.load.image(background.key, background.location);
		this.load.spritesheet(playerOne.key, playerOne.location, playerOne.config);
		this.load.spritesheet(playerTwo.key, playerTwo.location, playerTwo.config);
		this.load.spritesheet(redBullet.key, redBullet.location, redBullet.config);
		this.load.spritesheet(blueBullet.key, blueBullet.location, blueBullet.config);
		this.load.spritesheet(enemyBullet.key, enemyBullet.location, enemyBullet.config);
		this.load.spritesheet(enemyOne.key, enemyOne.location, enemyOne.config);

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
		const { centerOfScreen, topOfRing } = Constants.coordinates;

		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(topOfRing));

		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.background);
		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.gameTrack);
		const playerImg = this.physics.add.sprite(playerOnePos.x, playerOnePos.y, sprites.playerOne);
		this.playerOne.setImg(playerImg);

		const playerTwoPos = coordinateHelpers.toGame({ radius: coordinateHelpers.radius, theta: Math.PI, type: 'polar' });
		const playerTwoImg = this.physics.add.sprite(playerTwoPos.x, playerTwoPos.y, sprites.playerTwo);
		this.playerTwo.setImg(playerTwoImg);

		this.input.on('pointerdown', (pointer) => {
			console.log(`[${pointer.x}, ${pointer.y}]`);
		});

		const enemy = this.physics.add.sprite(centerOfScreen.x, centerOfScreen.y, sprites.enemyOne);
		this.enemies.add(new Enemy(enemy, Constants.enemies.father.opts));
	}

	update() {
		this._handleInput();
		this._handleCollisions();

		this.playerOne.update();
		this.playerTwo.update();
		this.enemies.update();
		this.bullets.update();
	}

	_handleInput() {
		if (this.keys.p1Right.isDown) {
			this.playerOne.accelerate(1);
		} else if (this.keys.p1Left.isDown) {
			this.playerOne.accelerate(-1);
		}

		if (this.keys.p1Fire.isDown) {
			this._fireBullet(this.playerOne, Constants.sprites.playerOne.key, Constants.sprites.redBullet.key);
		}

		if (this.keys.p2Right.isDown) {
			this.playerTwo.accelerate(1);
		} else if (this.keys.p2Left.isDown) {
			this.playerTwo.accelerate(-1);
		}

		if (this.keys.p2Fire.isDown) {
			this._fireBullet(this.playerTwo, Constants.sprites.playerTwo.key, Constants.sprites.blueBullet.key);
		}
	}

	_handleCollisions() {
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
				if (b.firingOrigin !== Constants.sprites.playerOne.key) {
					console.log('Player one is hit!');
				}
			});

			Entity.handleCollision(this.playerTwo, b, () => {
				if (b.firingOrigin !== Constants.sprites.playerTwo.key) {
					console.log('Player two is hit!');
				}
			});

			this.enemies.all().forEach((e) => {
				Entity.handleCollision(e, b, () => {
					if (b.firingOrigin !== Constants.sprites.enemyOne.key) {
						console.log('Enemy is hit!');
					}
				});
			});
		});
	}

	_fireBullet(player, playerSpriteKey, bulletSpriteKey) {
		if (this.bullets.bulletCountFor(playerSpriteKey) < 2 && player.canFire()) {
			const bullet = player.fireBullet();
			const sprite = this.physics.add.sprite(bullet.x, bullet.y, bulletSpriteKey);
			this.bullets.addBullet(sprite, playerSpriteKey);
		}
	}
}