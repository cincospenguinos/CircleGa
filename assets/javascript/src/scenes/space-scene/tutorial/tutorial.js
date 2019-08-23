/**
 * We'll represent a tutorial as a list of things that need to be shown to the player. This
 * object will cycle through them, and we can update things as needed.
 */
export class Tutorial {
	static TASK_LIST = [
		{
			key: 'movement',
			singlePlayerText: 'Use left and right arrows to move',
			twoPlayerText: 'Use left and right arrows to move (A and D if you are blue)',
		},
	];

	constructor(opts) {
		this.playerCount = opts.playerCount;
		this.currentTaskIdx = 0;
		this.isTaskComplete = false;
		this.isTaskShown = false;
	}

	getCurrentTask() {
		const task = Object.assign({ complete: this.isTaskComplete }, Tutorial.TASK_LIST[this.currentTaskIdx]);

		task.text = this.playerCount === 1 ? task.singlePlayerText : task.twoPlayerText;
		delete task.singlePlayerText;
		delete task.twoPlayerText;

		return task;
	}

	taskShown() {
		return this.isTaskShown;
	}

	showTask() {
		this.isTaskShown = true;
	}

	completeTask(key) {
		if (this.getCurrentTask().key === key) {
			this.isTaskComplete = true;
		}
	}

	currentTaskComplete() {
		return this.isTaskComplete;
	}

	nextTask() {
		this.currentTaskIdx += 1;
		return this.getCurrentTask();
	}
}