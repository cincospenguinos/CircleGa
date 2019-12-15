export class Level {
	constructor(path, stars) {
		this.path = path;
		this.stars = stars;
	}

	toJson() {
		const enemies = this.path.map((p) => { 
			return { duration: p.duration, amount: p.amount, points: p.bezier.getPoints() };
		});
		const stars = this.stars;

		return JSON.stringify({
			stars,
			enemies,
		});
	}

	static fromJson(json) {
		/*
		{
		  "stars": [{ "x": 100, "y": 200, "key": "redStar" }],
		  "enemies": [{
		    "duration": 1000,
		    "amount": 3,
		    "delay": 300,
		    "points": [{}, {}, {}, {}],
		  }]
		}
		*/
	}
}
