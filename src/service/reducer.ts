import { IAppState } from '../model/IAppState';
import { BurgerAction, IBurgerActionType } from '../model/IBurgerAction';
import { IBurgerPart } from '../model/IBurgerPart';
import { IConstructorElementData } from '../model/IConstructorElementData';

export function reducer(state: IAppState, action: BurgerAction): IAppState {
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
		case IBurgerActionType.INGREDIENT_SELECT_CLICK:
			return onSelectAction(action, state);
		case IBurgerActionType.INGREDIENT_REMOVE_CLICK:
			return onRemoveAction(action, state);
		default:
			console.warn(`unknown action`, action);
			throw new Error(`reducer: unknown action`);

	}
}

function onSelectAction(action: { type: IBurgerActionType.INGREDIENT_SELECT_CLICK, payload: IBurgerPart }, state: IAppState): IAppState {
	const selectedIngredient = action.payload as IBurgerPart;
	const isBun = selectedIngredient.type === 'bun';
	const constructorItem = mapBurgerItem(selectedIngredient);

	const selectedBun = isBun ? constructorItem : state.selectedBun;
	const selectedParts = isBun
		? state.selectedParts
		: [...state.selectedParts.filter(p => p._id !== constructorItem._id), constructorItem];

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
}

function onRemoveAction(action: { type: IBurgerActionType.INGREDIENT_REMOVE_CLICK, payload: { id: string } }, state: IAppState): IAppState {
	const { id } = action.payload;
	const selectedParts = [...state.selectedParts.filter(p => p._id !== id)];

	const { selectedBun } = state;

	const bunSum = selectedBun == undefined ? 0 : selectedBun.price * 2;
	const sum = bunSum + selectedParts.reduce((acc, next) => acc + next.price, 0);
	return {
		...state,
		selectedParts,
		sum,
	};
}


function mapBurgerItem(data: IBurgerPart): IConstructorElementData {
	return {
		_id: data._id, price: data.price, text: data.name, thumbnail: data.image,
	};
}