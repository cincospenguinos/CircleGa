import { Constants } from '../../const/index.js';
import { GameState } from '../../model/gameState.js';
import { Communication } from './model/communication.js';

export class CommunicationScene extends Phaser.Scene {
	init(data) {
		this.communicationKey = data.content;
	}

	constructor() {
		super({ key: Constants.scenes.communicationScene });
	}

	preload() {
		this.load.json(this.communicationKey, `assets/data/communications/${this.communicationKey}`);
		this.load.image(Constants.keys.sprites.communicationBorder, Constants.sprites.communicationBorder.location);
	}

	create() {
		this.communication = new Communication(this, this.cache.json.get(this.communicationKey));
		this.communication.show();
	}

	update() {
		if (this.communication.isComplete()) {

			this.time.addEvent({
				delay: 1000,
				callback: () => {
					const instance = GameState.getInstance();
					instance.communicationComplete();

					const sceneInfo = instance.getSceneInfo();
					this.scene.start(sceneInfo.key, sceneInfo);
				},
				callbackScope: this,
				loop: false,
			});
		}
	}
}