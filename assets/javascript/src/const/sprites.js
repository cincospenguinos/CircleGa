const spriteDir = 'assets/sprites';

export const SPRITES = {
	playerOne: {
		location: `${spriteDir}/Player1.png`,
		config: {
			frameWidth: 50,
			frameHeight: 43,
		},
	},
	playerTwo: {
		location: `${spriteDir}/Player2.png`,
		config: {
			frameWidth: 50,
			frameHeight: 43,
		},
	},
	enemyOne: {
		location: `${spriteDir}/Enemy1.png`,
		config: {
			frameWidth: 32,
			frameHeight: 32,
		},
	},
	gameTrack: {
		location: `${spriteDir}/GameTrack.png`,
		config: {
			frameWidth: 544,
			frameHeight: 544,
		},
	},
};