/**
 * entityCollection.js
 *
 * Collection of entities. Manages updating all entities, and checks to see if they're still on screen.
 */
import { Constants } from '../../../const/index.js';

export class EntityCollection {
	constructor() {
		this.entities = [];
	}

	add(entity) {
		this.entities.push(entity);
	}

	all() {
		return this.entities;
	}

	update() {
		const toRemove = [];
		this.entities.forEach((e) => {
			if (e.isOutOfBounds()) {
				toRemove.push(e);
			} else {
				e.update();
			}
		});

		this.entities = this.entities.filter((e) => !toRemove.includes(e));

		toRemove.forEach((e) => {
			this.originCounts[b.firingOrigin] -= 1;
			e.img.destroy();
		});
	}

	_entityIsOutOfBounds(entity) {
		const position = entity.getPosition();
		const screen = Constants.dimensions.screen;
		return position.x < 0 || position.y < 0 || position.x > screen.width || position.y > screen.height;
	}
}