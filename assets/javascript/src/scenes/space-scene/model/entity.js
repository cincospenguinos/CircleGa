import * as coordinateHelper from '../../../helpers/coordinates.js';

export class Entity {
	constructor(opts = {}) {
		this.img = opts.img || null;
		this.coordinates = opts.coordinates || null;
	}

	getPosition() {
		if (this.img) {
			return {
				x: this.img.x,
				y: this.img.y,
				type: 'game',
			}
		} else {
			return this.coordinates;
		}
	}

	setPosition(coordinates) {
		coordinates = coordinateHelper.toGame(coordinates);

		if (this.img) {
			this.img.setPosition(coordinates.x, coordinates.y);
		} else {
			this.coordinates = coordinates;
		}
	}

	setImg(img) {
		this.img = img;
		this.setPosition({ x: img.x, y: img.y });
	}

	spriteKey() {
		if (!this.img) {
			return undefined;
		}

		return this.img.texture.key;
	}

	setRotation(angle) {
		if (this.img) {
			this.img.rotation = angle;
		}
	}

	static handleCollision(e1, e2, onCollision) {
		const e1P1 = { x: e1.img.x - e1.img.width / 2, y: e1.img.y - e1.img.height / 2 };
		const e1P2 = { x: e1.img.x + e1.img.width / 2, y: e1.img.y + e1.img.height / 2 };
		const e2P1 = { x: e2.img.x - e2.img.width / 2, y: e2.img.y - e2.img.height / 2 };
		const e2P2 = { x: e2.img.x + e2.img.width / 2, y: e2.img.y + e2.img.height / 2 };

		if (e1P1.x < e2P2.x && e1P2.x > e2P1.x && e1P1.y < e2P2.y && e1P2.y > e2P1.y) {
			onCollision(e1, e2);
		}
	}
}