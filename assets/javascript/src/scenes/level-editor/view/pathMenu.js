const html = `
	<style>
		#container {
			width: 200px;
			height: 100px;
			background-color: white;
			padding: 8px;
			border-radius: 4px;
		}

		.item {
			display: inline-flex;
			padding: 4px;
		}

		.input {
			font-size: 12px;
			width: 60px;
		}
	</style>
	<div id="container">
		<div class="item">
			<label for="duration">Duration: <input id="duration" name="duration" type="number" class="input" /></label>
		</div>
		<div class="item">
			<label for="amount">Amount: <input id="amount" name="amount" type="number" class="input" /></label>
		</div>
		<div class="item">
			<label for="delay">Delay: <input id="delay" name="delay" type="number" class="input" /></label>
		</div>
	</div>
`;

export class PathMenu {
	constructor(domNode, opts = {}) {
		this.node = domNode;
		this._createNode(opts);
	}

	toggle() {
		this.node.visible = !this.node.visible;
	}

	getDuration() {
		return this.node.getChildByProperty('id', 'duration').value;
	}

	getAmount() {
		return this.node.getChildByProperty('id', 'amount').value;
	}

	getDelay() {
		return this.node.getChildByProperty('id', 'delay').value;
	}

	_createNode(opts) {
		this.node.createFromHTML(html);
		this.node.getChildByProperty('id', 'duration').value = opts.duration || 2000;
		this.node.getChildByProperty('id', 'amount').value = opts.amount || 1;
		this.node.getChildByProperty('id', 'delay').value = opts.delay || 300;
	}
}