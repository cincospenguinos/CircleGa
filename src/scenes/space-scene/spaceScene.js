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
import { Tutorial } from './model/tutorial.js';
import { Bezier } from './model/bezier.js';
import * as romanNumeralHelpers from './services/romanNumerals.js';
import { LifeCount } from './view/lifeCount.js';
import store from '../../state/store.js';

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.spaceScene });
	}

	init(data) {
		const gameState = GameState.getInstance();

		this.playerCount = data.players;
		this.levelInfo = data.content;
		this.lifeCountView = new LifeCount(this, { lifeCount: data.lifeCount });

		this.players = new EntityCollection();
		this.bullets = new Bullets(this);
		this.killCount = 0;
		this.finishedTutorial = gameState.hasFinishedTutorial();

		this.collisionValidation = new CollisionValidation(this.players, this.bullets);

		Player.updateStaticProps(store.getState());
		Bullets.updateStaticProps(store.getState());
	}

	preload() {
		this._loadLevel();

		const {
			background, playerOne, yellowStar,
			gameTrack, redBullet, blueBullet,
			enemyBullet, warrior, nonWarrior, redStar,
			blueStar,
		} = Constants.sprites;

		this.load.image(gameTrack.key, gameTrack.location);
		this.load.image(background.key, background.location);
		this.load.image(redStar.key, redStar.location, redStar.config);
		this.load.image(blueStar.key, blueStar.location, blueStar.config);
		this.load.image(yellowStar.key, yellowStar.location, yellowStar.config);
		this.load.spritesheet(playerOne.key, playerOne.location, playerOne.config);
		this.load.spritesheet(redBullet.key, redBullet.location, redBullet.config);
		this.load.spritesheet(blueBullet.key, blueBullet.location, blueBullet.config);
		this.load.spritesheet(enemyBullet.key, enemyBullet.location, enemyBullet.config);
		this.load.spritesheet(warrior.key, warrior.location, warrior.config);
		this.load.spritesheet(nonWarrior.key, nonWarrior.location, nonWarrior.config);

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

		this.tutorial = new Tutorial(this, () => this.currentLevel.start());
	}

	create() {
		const sprites = Constants.keys.sprites;
		const { centerOfScreen, bottomOfRing } = Constants.coordinates;

		this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.background);
		const track = this.add.image(centerOfScreen.x, centerOfScreen.y, sprites.gameTrack);
		track.setScale(Constants.dimensions.scale.gameTrack);

		const playerOne = this._createPlayerOne();
		this.players.add(playerOne);

		this.currentLevel = this._createLevel();
		this.currentLevel.draw();

		this.lifeCountView.draw();

		if (this.tutorial.isComplete()) {
			const currentLevelNum = parseInt(this.levelInfo.replace('.json', ''));
			const indicatorText = this._getIndicatorText();
			const levelIndicator = this._showString(indicatorText);

			setTimeout(() => {
				levelIndicator.destroy();
				this.currentLevel.start();
			}, 2000);
		}
	}

	_getIndicatorText() {
		const numbers = this.levelInfo.replace('.json', '').split('_');
		const stage = romanNumeralHelpers.toRomanNumerals(numbers[0]);
		const level = romanNumeralHelpers.toRomanNumerals(numbers[1]).toLowerCase();

		return `${stage}.${level}`;
	}

	update() {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);

		this._handleInput(playerOne);
		this.players.update();
		this.bullets.update();

		this.tutorial.update();

		if (this._levelLoaded()) {
			const aliens = this.currentLevel.getAliens();

			if (this._arePlayersDead() && aliens.count() === 0) {
				const playerOne = this._createPlayerOne();
				this.players.add(playerOne);
				this.currentLevel.setPlayersDead(false);

				const string = this._showString('Ready');

				setTimeout(() => {
					this.currentLevel.unlock();
					string.destroy();
				}, 1000);
			}

			this.currentLevel.update();

			this.collisionValidation.handleCollisions(aliens);

			if (this._arePlayersDead()) {
				this.lifeCountView.updateLifeTotal(-1);
			}

			this.currentLevel.setPlayersDead(this._arePlayersDead());

			if (this.currentLevel.isComplete()) {
				this._completeLevel();
			}
		}
	}

	_arePlayersDead() {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);

		return !playerOne;
	}

	_loadLevel() {
		this.levelKey = this.levelInfo.replace('.json', '-level');
		this.load.json(this.levelKey, `assets/data/levels/${this.levelInfo}`);
	}

	_handleInput(playerOne) {
		if (playerOne) {
			if (playerOne.canMove()) {
				if (this.keys.p1Right.isDown) {
					this.tutorial.completeTask('movement');
					playerOne.accelerate(1);
				} else if (this.keys.p1Left.isDown) {
					this.tutorial.completeTask('movement');
					playerOne.accelerate(-1);
				} else {
					playerOne.slow();
				}
			}

			if (this.keys.p1Fire.isDown) {
				this._fireBullet(playerOne, Constants.sprites.playerOne.key, Constants.sprites.redBullet.key);
			}
		}
	}

	_fireBullet(player, playerSpriteKey, bulletSpriteKey) {
		this.tutorial.completeTask('firing');

		if (this.bullets.bulletCountFor(playerSpriteKey) < Player.MAX_BULLETS && player.canFire()) {
			const bulletPosition = player.fireBullet();
			this.bullets.addBullet(playerSpriteKey, bulletPosition);
		}
	}

	_createPlayerOne() {
		const bottomOfRing = Constants.coordinates.bottomOfRing;
		const playerOnePos = coordinateHelpers.toGame(coordinateHelpers.toPolar(bottomOfRing));

		return new Player({
			scene: this,
			x: playerOnePos.x,
			y: playerOnePos.y,
			key: Constants.keys.sprites.playerOne,
		});
	}

	_createLevel() {
		const levelData = this.cache.json.get(this.levelKey);

		const stars = levelData.stars;
		const enemies = levelData.enemies.map((enemyData) => {
			const { duration, delay, amount } = enemyData;
			return {
				duration,
				delay,
				amount,
				paths: enemyData.points.map(p => new Bezier(this, p, { editMode: false })),
			}
		});

		return new Level(this, enemies, stars, (enemy) => this._enemyFires(enemy));
	}

	_enemyFires(enemy) {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		this.bullets.addBullet(enemy.texture.key, { x: enemy.x, y: enemy.y },
			{ x: playerOne.x, y: playerOne.y });
	}

	_completeLevel() {
		this.currentLevel = null;

		const instance = GameState.getInstance();
		instance.levelComplete();
		setTimeout(() => GameState
			.getInstance()
			.transition(this, { lifeCount: this.lifeCountView.livesLeft }),
		1000);
	}

	_levelLoaded() {
		return !!this.currentLevel;
	}

	_showString(str) {
		const centerOfScreen = Constants.coordinates.centerOfScreen;
		const string = this.add.text(centerOfScreen.x, centerOfScreen.y, str);
		string.x = (Constants.dimensions.screen.width - string.width) / 2;

		return string;
	}
}
