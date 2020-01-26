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
		case 'RESET_LIFE_TOTAL': {
			const lifeTotal = 3;

			return {
				...state,
				lifeTotal,
			};
		}
		case 'PLAYER_DIED': {
			const lifeTotal = state.lifeTotal - 1;

			return {
				...state,
				lifeTotal,
			};
		}
		case 'NEXT_LEVEL':
			const currentLevel = state.currentLevel + 1;

			return {
				...state,
				currentLevel,
			}
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
