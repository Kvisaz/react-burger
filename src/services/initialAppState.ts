import { IAppState } from '../model/IAppState';

export const InitialAppState: IAppState = {
	sum: 0,
	isIngredientsRequest: false,
	isIngredientsFailed: false,
	isIngredientsLoaded: false,
	ingredients: [],
	ingredientAmountMap: {},
	selectedBun: undefined,
	selectedParts: [],
	orderId: 2,
	isOrderWaiting: false,
	isOrderClicked: false,
};