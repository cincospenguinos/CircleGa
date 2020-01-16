export const setEditorVisible = (visible) => {
	return {
		type: 'SET_EDITOR_VISIBLE',
		visible,
	};
};

export const selectionMade = (item) => {
	return {
		type: 'SELECTION_MADE',
		item,
	}
};

export const updateTweenConfig = (config) => {
	return {
		type: 'UPDATE_TWEEN_CONFIG',
		config,
	}
};