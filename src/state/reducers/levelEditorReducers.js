export const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_EDITOR_VISIBLE':
			return {
				...state,
				editorVisible: action.visible,
			};
		case 'SELECTION_MADE':
			return {
				...state,
				selectedItem: action.item,
			};
		case 'UPDATE_TWEEN_CONFIG':
			return {
				...state,
				...action.config,
			};
		default:
			return state;
	}
};
