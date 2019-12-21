import { Bezier } from './bezier.js';

export class Level {
	constructor(scene, path, stars) {
		this.path = path;
		this.stars = stars;
		this.scene = scene;
	}

	toJson() {
		// TODO: Delay needs to be included
		const enemies = this.path.map((p) => {
			return { duration: p.duration, amount: p.amount, points: p.bezier.getPoints() };
		});
		const stars = this.stars;

		return JSON.stringify({
			stars,
			enemies,
		});
	}

	static fromJson(scene, json) {
		const data = JSON.parse(json);

		const stars = data.stars;
		const path = data.enemies.map((enemyData) => {
			const { duration, amount, points } = enemyData;
			return { duration, amount, bezier: new Bezier(scene, { points }), };
		});

		return new Level(scene, path, stars);
	}
}
