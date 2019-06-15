import { SPRITES } from './sprites.js';

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

export default {
	sprites: SPRITES,
	keys: KEYS,
};