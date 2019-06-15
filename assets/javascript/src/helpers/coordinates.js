/**
 * Helpers for managing coordinates. We will be doing all of our calculations and things in polar coordinates,
 * setting an angular velocity according to key presses. We will need to convert back to cartesian on draw,
 * meaning we have to calculate this shit.
 */
import { COORDINATES } from '../const/coordinates.js';

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

	// debugger;

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
	if (coordinates.type === 'game') {
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