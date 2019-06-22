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
		positions: [toGamePoints([
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
			]), toGamePoints([
				[421.5, 589],
				[415.5, 354],
				[664.5, 346],
				[673.5, 582],
				[673.5, 913],
			]), toGamePoints([
				[532.5, 679],
				[349.5, 466],
				[539.5, 284],
				[742.5, 456],
				[541.5, 678],
				[19.5, 668],
			]), toGamePoints([
				[666.5, 331],
				[394.5, 319],
				[676.5, 600],
				[390.5, 613],
				[653.5, 298],
			]), toGamePoints([
				[884.5, 805],
				[880.5, 101],
				[162.5, 118],
				[150.5, 828],
			]),
		],
		opts: {
			type: 'father',
			speed: 5,
			terminalPosition: generatePointFrom([870, -10]),
		},
	},
	mother: {},
	child: {},
};
