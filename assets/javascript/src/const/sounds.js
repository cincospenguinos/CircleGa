const soundsDir = 'assets/sounds';

export const SOUNDS = {
	mainMenu: {
		location: `${soundsDir}/mainMenu.mp3`,
		config: {
			loop: true,
		},
		meta: {
			author: 'Michael Brigida and Students',
			license: 'CC Attribution 3.0 Unported',
			url: 'https://opengameart.org/content/13-ambient-machine-sounds',
			notes: 'Cut and distorted to fit in main menu track. Thank you, Michael and students!',
		},
	},
	theMachine1: {
		location: `${soundsDir}/theMachine1.mp3`,
		config: {
			loop: false,
		},
		meta: {
			author: 'Andre LaFleur',
			notes: 'Written with Muse Score, performed through Ableton',
		},
	},
	theMachine2: {
		location: `${soundsDir}/theMachine2.mp3`,
		config: {
			loop: false,
		},
		meta: {
			author: 'Andre LaFleur',
			notes: 'Written with Muse Score, performed through Ableton',
		},
	},
	theMachine3: {
		location: `${soundsDir}/theMachine3.mp3`,
		config: {
			loop: false,
		},
		meta: {
			author: 'Andre LaFleur',
			notes: 'Written with Muse Score, performed through Ableton',
		},
	},
	switchOptions: {
		location: `${soundsDir}/switchOptions.mp3`,
		config: {
			loop: false,
			volume: 0.1,
		},
		meta: {
			author: 'pauliuw',
			license: 'Public Domain CC0',
			url: 'https://opengameart.org/content/gun-reload-lock-or-click-sound',
			notes: 'Used to as the toggle sound in the main menu. Thank you, pauliuw!',
		},
	},
	acceptOption: {
		location: `${soundsDir}/selectOption.mp3`,
		config: {
			loop: false,
			volume: 0.1,
		},
		meta: {
			author: 'Arthur',
			license: 'Attribution-ShareAlike 3.0 Unported',
			url: 'https://opengameart.org/content/sci-fi-shwop-1',
			notes: 'Thanks, Arthur! See https://creativecommons.org/licenses/by-sa/3.0/legalcode',
		},
	}
};
