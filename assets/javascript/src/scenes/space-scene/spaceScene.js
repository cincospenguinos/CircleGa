import * as CONST from '../../const/index.js';

export class SpaceScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SpaceScene' });
	}

	preload() {}

	create() {
		console.log(CONST.default);
	}

	update() {}
}