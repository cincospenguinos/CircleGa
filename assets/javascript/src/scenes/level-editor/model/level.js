import { Bezier } from './bezier.js';

export class Level {
	constructor(scene, lines, stars) {
		this.lines = lines;
		this.stars = stars;
		this.scene = scene;
	}

	toJson() {
		// TODO: Delay needs to be included
		const enemies = this.lines.map((p) => {
			const points = p.paths.map(b => b.getPoints());
			return { duration: p.duration, amount: p.amount, points, };
		});

		const stars = Object.keys(this.stars).map((starKey) => {
			const starSet = this.stars[starKey];
			return starSet.map((star) => {
				return { color: starKey, x: star.x, y: star.y };
			});
		}).flat();

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

			return {
				duration,
				amount,
				bezier: new Bezier(scene, points),
			};
		});

		return new Level(scene, path, stars);
	}
}
