import { SPRITES } from './sprites.js';
import { DIMENSIONS, CONFIG } from './gameConfig.js';
import { COORDINATES } from './coordinates.js';
import { ENEMY_TYPES } from './enemies.js';
import { BRIEFINGS } from './briefings.js';
import { SCENES } from './scenes.js';
import { SOUNDS } from './sounds.js';
import { TEXT } from './text.js';
import { LEVELS, LEVEL_ORDER } from './levels.js';

const extractKeys = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => {
		keys[key] = key;
	});
	return keys;
};

const appendKeysTo = (data) => {
	const keys = Object.keys(data);
	keys.forEach((k) => data[k].key = k);
	return data;
};

const KEYS = {
	sprites: extractKeys(SPRITES),
	enemies: extractKeys(ENEMY_TYPES),
	briefings: extractKeys(BRIEFINGS),
	scenes: extractKeys(SCENES),
	sounds: extractKeys(SOUNDS),
	text: extractKeys(TEXT),
	levels: extractKeys(LEVELS),
};

export const Constants = {
	briefings: BRIEFINGS,
	config: CONFIG,
	coordinates: appendKeysTo(COORDINATES),
	dimensions: appendKeysTo(DIMENSIONS),
	enemies: appendKeysTo(ENEMY_TYPES),
	keys: KEYS,
	scenes: SCENES,
	sounds: appendKeysTo(SOUNDS),
	sprites: appendKeysTo(SPRITES),
	text: appendKeysTo(TEXT),
	levels: LEVELS,
	levelOrder: LEVEL_ORDER,
};