import { IBurgerPart } from './IBurgerPart';
import { IConstructorElementData } from './IConstructorElementData';

export interface IAppState {
	loaded: boolean;
	ingredients: IBurgerPart[];
	sum: number;
	selectedBun?: IConstructorElementData;
	selectedParts: IConstructorElementData[];
}