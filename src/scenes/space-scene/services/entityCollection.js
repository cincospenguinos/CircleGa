/**
 * entityCollection.js
 *
 * Collection of entities. Manages updating all entities, and checks to see if they're still on screen.
 */
import { Constants } from '../../../const/index.js';
import { isOutOfBounds } from '../../../helpers/coordinates.js';

export class EntityCollection {
	constructor(entities = undefined) {
		this.entities = entities || [];
	}

	add(entity) {
		this.entities.push(entity);
	}

	get(spriteKey) {
		let toReturn = undefined;
		this.entities.forEach(e => {
			if (e.texture.key === spriteKey) { 
				toReturn = e;
				return;
			}
		});

		return toReturn;
	}

	getAt(index) {
		return this.entities[index];
	}

	contains(entity) {
		return this.entities.indexOf(entity) !== -1;
	}

	remove(entity) {
		const index = this.entities.indexOf(entity);
		if (index > -1) {
			entity.destroy();
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
			e.destroy();
		});
	}
}