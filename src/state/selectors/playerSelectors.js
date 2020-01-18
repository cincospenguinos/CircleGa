export const getAcceleration = (state) => {
	return state.player.acceleration;
};

export const getMaxVelocity = (state) => {
	return state.player.maxVelocity;
};

export const getBulletVelocity = (state) => {
	return state.player.bulletVelocity;
};

export const getBulletCooldown = (state) => {
	return state.player.bulletCooldown;
};

export const getMaxBullets = (state) => {
	return state.player.maxBullets;
};