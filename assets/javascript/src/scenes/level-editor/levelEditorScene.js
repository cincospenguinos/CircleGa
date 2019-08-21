import { Constants } from '../../const/index.js';
import { Bezier } from './model/bezier.js';
import { PathMenu } from './view/pathMenu.js';
import { distanceBetween } from '../../helpers/coordinates.js';

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

		this.keys = this.input.keyboard.addKeys({
			toggleMenu: 'M',
			update: 'U',
			commit: 'enter',
			setFiringPoint: 'F',
		});
	}

	create() {
		const menuNode = this.add.dom(200, 200, 'div', '');
		this.menu = new PathMenu(menuNode);

		const { centerOfScreen } = Constants.coordinates;
		const colors = ["0x00ff00", "0x008800", "0x880000", "0xff0000"];
		const points = [];
		points.push(this._createPoint(centerOfScreen, colors[0]));

		for (let i = 1; i < 4; i++) {
			const position = { x: 100 * (i + 1), y: 100 * (i + 1) };
			const point = this._createPoint(position, colors[i]);
			points.push(point);
		}

		this.firingPoint = null;

		this.input.on('pointerdown', (ptr) => {
			if (this.keys.setFiringPoint.isDown) {
				this.firingPoint = { x: ptr.x, y: ptr.y, type: 'game' };
				console.log(`(${ptr.x}, ${ptr.y})`);
			}
		});

		this.bezier = new Bezier(this.input, this.add.graphics(), { points });
		this.bezier.draw();

    this.run();
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.toggleMenu)) {
			this.menu.toggle();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.update)) {
			this.run();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keys.commit)) {
			const json = JSON.stringify({
				amount: parseInt(this.menu.getAmount()),
				duration: parseInt(this.menu.getDuration()),
				delay: parseInt(this.menu.getDelay()),
				points: this.bezier.getPoints(),
			});

			console.log(json);
		}
	}

	run() {
		if (this.sprites) {
			this.sprites.forEach(s => s.destroy());
			this.tweens.killAll();
		}

		this.sprites = [];
		const amount = this.menu.getAmount();
		let scene = this;

		for (let i = 0; i < amount; i++) {
			const sprite = this.physics.add.sprite(-50, -50, Constants.sprites.enemyOne.key);
			this.tweens.add({
				targets: { val: 0 },
        val: 1,
        duration: this.menu.getDuration(),
        delay: i * this.menu.getDelay(),
        yoyo: false,
        repeat: -1,
        ease: "Linear",
        callbackScope: this,
        onUpdate: function(tween, target) {
          const position = this.bezier.getTweenPoint(target.val);

          if (scene.firingPoint && distanceBetween({ x: position.x, y: position.y, type: game }, scene.firingPoint) <= 5) {
          	console.log('pew!'); // TODO: Fire the bullet here!
          }

          const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, position.x, position.y) + Math.PI / 2;
          sprite.x = position.x;
          sprite.y = position.y;
          sprite.rotation = angle;
        }
			});
			this.sprites.push(sprite);
		}
	}

	_createPoint(position, color) {
		const point = this.add.image(position.x, position.y, Constants.sprites.point.key);
		point.setTint(color);
		point.setInteractive();

		return point;
	}
}