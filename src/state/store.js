import { createStore } from 'redux';
import reducer from './reducers/index.js';

const player = {
	acceleration: Math.PI / 1024,
	maxVelocity: Math.PI / 128,
	bulletVelocity: 12,
	maxBullets: 1,
	bulletCooldown: 30,
};

const levelEditor = {
	editorVisible: false,
	amount: 1,
	delay: 300,
	duration: 2000,
	showStarLines: false,
};

export default createStore(reducer, { player, levelEditor });
