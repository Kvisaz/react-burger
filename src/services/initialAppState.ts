import { IAppState } from '../model/IAppState';

export const InitialAppState: IAppState = {
	sum: 0,
	isIngredientsRequest: false,
	isIngredientsFailed: false,
	isIngredientsLoaded: false,
	ingredient: [],
	ingredientAmountMap: {},
	selectedBun: undefined,
	selectedParts: [],
	orderId: 2,
	isOrderRequest: false,
	isOrderFailed: false,
	isOrderSuccess: false,
	currentTabIndex: 0,
	tabs: [
		{
			name: 'Булки',
		},
		{
			name: 'Соусы',
		},
		{
			name: 'Начинки',
		},
	],
};