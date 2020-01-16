const inputViewHtml = `
	<style>
		#input-view-container {
			width: 250px;
			height: 100px;;
			background-color: white;
			padding: 8px;
			border-radius: 4px;
			overflow-y: scroll;
		}

		.input-item {
			display: flex;
			padding: 4px;
		}
	</style>

	<div id="input-view-container">
		<div class="input-item">
			<span style="color: red;">Red stars COUNTER CLOCKWISE</span>
		</div>
		<div class="input-item">
			<span style="color: blue;">Blue stars CLOCKWISE</span>
		</div>
	</div>
`;

export class InputView {
	constructor(domNode, keyMapping) {
		this.node = domNode;
		this.keyMapping = keyMapping;
		this._createNode();
	}

	toggle() {
		this.node.visible = !this.node.visible;
	}

	_createNode() {
		this.node.createFromHTML(inputViewHtml);
		Object.keys(this.keyMapping).forEach((action) => {
			const key = this.keyMapping[action];

			const parent = document.createElement('div');
			parent.className = 'input-item';

			const child = document.createElement('span');
			child.innerHTML = `${action}: ${key}`;
			
			parent.appendChild(child);
			this.node.getChildByID('input-view-container').appendChild(parent);
		});
		this.node.visible = false;
	}
}