import { IAppState } from '../model/IAppState';
import { IBurgerAction, IBurgerActionType } from '../model/IBurgerAction';

export function reducer(state: IAppState, action: IBurgerAction) {
	switch (action.type) {
		case IBurgerActionType.SELECT_ITEM:
			return { ...state, selectedIngredient: action.payload };
		default:
			throw new Error(`reducer: unknown action ${action.type}`);

	}
}