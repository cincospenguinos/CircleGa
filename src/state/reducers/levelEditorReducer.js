export default function(state = {}, action) {
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
		case 'TOGGLE_STAR_LINES':
			const showStarLines = !state.showStarLines;
			return {
				...state,
				showStarLines,
			};
		default:
			return state;
	}
};
