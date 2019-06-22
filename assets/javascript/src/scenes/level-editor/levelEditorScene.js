import { Constants } from '../../const/index.js';
import { Bezier } from './model/bezier.js';

export class LevelEditorScene extends Phaser.Scene {
	constructor() {
		super({ key: Constants.scenes.levelEditorScene });
	}

	init(data) {}

	preload() {
		const { enemyOne, playAndPause, point } = Constants.sprites;

		this.load.spritesheet(enemyOne.key, enemyOne.location, enemyOne.config);
		this.load.spritesheet(playAndPause.key, playAndPause.location, playAndPause.config);
		this.load.image(point.key, point.location, point.config);
	}

	create() {
		const { centerOfScreen } = Constants.coordinates;
		const colors = ["0x00ff00", "0x008800", "0x880000", "0xff0000"];
		const points = [];
		points.push(this._createPoint(centerOfScreen, colors[0]));

		for (let i = 1; i < 4; i++) {
			const position = { x: 100 * (i + 1), y: 100 * (i + 1) };
			const point = this._createPoint(position, colors[i]);
			points.push(point);
		}

		this.bezier = new Bezier(this.input, this.add.graphics(), { points });
		this.bezier.draw();
    this.movingPoint = this.physics.add.sprite(0, 0, Constants.sprites.enemyOne.key);

    const tweenObject = { val: 0 };
    this.tweens.add({
        targets: tweenObject,
        val: 1,
        duration: 2000,
        yoyo: false,
        repeat: -1,
        ease: "Linear",
        callbackScope: this,
        onUpdate: function(tween, target) {
          const position = this.bezier.getTweenPoint(target.val);
          const angle = Phaser.Math.Angle.Between(this.movingPoint.x, this.movingPoint.y, position.x, position.y) + Math.PI / 2;
          this.movingPoint.x = position.x;
          this.movingPoint.y = position.y;
          this.movingPoint.rotation = angle;
        }
    });
	}

	update() {}

	_createPoint(position, color) {
		const point = this.add.image(position.x, position.y, Constants.sprites.point.key);
		point.setTint(color);
		point.setInteractive();

		return point;
	}
}