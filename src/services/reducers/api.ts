import { IAppState } from '../../model/IAppState';
import { InitialAppState } from '../initialAppState';
import { BurgerAction } from '../../model/IBurgerAction';

export function apiReducer(state: IAppState = InitialAppState, action: BurgerAction): IAppState {
	switch (action.type) {
		case 'DATA_REQUEST': {
			return {
				...state,
				isIngredientsRequest: true,
			};
		}
		case 'DATA_LOADED': {
			return {
				...state,
				ingredients: action.payload,
				isIngredientsLoaded: true,
				isIngredientsRequest: false,
			};
		}
		case 'DATA_FAILED' : {
			return {
				...state,
				isIngredientsRequest: false,
				isIngredientsLoaded: false,
				isIngredientsFailed: true,
			};
		}
		default : {
			return {
				...state,
			};
		}
	}
}