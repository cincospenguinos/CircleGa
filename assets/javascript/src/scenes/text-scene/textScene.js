import { Constants } from '../../const/index.js';
import { TextExcerpt } from './model/textExcerpt.js';
import { GameState } from '../../model/gameState.js';

export class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.textScene });
	}

	preload() {
		const gameState = GameState.getInstance();
		this.currentTextKey = Constants.textOrder[gameState.getCurrentTextIndex()];
		this.load.json(this.currentTextKey, Constants.texts[this.currentTextKey].location);
		this.load.audio(Constants.keys.sounds.theMachine1, Constants.sounds.theMachine1.location);
	}

	create() {
		const excerpt = new TextExcerpt(this.cache.json.get(this.currentTextKey));
		this._showText(excerpt);
		this.keys = this.input.keyboard.addKeys({
			space: 'SPACE',
			esc: 'ESC',
			enter: 'ENTER',
		});

		this.backgroundMusic = this.sound.add(Constants.keys.sounds.theMachine1, Constants.sounds.theMachine1.config);
		this.backgroundMusic.play();
	}

	update() {
		let moveOn = false;
		Object.keys(this.keys).forEach((k) => {
			const key = this.keys[k];
			if (Phaser.Input.Keyboard.JustDown(key)) {
				moveOn = true;
				return;
			}
		});

		if (moveOn) {
			GameState.getInstance().textShown();
			this.scene.start(Constants.scenes.spaceScene);
			this.backgroundMusic.stop();
			return;
		}
	}

	_showText(excerpt) {
		const { width, height } = Constants.dimensions.screen;
		this.add.text(25, 25, excerpt.getText(), excerpt.getFont());

		const sourceFont = {...excerpt.getFont(), font: 'italic 24px Arial' };
		const source = this.add.text(0, height - 25, excerpt.getSource(), sourceFont);
		source.x = width - source.width;

		const author = this.add.text(0, height - 50,
			`--- ${excerpt.getAuthor() || 'Author Unknown'}`, excerpt.getFont());
		author.x = width - source.width;
	}
}