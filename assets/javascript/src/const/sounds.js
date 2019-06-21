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
	switchOptions: {
		location: `${soundsDir}/`,
		config: {
			loop: false,
		},
		meta: {
			author: 'pauliuw',
			license: 'n/a',
			url: 'https://opengameart.org/content/gun-reload-lock-or-click-sound',
			notes: '',
		},
	},
	otherSwitchOptions: {
		location: `${soundsDir}/`,
		config: {
			loop: false,
		}
		meta: {
			author: 'Arthur',
			license: 'Attribution-ShareAlike 3.0 Unported',
			url: 'https://opengameart.org/content/sci-fi-shwop-1',
			notes: 'Do not forget to include a link to the license',
		},
	}
};
