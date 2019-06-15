import { SPRITES } from './sprites.js';
import { DIMENSIONS } from './gameConfig.js';

const extractKeys = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => {
		keys[key] = key;
	});
	return keys;
};

const KEYS = {
	sprites: extractKeys(SPRITES),
};

const getSprite = (spriteKey) => {
	return SPRITES[spriteKey];
}

export const Constants = {
	sprites: {
		...SPRITES,
		getSprite,
	},
	keys: KEYS,
	getSprite,
	dimensions: DIMENSIONS,
};