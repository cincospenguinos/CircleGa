import { DIMENSIONS } from './gameConfig.js';
import { SPRITES } from './sprites.js';

const topOfRing = { 
	x: DIMENSIONS.screen.width / 2,
	y: (DIMENSIONS.screen.height - SPRITES.gameTrack.config.frameHeight) / 2,
	type: 'game',
};

const centerOfScreen = {
	x: DIMENSIONS.screen.width / 2,
	y: DIMENSIONS.screen.height / 2,
	type: 'game',
}

export const COORDINATES = {
	topOfRing,
	centerOfScreen,
};