import { DIMENSIONS } from './gameConfig.js';
import { SPRITES } from './sprites.js';

const topOfRing = { 
	x: DIMENSIONS.screen.width / 2,
	y: (DIMENSIONS.screen.height - SPRITES.gameTrack.config.frameHeight) / 2,
	cartesian: true,
};

const centerOfScreen = {
	x: DIMENSIONS.screen.width / 2,
	y: DIMENSIONS.screen.height / 2,
	cartesian: true,
}

export const COORDINATES = {
	topOfRing,
	centerOfScreen,
};