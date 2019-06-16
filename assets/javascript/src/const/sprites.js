const spriteDir = 'assets/sprites';

export const SPRITES = {
	playerOne: {
		location: `${spriteDir}/Player1.png`,
		config: {
			frameWidth: 57,
			frameHeight: 53,
		},
	},
	playerTwo: {
		location: `${spriteDir}/Player2.png`,
		config: {
			frameWidth: 57,
			frameHeight: 53,
		},
	},
	enemyOne: {
		location: `${spriteDir}/Enemy1.png`,
		config: {
			frameWidth: 46,
			frameHeight: 42,
		},
	},
	gameTrack: {
		location: `${spriteDir}/GameTrack.png`,
		config: {
			frameWidth: 544,
			frameHeight: 544,
		},
	},
	redBullet: {
		location: `${spriteDir}/redBullet.png`,
		config: {
			frameWidth: 12,
			frameHeight: 30,
		},
	},
	blueBullet: {
		location: `${spriteDir}/blueBullet.png`,
		config: {
			frameWidth: 12,
			frameHeight: 30,
		},

	},
	enemyBullet: {
		location: `${spriteDir}/enemyBullet.png`,
		config: {
			frameWidth: 12,
			frameHeight: 12,
		}
	},
	background: {
		location: `${spriteDir}/background.png`,
		config: {
			frameWidth: 1080,
			frameHeight: 920,
		},
	},
	mainMenu: {
		location: `${spriteDir}/MainMenu.png`,
		config: {
			frameWidth: 1080,
			frameHeight: 920,
		}
	},
};