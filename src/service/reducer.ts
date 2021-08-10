import { IAppState } from '../model/IAppState';
import { IBurgerAction, IBurgerActionType } from '../model/IBurgerAction';

export function reducer(state: IAppState, action: IBurgerAction): IAppState {
	switch (action.type) {
		case IBurgerActionType.DATA_LOADED:
			return {
				...state,
				ingredients: action.payload,
				loaded: true,
			};
		case IBurgerActionType.ORDER_DATA_LOADED:
			return {
				...state,
				orderId: action.payload,
			};
		case IBurgerActionType.CLOSE_MODAL:
			return {
				...state,
				isModalIngredientOpen: false,
				isModalOrderOpen: false,
			};
		case IBurgerActionType.ORDER_CLICK:
			return {
				...state,
				isModalOrderOpen: true,
			};
		case IBurgerActionType.INGREDIENT_CLICK:
			return {
				...state,
				isModalIngredientOpen: true,
				selectedIngredient: action.payload,
			};
		case IBurgerActionType.SELECT_ITEM:
			return { ...state, selectedIngredient: action.payload };
		default:
			throw new Error(`reducer: unknown action ${action.type}`);

	}
}