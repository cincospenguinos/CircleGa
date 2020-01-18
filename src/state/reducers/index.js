import { combineReducers } from 'redux';
import player from './playerReducer.js';
import levelEditor from './levelEditorReducer.js';

export default combineReducers({ player, levelEditor });
