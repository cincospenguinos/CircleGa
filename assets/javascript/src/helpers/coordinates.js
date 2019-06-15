/**
 * Helpers for managing coordinates. We will be doing all of our calculations and things in polar coordinates,
 * setting an angular velocity according to key presses. We will need to convert back to cartesian on draw,
 * meaning we have to calculate this shit.
 */

export const toPolar = (cartesian) => {
	return {
		theta: 0,
		radius: 0,
	}
}

export const toCartesian = (polar) => {

}