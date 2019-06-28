const html = `
	<div style="width: 200px; height: 100px; background-color: white; padding: 8px; border-radius: 4px;">
		<div style="display: inline-flex;">
			<label for="duration">Duration: <input id="duration" name="duration" type="number" style="font-size: 12px; width: 60px;" /></label>
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

	_createNode(opts) {
		this.node.createFromHTML(html);
		this.node.getChildByProperty('id', 'duration').value = opts.duration || 2000;
	}
}