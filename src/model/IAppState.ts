import { IBurgerPart } from './IBurgerPart';
import { IConstructorElementData } from './IConstructorElementData';

export interface IAppState {
	loaded: boolean;
	ingredients: IBurgerPart[];
	ingredientAmountMap: Record<string, number>;

	sum: number;
	selectedBun?: IConstructorElementData;
	selectedParts: IConstructorElementData[];

	selectedIngredient?: IBurgerPart;
	isModalIngredientOpen?: boolean;
	orderId?: number;
	isModalOrderOpen?: boolean;
}