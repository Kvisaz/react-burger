import { combineReducers } from 'redux';
import { mainReducer } from './main';
import { tabsReducer } from './tabs';

export const rootReducer = combineReducers({
	main: mainReducer,
	tabs: tabsReducer,
});