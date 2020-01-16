/**
 * bezier.js
 *
 * Manages bezier curve shennanigans.
 */
import { Constants } from '../../../const/index.js';

export class Bezier {
	constructor(scene, positions, opts = {}) {
		this.scene = scene;
		this.graphics = this.scene.add.graphics();
		this.showPoints = true;
		this.isEditMode = opts.editMode === undefined ? true : opts.editMode;

		this.points = this._gameObjsFrom(positions);
		this.bezierCurve = new Phaser.Curves.CubicBezier(this.points[0], this.points[1],
			this.points[2], this.points[3]);

		if (this.isEditMode) {
			this.scene.input.setDraggable(this.points);
			this.scene.input.on('drag', () => this.draw());
		}
	}

	getTweenPoint(val) {
		return this.bezierCurve.getPoint(val);
	}

	erase() {
		this.graphics.setVisible(false);
		this.points.forEach(p => p.setVisible(false));
	}

	draw() {
		if (this.isEditMode) {
			this.graphics.clear();
	    this.graphics.lineStyle(4, 0xffffff);
	    this.bezierCurve.draw(this.graphics);

	    if (this.showPoints) {
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
	}

	getPoints() {
		return this.points.map(p => { return { x: p.x, y: p.y } });
	}

	disable() {
		this.points.forEach(p => p.destroy());
		this.showPoints = false;
		this.draw();
	}

	_gameObjsFrom(points) {
		const colors = ['0x00ff00', '0x99ff00', '0xff9900', '0xff0000'];
		const objs = points.map((position, index) => {
			const point = this.scene.add.image(position.x, position.y, Constants.sprites.point.key);
			point.setTint(colors[index]);
			point.setInteractive();
			return point;
		});

		if (!this.isEditMode) {
			objs.forEach(o => o.setVisible(false));
		}

		return objs;
	}
}