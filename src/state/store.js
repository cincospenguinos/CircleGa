import { createStore } from 'redux';
import { reducer } from './reducers/levelEditorReducers.js';

const initialState = {
	editorVisible: false,
	amount: 1,
	delay: 300,
	duration: 2000,
	showStarLines: false,
};

const store = createStore(reducer, initialState);
export default store;