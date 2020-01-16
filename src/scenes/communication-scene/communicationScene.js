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
		const { communicationBorder } = Constants.sprites;
		this.load.json(this.communicationKey, `assets/data/communications/${this.communicationKey}`);
		this.load.image(communicationBorder.key, communicationBorder.location);

		const cursors = this.input.keyboard.createCursorKeys();
		const enter = 

		this.keys = this.input.keyboard.addKeys({
			next: 'DOWN',
			previous: 'UP',
			select: 'ENTER',
		});
	}

	create() {
		this.communication = new Communication(this, this.cache.json.get(this.communicationKey));
		this.communication.show();
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.next)) {
			this.communication.next();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.previous)) {
			this.communication.previous();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.select)) {
			this.communication.select();
		}

		if (this.communication.isComplete()) {
			const instance = GameState.getInstance();
			instance.communicationComplete();
			instance.transition(this);
		}
	}
}