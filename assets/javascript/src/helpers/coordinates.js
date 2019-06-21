/**
 * Helpers for managing coordinates. We will be doing all of our calculations and things in polar coordinates,
 * setting an angular velocity according to key presses. We will need to convert back to cartesian on draw,
 * meaning we have to calculate this shit.
 */
import { COORDINATES } from '../const/coordinates.js';
import { DIMENSIONS } from '../const/gameConfig.js';

export const radius = COORDINATES.centerOfScreen.y - COORDINATES.topOfRing.y;

export const toPolar = (coordinates) => {
	if (coordinates.type === 'polar') {
		return coordinates;
	}

	if (coordinates.type === 'game') {
		return {
			...toPolar(toCartesian(coordinates)),
			type: 'polar',
		}
	}

	// TODO: we may need to set the radius dynamically
	return {
		radius,
		theta: Math.atan2(coordinates.y, coordinates.x),
		type: 'polar',
	}
}

export const toCartesian = (coordinates) => {
	if (coordinates.type === 'cartesian') {
		return coordinates;
	}

	if (coordinates.type === 'game') {
		return {
			x: coordinates.x - COORDINATES.centerOfScreen.x,
			y: coordinates.y - COORDINATES.centerOfScreen.y,
		}
	}

	return {
		x: radius * Math.cos(coordinates.theta),
		y: radius * Math.sin(coordinates.theta),
		type: 'cartesian',
	}
}

export const toGame = (coordinates) => {
	if (coordinates.type === 'game' || !coordinates.type) {
		return coordinates;
	}

	if (coordinates.type === 'polar') {
		return {
			...toGame(toCartesian(coordinates)),
			type: 'game',
		}
	}

	return {
		x: coordinates.x + COORDINATES.centerOfScreen.x,
		y: coordinates.y + COORDINATES.centerOfScreen.y,
	}
}

export const distanceBetween = (pt1, pt2) => {
	return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
}

export const parameterizedDistance = (pt1, pt2) => {
	const point1 = toGame(pt1);
	const point2 = toGame(pt2);

	return { 
		x: point2.x - point1.x,
		y: point2.y - point1.y,
		type: 'distance',
	}
}

export const pointsEqual = (pt1, pt2) => {
	const point1 = toGame(pt1);
	const point2 = toGame(pt2);

	return point1.x === point2.x && point1.y === point2.y;
};

export const isOutOfBounds = (point) => {
	const pt = toGame(point);
	const { width, height } = DIMENSIONS.screen;

	return pt.x < 0 || pt.y < 0 || pt.x > width || pt.y > height;
}