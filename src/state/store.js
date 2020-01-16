import { createStore } from 'redux';
import { reducer } from './reducers/levelEditorReducers.js';

const initialState = {
	editorShown: false,
};

const store = createStore(reducer, initialState);
export default store;