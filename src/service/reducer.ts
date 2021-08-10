import { IAppState } from '../model/IAppState';
import { IBurgerAction, IBurgerActionType } from '../model/IBurgerAction';
import { IBurgerPart } from '../model/IBurgerPart';
import { IConstructorElementData } from '../model/IConstructorElementData';

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
			const selectedIngredient = action.payload as IBurgerPart;
			const isBun = selectedIngredient.type === 'bun';
			const constructorItem = mapBurgerItem(selectedIngredient);

			const selectedBun = isBun ? constructorItem : state.selectedBun;
			const selectedParts = isBun ? state.selectedParts : [...state.selectedParts, constructorItem];

			let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
			if (selectedBun) sum += selectedBun.price * 2;

			return {
				...state,
				isModalIngredientOpen: true,
				selectedIngredient,
				selectedBun,
				selectedParts,
				sum,
			};
		case IBurgerActionType.SELECT_ITEM:
			return { ...state, selectedIngredient: action.payload };
		default:
			throw new Error(`reducer: unknown action ${action.type}`);

	}
}


function mapBurgerItem(data: IBurgerPart): IConstructorElementData {
	return {
		_id: data._id, price: data.price, text: data.name, thumbnail: data.image,
	};
}