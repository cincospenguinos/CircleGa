export const isEditorVisible = (state) => {
	return state.levelEditor.editorVisible;
};

export const getSelectedItem = (state) => {
	return state.levelEditor.selectedItem;
};

export const getTweenConfig = (state) => {
	const { amount, duration, delay } = state.levelEditor;
	return { amount, duration, delay };
};

export const showStarLines = (state) => {
	return state.levelEditor.showStarLines;
};
