import { IBurgerPart } from './IBurgerPart';

export type BurgerAction =
	| { type: IBurgerActionType.DATA_LOADED, payload: IBurgerPart[] }
	| { type: IBurgerActionType.ORDER_DATA_LOADED, payload: number }
	| { type: IBurgerActionType.INGREDIENT_SELECT_CLICK, payload: IBurgerPart }
	| { type: IBurgerActionType.INGREDIENT_REMOVE_CLICK, payload: { id: string } }
	| { type: IBurgerActionType.ORDER_CLICK }
	| { type: IBurgerActionType.CLOSE_MODAL }


export enum IBurgerActionType {
	DATA_LOADED = 'DATA_LOADED',
	ORDER_DATA_LOADED = 'ORDER_DATA_LOADED',
	INGREDIENT_SELECT_CLICK = 'INGREDIENT_SELECT_CLICK',
	INGREDIENT_REMOVE_CLICK = 'INGREDIENT_REMOVE_CLICK',
	ORDER_CLICK = 'ORDER_CLICK',
	CLOSE_MODAL = 'CLOSE_MODAL'
}