export default function (state = {}, action) {
	switch(action.type) {
		case 'SET_ACCELERATION':
			const acceleration = action.acceleration;

			return {
				...state,
				acceleration,
			};
		case 'SET_MAX_VELOCITY':
			const maxVelocity = action.maxVelocity;

			return {
				...state,
				maxVelocity,
			};
		case 'SET_BULLET_VELOCITY':
			const bulletVelocity = action.bulletVelocity;

			return {
				...state,
				bulletVelocity,
			};
		case 'SET_BULLET_COOLDOWN':
			const bulletCooldown = action.bulletCooldown;

			return {
				...state,
				bulletCooldown,
			};
		case 'SET_MAX_BULLETS':
			const maxBullets = action.maxBullets;

			return {
				...state,
				maxBullets,
			}
		default:
			return state;
	}
}
