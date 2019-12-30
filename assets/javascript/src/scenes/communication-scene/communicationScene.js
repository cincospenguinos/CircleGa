import { Constants } from '../../const/index.js';
import { GameState } from '../../model/gameState.js';
import { Communication } from './model/communication.js';

export class CommunicationScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.communicationScene });
	}

	preload() {
		this.communicationKey = 'hello';
		const communicationLocation = Constants.communications[this.communicationKey].location;

		this.load.json(this.communicationKey, communicationLocation);
		this.load.image(Constants.keys.sprites.communicationBorder, Constants.sprites.communicationBorder.location);
	}

	create() {
		const communication = new Communication(this, this.cache.json.get(this.communicationKey));
		communication.show();
	}

	update() {}
}