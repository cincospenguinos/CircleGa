/**
 * entityCollection.js
 *
 * Collection of entities. Manages updating all entities, and checks to see if they're still on screen.
 */
import { Constants } from '../../../const/index.js';
import { isOutOfBounds } from '../../../helpers/coordinates.js';

export class EntityCollection {
	constructor() {
		this.entities = [];
	}

	add(entity) {
		this.entities.push(entity);
	}

	get(spriteKey) {
		let toReturn = undefined;
		this.entities.forEach(e => {
			if (e.img.texture.key === spriteKey) { 
				toReturn = e;
				return;
			}
		});

		return toReturn;
	}

	getAt(index) {
		return this.entities[index];
	}

	remove(entity) {
		const index = this.entities.indexOf(entity);
		if (index > -1) {
			entity.img.destroy();
		  this.entities.splice(index, 1);
		}
	}

	all() {
		return this.entities;
	}

	count() {
		return this.entities.length;
	}

	update() {
		const toRemove = [];
		this.entities.forEach((e) => {
			if (isOutOfBounds(e.getPosition())) {
				toRemove.push(e);
			} else {
				e.update();
			}
		});

		this.entities = this.entities.filter((e) => !toRemove.includes(e));

		toRemove.forEach((e) => {
			e.img.destroy();
		});
	}

	_entityIsOutOfBounds(entity) {
		const position = entity.getPosition();
		const screen = Constants.dimensions.screen;
		return position.x < 0 || position.y < 0 || position.x > screen.width || position.y > screen.height;
	}
}