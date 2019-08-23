/**
 * We'll represent a tutorial as a list of things that need to be shown to the player. This
 * object will cycle through them, and we can update things as needed.
 */
import { TutorialTaskChecklist } from './tutorialTaskChecklist.js';

export class Tutorial {
	static TASK_LIST = [
		{
			key: 'movement',
			singlePlayerText: 'Use left and right arrows to move',
			twoPlayerText: 'Use left and right arrows to move (A and D if you are blue)',
			timeToShow: 3000,
		},
		{
			key: 'slowDown',
			singlePlayerText: 'Press down arrow key to slow down',
			twoPlayerText: 'Press down arrow key to slow down (S if you are blue)',
			timeToShow: 3000,
		},
		{
			key: 'lastThing',
			singlePlayerText: "Don't let them escape",
			twoPlayerText: "Don't let them escape",
			timeToShow: 2500,
		}
	];

	constructor(opts) {
		this.playerCount = opts.playerCount;
		this.currentTaskIdx = 0;
		this.isTaskComplete = false;
		this.isTaskShown = false;
		this.subtasks = new TutorialTaskChecklist(opts.playerCount);
	}

	getCurrentTask() {
		if (this.hasFinished()) {
			return null;
		}

		const task = Object.assign({ complete: this.isTaskComplete }, Tutorial.TASK_LIST[this.currentTaskIdx]);

		task.text = this.playerCount === 1 ? task.singlePlayerText : task.twoPlayerText;
		delete task.singlePlayerText;
		delete task.twoPlayerText;

		return task;
	}

	updateSubTask(key, value) {
		this.subtasks.updateSubTask(key, value);
	}

	taskShown() {
		return this.isTaskShown;
	}

	showTask() {
		this.isTaskShown = true;
	}

	completeTask(key) {
		if (!this.hasFinished()) {
			if (this.getCurrentTask().key === key) {
				this.isTaskComplete = true;
			}
		}
	}

	currentTaskComplete() {
		return this.subtasks.isTaskComplete(this.getCurrentTask().key);
	}

	nextTask() {
		this.currentTaskIdx += 1;
		this.isTaskComplete = false;
		this.isTaskShown = false;
	}

	hasFinished() {
		return this.currentTaskIdx >= Tutorial.TASK_LIST.length;
	}

	static getTaskList() {
		return Tutorial.TASK_LIST.map(t => t.key);
	}
}