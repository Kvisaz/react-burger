import { IAppState } from '../../model/IAppState';
import { BurgerAction, IBurgerActionType, IRemovePayLoad } from '../actions';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { InitialAppState } from '../initialAppState';
import { nanoid } from 'nanoid';


export function mainReducer(state: IAppState = InitialAppState, action: BurgerAction): IAppState {
	switch (action.type) {
		case IBurgerActionType.DATA_REQUEST: {
			return {
				...state,
				isIngredientsRequest: true,
			};
		}
		case IBurgerActionType.DATA_FAILED : {
			return {
				...state,
				isIngredientsRequest: false,
				isIngredientsLoaded: false,
				isIngredientsFailed: true,
			};
		}
		case IBurgerActionType.DATA_LOADED:
			return {
				...state,
				ingredients: action.ingredients.map(i => ({
					...i,
					amount: 0,
				})),
				isIngredientsLoaded: true,
			};
		case IBurgerActionType.CLOSE_MODAL:
			return {
				...state,
				isModalIngredientOpen: false,
				isModalOrderOpen: false,
			};
		case IBurgerActionType.ORDER_REQUEST:
			return {
				...state,
				isOrderRequest: true,
			};
		case IBurgerActionType.ORDER_SUCCESS:
			return {
				...state,
				isOrderRequest: false,
				isOrderSuccess: true,
				orderId: action.payload.orderId,
				orderName: action.payload.name,
				isModalOrderOpen: true,
				ingredientAmountMap: {},
				selectedParts: [],
				selectedBun: undefined,
			};
		case IBurgerActionType.ORDER_FAILED:
			return {
				...state,
				isOrderRequest: false,
				isOrderFailed: true,
			};
		case IBurgerActionType.INGREDIENT_ADD_TO_BASKET:
			return onSelectAction(action, state);
		case IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET:
			return onRemoveAction(action, state);
		case IBurgerActionType.INGREDIENT_SHOW:
			return {
				...state,
				isModalIngredientOpen: true,
				selectedIngredient: action.ingredient,
			};
		case IBurgerActionType.TAB_SELECT:
			return {
				...state,
				currentTabIndex: action.index,
			};
		case IBurgerActionType.BASKET_ITEM_SWAP:
			return onBasketItemSwap(action, state);
		default:
			console.warn(`unknown action`, action);
			return {
				...state,
			};

	}
}

function onSelectAction(action: { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }, state: IAppState): IAppState {
	const selectedIngredient = action.ingredient;
	const isBun = selectedIngredient.type === 'bun';
	const constructorItem = mapBurgerItem(selectedIngredient);

	const selectedBun = isBun ? constructorItem : state.selectedBun;
	const selectedParts = isBun
		? state.selectedParts
		: [...state.selectedParts, constructorItem];

	let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
	if (selectedBun) sum += selectedBun.price * 2;

	const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

	return {
		...state,
		ingredientAmountMap,
		selectedBun,
		selectedParts,
		sum,
	};
}

function onRemoveAction(
	action: { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad },
	state: IAppState):
	IAppState {

	const { selectedId } = action.payload;
	const selectedParts = [...state.selectedParts.filter(p => p.selectedId !== selectedId)];
	const { selectedBun } = state;
	const bunSum = selectedBun === undefined ? 0 : selectedBun.price * 2;
	const sum = bunSum + selectedParts.reduce((acc, next) => acc + next.price, 0);

	const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

	return {
		...state,
		selectedParts,
		ingredientAmountMap,
		sum,
	};
}

function updateAmounts(selectedParts: IConstructorElementData[], bun?: IConstructorElementData): Record<string, number> {
	const amountMap: Record<string, number> = {};
	if (bun) {
		const ingredientId = bun.ingredientId;
		amountMap[ingredientId] = 2;
	}
	selectedParts.forEach(({ ingredientId }) => {
		if (amountMap[ingredientId] === undefined) amountMap[ingredientId] = 0;
		amountMap[ingredientId]++;
	});
	return amountMap;
}


function mapBurgerItem(data: IBurgerPart): IConstructorElementData {
	return setUniqueSelectorId({
		ingredientId: data._id, price: data.price, text: data.name, thumbnail: data.image,
		selectedId: data._id,
	});
}

function setUniqueSelectorId(data: IConstructorElementData): IConstructorElementData {
	return {
		...data,
		selectedId: nanoid(),
	};
}

function onBasketItemSwap(
	action: { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string },
	state: IAppState,
): IAppState {
	const { selectedId1, selectedId2 } = action;
	const { selectedParts } = state;
	const results = selectedParts.slice();
	const item1index = selectedParts.findIndex(item => item.selectedId === selectedId1);
	const item2index = selectedParts.findIndex(item => item.selectedId === selectedId2);
	if (item1index > -1 && item2index > -1) {
		results[item2index] = selectedParts[item1index];
		results[item1index] = selectedParts[item2index];
	} else {
		console.warn(`cannot find ${selectedId1}, ${selectedId2} in `, selectedParts);
	}
	return {
		...state,
		selectedParts: results,
	};
}