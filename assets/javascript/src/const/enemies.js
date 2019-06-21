import { COORDINATES } from './coordinates.js';


const generatePointFrom = (array) => {
	return {
		x: array[0],
		y: array[1],
		type: 'game',
	}
};

const toGamePoints = (arrayOfPoints) => {
	return arrayOfPoints.map((p) => generatePointFrom(p));
};

const { centerOfScreen } = COORDINATES;

export const ENEMY_TYPES = {
	father: {
		opts: {
			type: 'father',
			speed: 8,
			points: toGamePoints([
				[578, 478],
				[624, 467],
				[662, 440],
				[686, 391],
				[691, 327],
				[690, 297],
				[699, 236],
				[723, 205],
				[769, 158],
				[813, 120],
				[847, 73],
				[865, 29],
				[870, 9],
			]),
			terminalPosition: generatePointFrom([870, -10]),
		},
	},
	mother: {},
	child: {},
};
