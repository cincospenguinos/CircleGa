import { Constants } from '../../../const/index.js';
import { GameState } from '../../../model/gameState.js';

export class Tutorial {
	constructor(scene) {
		this.scene = scene;
		this.complete = GameState.getInstance().hasFinishedTutorial();
		this.tasks = {
			movement: {
				text: 'Use left and right arrow keys to move (A & D for second player)',
				key: 'movement',
			},
			slowing: {
				text: 'Use down arrow key (S) to slow down',
				key: 'slowing',
			},
			firing: {
				text: 'Use up arrow key (W) to fire',
				key: 'firing',
			},
			noEscape: {
				text: "Don't let them escape",
				key: 'noEscape',
			},
		}

		this.currentTask = undefined;
	}

	update() {
		if (!this.complete && !this.currentTask) {
			const key = Object.keys(this.tasks)[0];
			const currentTask = this.tasks[key];
			this._showTask(currentTask);

			this.taskShown = true;
		}
	}

	completeTask(key) {
		delete this.tasks[key];

		this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				if (this.currentTask && this.currentTask.key === key) {
					this.currentTask.string.destroy();
					this.currentTask = undefined;
				}	
			},
			callbackScope: this,
			loop: false,
		});

		if (Object.keys(this.tasks) === 0 && !this.complete) {
			this._tutorialCompleted();
		}
	}

	isComplete() {
		return this.complete;
	}

	_showTask(task) {
		const centerOfScreen = Constants.coordinates.centerOfScreen;
		const string = this.scene.add.text(centerOfScreen.x, centerOfScreen.y, task.text);
		string.x = (Constants.dimensions.screen.width - string.width) / 2;

		this.currentTask = {
			key: task.key,
			string,
		};

		if (task.key === 'noEscape') {
			this.scene.time.addEvent({
				delay: 2500,
				callback: () => {
					this._tutorialCompleted();
					this.completeTask('noEscape');
				},
				callbackScope: this,
				loop: false,
			});
		}
	}

	_tutorialCompleted() {
		this.complete = true;
		GameState.getInstance().setTutorialFinished(this.complete);
	}
}
