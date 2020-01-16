export const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'SET_EDITOR_VISIBLE':
			return {
				...state,
				editorVisible: action.visible,
			};
		default:
			return state;
	}
};
