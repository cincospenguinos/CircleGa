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
		this.playerCount = data.players;

		this.players = new EntityCollection();
		this.bullets = new Bullets();
		this.enemies = new EntityCollection();
		this.killCount = 0;
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
			p1Slow: cursors.down,
			p1Fire: cursors.up,
			p2Right: this.input.keyboard.addKey('D'),
			p2Left: this.input.keyboard.addKey('A'),
			p2Slow: this.input.keyboard.addKey('S'),
			p2Fire: this.input.keyboard.addKey('W'),
		};
	}

	create() {
		const sprites = Constants.keys.sprites;
		const { centerOfScreen, topOfRing } = Constants.coordinates;
		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(topOfRing));

		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.background);
		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.gameTrack);

		this._createPlayer(playerOnePos, sprites.playerOne);

		if (this.playerCount == 2) {
			const playerTwoPos = coordinateHelpers.toGame({ radius: coordinateHelpers.radius, theta: Math.PI, type: 'polar' });
			this._createPlayer(playerTwoPos, sprites.playerTwo);
		}

		this.input.on('pointerdown', (pointer) => {
			console.log(`[${pointer.x}, ${pointer.y}]`);
		});
	}

	update() {
		if (this.enemies.all().length < 1) {
			this._spawnEnemy();
		}

		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		this._handleInput(playerOne, playerTwo);
		this._handleCollisions(playerOne, playerTwo);

		this.players.update();
		this.enemies.update();
		this.bullets.update();
	}

	_handleInput(playerOne, playerTwo) {
		if (this.keys.p1Right.isDown) {
			playerOne.accelerate(1);
		} else if (this.keys.p1Left.isDown) {
			playerOne.accelerate(-1);
		} else if (this.keys.p1Slow.isDown) {
			playerOne.slow();
		}

		if (this.keys.p1Fire.isDown) {
			this._fireBullet(playerOne, Constants.sprites.playerOne.key, Constants.sprites.redBullet.key);
		}

		if (this.playerCount == 2) {
			if (this.keys.p2Right.isDown) {
				playerTwo.accelerate(1);
			} else if (this.keys.p2Left.isDown) {
				playerTwo.accelerate(-1);
			} else if (this.keys.p2Slow.isDown) {
				playerTwo.slow();
			}

			if (this.keys.p2Fire.isDown) {
				this._fireBullet(playerTwo, Constants.sprites.playerTwo.key, Constants.sprites.blueBullet.key);
			}
		}
	}

	_handleCollisions(playerOne, playerTwo) {
		// player collision management
		if (this.playerCount === 2) {
			Entity.handleCollision(this.playerOne, this.playerTwo, () => {
				if (this.playerOne.canMove() && this.playerTwo.canMove()) {
					this.playerOne.collidedWithPlayer();
					this.playerTwo.collidedWithPlayer();
				}
			});
		}

		// Enemy collisions
		this.enemies.all().forEach((e) => {
			Entity.handleCollision(playerOne, e, () => {
				playerOne.img.destroy();
				this.enemies.remove(e);
				console.log(`Killed ${++this.killCount}`);
			});

			if (this.playerCount === 2) {
				Entity.handleCollision(playerTwo, e, () => {
					playerTwo.img.destroy();
					this.enemies.remove(e);
					console.log(`Killed ${++this.killCount}`);
				});
			}
		});

		// Bullet collisions
		this.bullets.all().forEach((b) => {
			Entity.handleCollision(playerOne, b, () => {
				if (b.firingOrigin !== Constants.sprites.playerOne.key) {
					this.bullets.remove(b);
					playerOne.img.destroy();
				}
			});

			if (this.playerCount === 2) {
				Entity.handleCollision(playerTwo, b, () => {
					if (b.firingOrigin !== Constants.sprites.playerTwo.key) {
						this.bullets.remove(b);
						playerTwo.img.destroy();
					}
				});
			}

			this.enemies.all().forEach((e) => {
				Entity.handleCollision(e, b, () => {
					if (b.firingOrigin !== Constants.sprites.enemyOne.key) {
						this.enemies.remove(e);
						this.bullets.remove(b);
						console.log(`Killed ${++this.killCount}`);
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

	_spawnEnemy() {
		const allPoints = Constants.enemies.father.positions;
		const index = Math.floor(Math.random() * Math.floor(allPoints.length));
		const positions = allPoints[index];

		const { centerOfScreen } = Constants.coordinates;
		const enemy = this.physics.add.sprite(centerOfScreen.x, centerOfScreen.y, Constants.sprites.enemyOne.key);
		this.enemies.add(new Enemy(enemy, { positions, ...Constants.enemies.father.opts }));
	}

	_createPlayer(position, sprite, opts = {}) {
		coordinateHelpers.toGame(position);
		const img = this.physics.add.sprite(position.x, position.y, sprite);
		const player = new Player(img, opts);
		this.players.add(player);
	}
}