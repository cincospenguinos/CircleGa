import { createStore } from 'redux';
import reducer from './reducers/index.js';

const player = {
	acceleration: Math.PI / 1024,
	maxVelocity: Math.PI / 128,
	bulletVelocity: 12,
	maxBullets: 2,
	bulletCooldown: 45,
	currentLevel: 1,
	lifeTotal: 3,
};

const levelEditor = {
	editorVisible: false,
	amount: 1,
	delay: 300,
	duration: 2000,
	showStarLines: false,
};

export default createStore(reducer, { player, levelEditor });
