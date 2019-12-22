import { Constants } from '../../../const/index.js';
import * as coordinateHelper from '../../../helpers/coordinates.js';

export class Entity extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		
		this.scene = config.scene;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(Constants.dimensions.scale.sprite);
	}

	getPosition() {
		return { x: this.x, y: this.y, type: 'game' };
	}

	static handleCollision(e1, e2, onCollision) {
		const e1P1 = { x: e1.x - e1.width / 2, y: e1.y - e1.height / 2 };
		const e1P2 = { x: e1.x + e1.width / 2, y: e1.y + e1.height / 2 };
		const e2P1 = { x: e2.x - e2.width / 2, y: e2.y - e2.height / 2 };
		const e2P2 = { x: e2.x + e2.width / 2, y: e2.y + e2.height / 2 };

		if (e1P1.x < e2P2.x && e1P2.x > e2P1.x && e1P1.y < e2P2.y && e1P2.y > e2P1.y) {
			onCollision(e1, e2);
		}
	}
}
