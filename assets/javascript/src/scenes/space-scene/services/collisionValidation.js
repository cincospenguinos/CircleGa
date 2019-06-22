import { Constants } from '../../../const/index.js';
import { Entity } from '../model/entity.js';

export class CollisionValidation {
	constructor(players, aliens, bullets) {
		this.players = players;
		this.aliens = aliens;
		this.bullets = bullets;
	}

	handleCollisions() {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		this._playerToPlayer(playerOne, playerTwo);
		this.aliens.all().forEach((a) => {
			this._playerToEnemy(playerOne, a);
			this._playerToEnemy(playerTwo, a);
		});

		this.bullets.all().forEach((b) => {
			this._playerToBullet(playerOne, b);
			this._playerToBullet(playerTwo, b);

			this.aliens.all().forEach(a => this._enemyToBullet(a, b));
		});
	}

	_playerToPlayer(playerOne, playerTwo) {
		if (playerOne && playerTwo) {
			Entity.handleCollision(playerOne, playerTwo, () => {
				if (playerOne.canMove() && playerTwo.canMove()) {
					playerOne.collidedWithPlayer();
					playerTwo.collidedWithPlayer();
				}
			});
		}
	}

	_playerToEnemy(player, alien) {
		if (player) {
			Entity.handleCollision(player, alien, () => {
				this.players.remove(player);
				this.aliens.remove(alien);
			});
		}
	}

	_playerToBullet(player, bullet) {
		if (player) {
			Entity.handleCollision(player, bullet, () => {
				if (bullet.firingOrigin !== player.spriteKey()) {
					this.bullets.remove(bullet);
					this.players.remove(player);
				}
			});
		}
	}

	_enemyToBullet(enemy, bullet) {
		Entity.handleCollision(enemy, bullet, () => {
			if (bullet.firingOrigin !== enemy.spriteKey()) {
				this.aliens.remove(enemy);
				this.bullets.remove(bullet);
			}
		});
	}
}