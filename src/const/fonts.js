const common = {
	backgroundColor: null,
	color: '#FFFFFF',
	stroke: '#FFFFFF',
	align: 'left',
}

const diagetic = {
	...common,
	fontFamily: 'Courier',
	fontSize: '16px',
};

const nonDiagetic = {
	...common,
	fontFamily: 'Arial',
	fontSize: '24px',
}

export const FONTS = {
	communicationScene: {
		...diagetic,
	},
	spaceSceneTransmission: {
		...diagetic,
	},
	spaceSceneNote: {
		...nonDiagetic,
		fontSize: '16px',
	},
	textReference: {
		...nonDiagetic,
	},
	textSource: {
		...nonDiagetic,
		font: 'italic 24px Arial',
	},
	textAuthor: {
		...nonDiagetic,
	}
};
