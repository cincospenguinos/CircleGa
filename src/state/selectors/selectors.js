export const isEditorVisible = (state) => {
	return state.editorVisible;
};

export const getSelectedItem = (state) => {
	return state.selectedItem;
};

export const getTweenConfig = (state) => {
	const { amount, duration, delay } = state;
	return { amount, duration, delay };
};

export const showStarLines = (state) => {
	return state.showStarLines;
};
