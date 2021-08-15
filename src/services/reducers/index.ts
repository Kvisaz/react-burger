import { combineReducers } from 'redux';
import { IAppState } from '../../model/IAppState';

const initialState: IAppState = {
	isIngredientsLoaded: false,
	ingredients: [],
	ingredientAmountMap: {},
	selectedParts: [],
	selectedIngredient: undefined,
	sum: 0,
	isOrderWaiting: false,
	isOrderClicked: false,
};

export const rootReducer = combineReducers({});