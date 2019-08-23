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

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.spaceScene });
	}

	init(data) {
		const gameState = GameState.getInstance();
		const levelKey = Constants.levelOrder[gameState.getCurrentLevelIndex()];

		this.playerCount = data.players;
		this.currentLevel = Constants.levels[levelKey];

		this.players = new EntityCollection();
		this.bullets = new Bullets();
		this.killCount = 0;
		this.finishedTutorial = gameState.hasFinishedTutorial();

		this.collisionValidation = new CollisionValidation(this.players, this.bullets);
	}

	preload() {
		this.load.json(this.currentLevel.key, this.currentLevel.location);

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

		this.level = new Level(this.cache.json.get(this.currentLevel.key));
		if (!this.finishedTutorial) {
			this.tutorial = new Tutorial({
				playerCount: this.playerCount,
			});
		}
	}

	update() {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		if (!this.finishedTutorial) {
			if (!this.tutorial.taskShown()) {
				const task = this.tutorial.getCurrentTask();

				this.timeToHideTask = false;
				this.currentTaskKey = task.key;

				this.time.addEvent({
					delay: task.timeToShow,
					callback: () => {
						this.timeToHideTask = true;

						if (task.key === 'lastThing') {
							this.tutorial.updateSubTask('lastThing', true);
							this.tutorial.completeTask(task.key);
						}

						this._completeTask(task.key);
					},
					loop: false,
				});

				this._showTask(task.text);
				this.tutorial.showTask();
			}

			this.time.addEvent({
				delay: 500,
				callback: () => {
					this._completeTask(this.currentTaskKey);
				},
				loop: true,
			});
		} else {
			if (this.level.isComplete()) {
				console.log('Level complete!');
				GameState.getInstance().levelComplete();
				this.scene.start(Constants.scenes.textScene);
				return;
			}

			if (!this.level.aliensFleeing()) {
				this.level.createAliens(this);
			}
		}

		this._handleInput(playerOne, playerTwo);
		this.collisionValidation.handleCollisions(this.level.getAliens());
		this.players.update();
		this.bullets.update();
	}

	enemyFired(enemy) {
		const enemyPosition = enemy.getPosition();
		const playerToShoot = this._getPlayerToShoot(enemyPosition);

		if (enemy.canFire() && this.level.getAliens().contains(enemy) && playerToShoot) {
			const sprite = this.physics.add.sprite(enemyPosition.x, enemyPosition.y, Constants.keys.sprites.enemyBullet);
			this.bullets.addBullet(sprite, enemy.spriteKey(), playerToShoot.getPosition());
			enemy.fireBullet();
		}
	}

	_getPlayerToShoot(enemyPosition) {
		if (this.players.count() == 0) {
			return null;
		}

		if (this.players.count() == 1) {
			return this.players.getAt(0);
		}

		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		if (coordinateHelpers.distanceBetween(playerOne.getPosition(), enemyPosition) < 
			coordinateHelpers.distanceBetween(playerTwo.getPosition(), enemyPosition)) {
			return playerOne;
		}

		return playerTwo;
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

	_showTask(text) {
		this.currentText = this.add.text(Constants.coordinates.centerOfScreen.x, Constants.coordinates.centerOfScreen.y, text);
		this.currentText.x -= this.currentText.width / 2;
	}

	_completeTask(key) {
		if (this.timeToHideTask && !this.tutorial.hasFinished() && this.tutorial.currentTaskComplete(key)) {
			this.currentText.destroy();
			this.tutorial.nextTask();

			if (this.tutorial.hasFinished()) {
				this.finishedTutorial = true;
			}
		}
	}

	_fireBullet(player, playerSpriteKey, bulletSpriteKey) {
		if (this.bullets.bulletCountFor(playerSpriteKey) < 2 && player.canFire()) {
			const bulletPosition = player.fireBullet();
			const sprite = this.physics.add.sprite(bulletPosition.x, bulletPosition.y, bulletSpriteKey);
			this.bullets.addBullet(sprite, playerSpriteKey);
		}
	}

	_createPlayer(position, sprite, opts = {}) {
		coordinateHelpers.toGame(position);
		const img = this.physics.add.sprite(position.x, position.y, sprite);
		const player = new Player(img, opts);
		this.players.add(player);
	}
}