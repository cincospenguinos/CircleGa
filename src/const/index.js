import { SPRITES } from './sprites.js';
import { DIMENSIONS, CONFIG, ORDER } from './gameConfig.js';
import { COORDINATES } from './coordinates.js';
import { ENEMY_TYPES } from './enemies.js';
import { BRIEFINGS } from './briefings.js';
import { SCENES } from './scenes.js';
import { SOUNDS } from './sounds.js';
import { TEXT, TEXT_ORDER } from './text.js';
import { LEVELS, LEVEL_ORDER } from './levels.js';
import { COMMUNICATIONS } from './communications.js';
import { FONTS } from './fonts.js';

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
	texts: extractKeys(TEXT),
	levels: extractKeys(LEVELS),
	communications: extractKeys(COMMUNICATIONS),
};

export const Constants = {
	briefings: BRIEFINGS,
	config: CONFIG,
	coordinates: appendKeysTo(COORDINATES),
	dimensions: appendKeysTo(DIMENSIONS),
	enemies: appendKeysTo(ENEMY_TYPES),
	fonts: FONTS,
	keys: KEYS,
	scenes: SCENES,
	sounds: appendKeysTo(SOUNDS),
	sprites: appendKeysTo(SPRITES),
	texts: appendKeysTo(TEXT),
	levels: appendKeysTo(LEVELS),
	levelOrder: LEVEL_ORDER,
	order: ORDER,
	textOrder: TEXT_ORDER,
	communications: appendKeysTo(COMMUNICATIONS),
};