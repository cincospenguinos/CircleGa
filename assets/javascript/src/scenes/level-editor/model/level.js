export class Level {
	constructor(path, stars) {
		this.path = path;
		this.stars = stars;
	}

	toJson() {
		const points = this.path.map(bezier => bezier.getPoints());
		const stars = this.stars;

		return JSON.stringify({
			stars,
			enemies: points,
		});
	}

	static fromJson(json) {

	}
}
