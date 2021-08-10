import { IAppState } from '../model/IAppState';
import { BurgerAction, IBurgerActionType, IRemovePayLoad } from '../model/IBurgerAction';
import { IBurgerPart } from '../model/IBurgerPart';
import { IConstructorElementData } from '../model/IConstructorElementData';

export function reducer(state: IAppState, action: BurgerAction): IAppState {
	switch (action.type) {
		case IBurgerActionType.DATA_LOADED:
			return {
				...state,
				ingredients: action.payload.map(i => ({
					...i,
					amount: 0,
				})),
				loaded: true,
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
				isOrderClicked: true,
			};
		case IBurgerActionType.ORDER_WAITING:
			return {
				...state,
				isOrderClicked: false,
				isOrderWaiting: true,
			};
		case IBurgerActionType.ORDER_SUCCESS:
			return {
				...state,
				isOrderClicked: false,
				isOrderWaiting: false,
				orderId: action.payload.orderId,
				orderName: action.payload.name,
				isModalOrderOpen: true,
			};
		case IBurgerActionType.ORDER_ERROR:
			return {
				...state,
				isOrderClicked: false,
				isOrderWaiting: false,
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
		: [...state.selectedParts, constructorItem];

	let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
	if (selectedBun) sum += selectedBun.price * 2;

	const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

	return {
		...state,
		ingredientAmountMap,
		isModalIngredientOpen: true,
		selectedIngredient,
		selectedBun,
		selectedParts,
		sum,
	};
}

function onRemoveAction(
	action: { type: IBurgerActionType.INGREDIENT_REMOVE_CLICK, payload: IRemovePayLoad },
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
	return {
		ingredientId: data._id, price: data.price, text: data.name, thumbnail: data.image,
		selectedId: data._id + Date.now(),
	};
}