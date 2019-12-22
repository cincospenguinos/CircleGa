import { Constants } from '../../const/index.js';
import { GameState } from '../../model/gameState.js';
import * as coordinateHelpers from '../../helpers/coordinates.js';
import { Entity } from './model/entity.js'
import { Player } from './model/player.js';
import { Enemy } from './model/enemy.js';
import { Bullets } from './model/bullets.js';
import { EntityCollection } from './services/entityCollection.js';
import { CollisionValidation } from './services/collisionValidation.js';
import { Level } from './model/level.js';
import { Tutorial } from './tutorial/tutorial.js';
import { Bezier } from './model/bezier.js';

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.spaceScene });
	}

	init(data) {
		const gameState = GameState.getInstance();
		const levelKey = Constants.levelOrder[gameState.getCurrentLevelIndex()];

		this.playerCount = data.players;
		this.levelInfo = Constants.levels[levelKey];

		this.players = new EntityCollection();
		this.bullets = new Bullets(this);
		this.killCount = 0;
		this.finishedTutorial = gameState.hasFinishedTutorial();

		this.collisionValidation = new CollisionValidation(this.players, this.bullets);
	}

	preload() {
		this.load.json(this.levelInfo.key, this.levelInfo.location);

		const {
			background, playerOne, playerTwo,
			gameTrack, redBullet, blueBullet,
			enemyBullet, enemyOne, redStar,
			blueStar,
		} = Constants.sprites;

		this.load.image(gameTrack.key, gameTrack.location);
		this.load.image(background.key, background.location);
		this.load.image(redStar.key, redStar.location, redStar.config);
		this.load.image(blueStar.key, blueStar.location, blueStar.config);
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
		const { centerOfScreen, bottomOfRing } = Constants.coordinates;
		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(bottomOfRing));

		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.background);
		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.gameTrack);

		const playerOne = this._createPlayer(playerOnePos, sprites.playerOne);
		this.players.add(playerOne);

		if (this.playerCount == 2) {
			const playerTwoPos = coordinateHelpers.toGame({ radius: coordinateHelpers.radius, theta: Math.PI, type: 'polar' });
			const playerTwo = this._createPlayer(playerTwoPos, sprites.playerTwo);
			this.players.add(playerTwo);
		}

		this.currentLevel = this._createLevel();
		this.currentLevel.draw();
		this.time.addEvent({
			delay: 1000,
			callback: () => { this.currentLevel.start() },
			callbackScope: this,
			loop: false,
		});
	}

	update() {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		this._handleInput(playerOne, playerTwo);
		// TODO: Fix this
		this.collisionValidation.handleCollisions(this.currentLevel.getAliens());
		this.players.update();
		this.bullets.update();
	}

	_handleInput(playerOne, playerTwo) {
		if (playerOne) {
			if (playerOne.canMove()) {
				if (this.keys.p1Right.isDown) {
					playerOne.accelerate(1);
					if (this.tutorial) { this.tutorial.updateSubTask('playerOneHasMoved', true); }
				} else if (this.keys.p1Left.isDown) {
					playerOne.accelerate(-1);
					if (this.tutorial) { this.tutorial.updateSubTask('playerOneHasMoved', true); }
				} else if (this.keys.p1Slow.isDown) {
					playerOne.slow();
					if (this.tutorial) { this.tutorial.updateSubTask('playerOneHasSlowed', true); }
				}
			}

			if (this.keys.p1Fire.isDown) {
				this._fireBullet(playerOne, Constants.sprites.playerOne.key, Constants.sprites.redBullet.key);
			}
		}

		if (playerTwo) {
			if (playerTwo.canMove()) {
				if (this.keys.p2Right.isDown) {
					playerTwo.accelerate(1);
					if (this.tutorial) { this.tutorial.updateSubTask('playerTwoHasMoved', true); }
				} else if (this.keys.p2Left.isDown) {
					playerTwo.accelerate(-1);
					if (this.tutorial) { this.tutorial.updateSubTask('playerTwoHasMoved', true); }
				} else if (this.keys.p2Slow.isDown) {
					playerTwo.slow();
					if (this.tutorial) { this.tutorial.updateSubTask('playerTwoHasSlowed', true); }
				}
			}

			if (this.keys.p2Fire.isDown) {
				this._fireBullet(playerTwo, Constants.sprites.playerTwo.key, Constants.sprites.blueBullet.key);
			}
		}
	}

	_fireBullet(player, playerSpriteKey, bulletSpriteKey) {
		if (this.tutorial) {
			if (playerSpriteKey === Constants.keys.sprites.playerOne) { this.tutorial.updateSubTask('playerOneHasFired', true); }
			if (playerSpriteKey === Constants.keys.sprites.playerTwo) { this.tutorial.updateSubTask('playerTwoHasFired', true); }
		}

		if (this.bullets.bulletCountFor(playerSpriteKey) < 2 && player.canFire()) {
			const bulletPosition = player.fireBullet();
			this.bullets.addBullet(playerSpriteKey, bulletPosition);
		}
	}

	_createPlayer(position, key, opts = {}) {
		return new Player({
			scene: this,
			x: position.x,
			y: position.y,
			key,
		});
	}

	_createLevel() {
		const levelData = this.cache.json.get(this.levelInfo.key);

		const stars = levelData.stars;
		const enemies = levelData.enemies.map((enemyData) => {

			return {
				duration: enemyData.duration,
				amount: enemyData.amount,
				paths: enemyData.points.map(p => new Bezier(this, p, { editMode: false })),
			}
		});

		return new Level(this, enemies, stars);
	}
}