import { createStore } from 'redux';
import reducer from './reducers/index.js';

const initialState = {
	levelEditor: {
		editorVisible: false,
		amount: 1,
		delay: 300,
		duration: 2000,
		showStarLines: false,
	},
	player: {

	},
};

const store = createStore(reducer, initialState);
export default store;