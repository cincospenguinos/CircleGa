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
};

const topOfRing = { 
	x: DIMENSIONS.screen.width / 2,
	y: (DIMENSIONS.screen.height - SPRITES.gameTrack.config.frameHeight) / 2,
};

export const Constants = {
	sprites: {
		...SPRITES,
		getSprite,
	},
	keys: KEYS,
	getSprite,
	dimensions: DIMENSIONS,
	topOfRing,
};