/**
 * bezier.js
 *
 * Manages bezier curve shennanigans.
 */
export class Bezier {
	constructor(input, graphics, opts = {}) {
		this.points = opts.points;
		this.graphics = graphics;
		input.setDraggable(this.points);
		input.on('drag', (_, point, posX, posY) => {
			point.x = posX;
			point.y = posY;
			this.draw();
		});
		this.bezier = new Phaser.Curves.CubicBezier(this.points[0], this.points[1], this.points[2], this.points[3]);
	}

	getTweenPoint(val) {
		return this.bezier.getPoint(val);
	}

	draw() {
		this.graphics.clear();
    this.graphics.lineStyle(4, 0xffffff);
    this.bezier.draw(this.graphics);
    this.graphics.lineStyle(2, 0x00ff00);
    this.graphics.beginPath();
    this.graphics.moveTo(this.points[0].x, this.points[0].y);
    this.graphics.lineTo(this.points[1].x, this.points[1].y);
    this.graphics.strokePath();
    this.graphics.lineStyle(2, 0xff0000);
    this.graphics.beginPath();
    this.graphics.moveTo(this.points[2].x, this.points[2].y);
    this.graphics.lineTo(this.points[3].x, this.points[3].y);
    this.graphics.strokePath();
	}
}