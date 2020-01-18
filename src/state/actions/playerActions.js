export const setMaxVelocity = (maxVelocity) => {
	return {
		type: 'SET_MAX_VELOCITY',
		maxVelocity,
	};
};

export const setBulletVelocity = (bulletVelocity) => {
	return {
		type: 'SET_BULLET_VELOCITY',
		bulletVelocity,
	};
};

export const setAcceleration = (acceleration) => {
	return {
		type: 'SET_ACCELERATION',
		acceleration,
	};
};

export const setAcceleration = (bulletCooldown) => {
	return {
		type: 'SET_BULLET_COOLDOWN',
		bulletCooldown,
	};
};

export const setMaxBullets = (maxBullets) => {
	return {
		type: 'SET_MAX_BULLETS',
		maxBullets,
	};
};
