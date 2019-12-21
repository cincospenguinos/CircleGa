const levelDataHtml = `
	<style>
		* {
			font-family: courier;
		}

		#level-data-container {
			width: 500px;
			height: 500px;
			background-color: white;
			padding: 8px;
			border-radius: 4px;
			overflow-y: scroll;
		}

		.data-item {
			display: flex;
			padding: 4px;
		}
	</style>

	<div id="level-data-container">
		<div class="data-item">
			<p id="data-presentation"></p>
		</div>
		<div class="data-item">
			<button id="close-data">Close</button>
		</div>
	</div>
`;

export class LevelDataView {
	constructor(domNode) {
		this.node = domNode;
		this._createNode();
	}

	show(jsonString) {
		this.node.getChildByID('data-presentation').innerHTML = jsonString;
		this.node.visible = true;
	}

	_createNode() {
		this.node.createFromHTML(levelDataHtml);
		this.node.getChildByID('close-data').addEventListener('click', () => {
			this.node.visible = false;
		});
		this.node.visible = false;
	}
}
