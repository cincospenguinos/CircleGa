/**
 * Sub task management
 */
export class TutorialTaskChecklist {
	constructor(playerCount) {
		this.subTasks = {
			playerOneHasMoved: false,
			playerTwoHasMoved: false || playerCount === 1,
			playerOneHasSlowed: false,
			playerTwoHasSlowed: false || playerCount === 1,
			lastThing: false,
		};

		this.tasks = {
			movement: ['playerOneHasMoved', 'playerTwoHasMoved'],
			slowDown: ['playerOneHasSlowed', 'playerTwoHasSlowed'],
			lastThing: ['lastThing'],
		};
	}

	updateSubTask(key, value) {
		this.subTasks[key] = value;
	}

	isTaskComplete(taskKey) {
		let isComplete = true;

		this.tasks[taskKey].forEach((subTask) => {
			if (!this.subTasks[subTask]) {
				isComplete = false;
				return;
			}
		});

		return isComplete;
	}
}