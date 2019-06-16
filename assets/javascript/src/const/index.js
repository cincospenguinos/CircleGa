import { SPRITES } from './sprites.js';
import { DIMENSIONS } from './gameConfig.js';
import { COORDINATES } from './coordinates.js';
import { ENEMY_TYPES } from './enemies.js';
import { BRIEFINGS } from './briefings.js';

const extractKeys = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => {
		keys[key] = key;
	});
	return keys;
};

const KEYS = {
	sprites: extractKeys(SPRITES),
	enemies: extractKeys(ENEMY_TYPES),
	briefings: extractKeys(BRIEFINGS),
};

const getSprite = (spriteKey) => {
	return SPRITES[spriteKey];
};

export const Constants = {
	sprites: {
		...SPRITES,
		getSprite,
	},
	keys: KEYS,
	getSprite,
	dimensions: DIMENSIONS,
	coordinates: {
		...COORDINATES,
	},
	briefings: BRIEFINGS,
};