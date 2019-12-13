import { Constants } from '../../../const/index.js';
import * as coordinateHelper from '../../../helpers/coordinates.js';

export class Entity extends Phaser.GameObjects﻿.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		
		this.scene = config.scene;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setScale(Constants.dimensions.scale.sprite);
	}
}