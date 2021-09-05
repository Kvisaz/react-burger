import {IBurgerPart} from './IBurgerPart';
import {IConstructorElementData} from './IConstructorElementData';
import {IApiOrderResult} from '../services/Api';

export interface IAppState {
	isIngredientsRequest: boolean;
	isIngredientsLoaded: boolean;
	isIngredientsFailed: boolean;
	ingredients: IBurgerPart[];
	ingredientAmountMap: Record<string, number>;

	sum: number;
	selectedBun?: IConstructorElementData;
	selectedParts: IConstructorElementData[];

	selectedIngredient?: IBurgerPart;
	orders: IApiOrderResult[];

	isOrderRequest: boolean;
	isOrderSuccess: boolean;
	isOrderFailed: boolean;

	currentTabIndex: number;
	tabs: ITab[];
}


interface ITab {
	name: string;
}