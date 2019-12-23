import { Constants } from '../../../const/index.js';
import { Entity } from '../model/entity.js';
import { Player } from '../model/player.js';

export class CollisionValidation {
	constructor(players, bullets) {
		this.players = players;
		this.bullets = bullets;
	}

	handleCollisions(aliens) {
		const playerOne = this.players.get(Constants.sprites.playerOne.key);
		const playerTwo = this.players.get(Constants.sprites.playerTwo.key);

		this._playerToPlayer(playerOne, playerTwo);
		aliens.all().forEach((a) => {
			this._playerToEnemy(playerOne, aliens, a);
			this._playerToEnemy(playerTwo, aliens, a);
		});

		this.bullets.all().forEach((b) => {
			this._playerToBullet(playerOne, b);
			this._playerToBullet(playerTwo, b);

			aliens.all().forEach(a => this._enemyToBullet(aliens, a, b));
		});
	}

	_playerToPlayer(playerOne, playerTwo) {
		if (playerOne && playerTwo) {
			Entity.handleCollision(playerOne, playerTwo, () => {
				if (playerOne.canMove() && playerTwo.canMove()) {
					Player.handleCollision(playerOne, playerTwo);
				}
			});
		}
	}

	_playerToEnemy(player, aliens, alien) {
		if (player) {
			Entity.handleCollision(player, alien, () => {
				this.players.remove(player);
				aliens.remove(alien);
			});
		}
	}

	_playerToBullet(player, bullet) {
		if (player) {
			Entity.handleCollision(player, bullet, () => {
				if (bullet.firingOrigin !== player.texture.key) {
					this.bullets.remove(bullet);
					this.players.remove(player);
				}
			});
		}
	}

	_enemyToBullet(aliens, enemy, bullet) {
		Entity.handleCollision(enemy, bullet, () => {
			if (enemy.visible && bullet.firingOrigin !== enemy.texture.key) {
				aliens.remove(enemy);
				this.bullets.remove(bullet);
			}
		});
	}
}