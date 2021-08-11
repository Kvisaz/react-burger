import { IBurgerPart } from './IBurgerPart';

export type BurgerAction =
	| { type: IBurgerActionType.DATA_LOADED, payload: IBurgerPart[] }
	| { type: IBurgerActionType.INGREDIENT_SELECT_CLICK, payload: IBurgerPart }
	| { type: IBurgerActionType.INGREDIENT_REMOVE_CLICK, payload: IRemovePayLoad }
	| { type: IBurgerActionType.ORDER_CLICK }
	| { type: IBurgerActionType.ORDER_WAITING }
	| { type: IBurgerActionType.ORDER_SUCCESS, payload: IOrderPayLoad}
	| { type: IBurgerActionType.ORDER_ERROR }
	| { type: IBurgerActionType.CLOSE_MODAL }


export enum IBurgerActionType {
	DATA_LOADED = 'DATA_LOADED',
	INGREDIENT_SELECT_CLICK = 'INGREDIENT_SELECT_CLICK',
	INGREDIENT_REMOVE_CLICK = 'INGREDIENT_REMOVE_CLICK',
	ORDER_CLICK = 'ORDER_CLICK',
	ORDER_WAITING = 'ORDER_WAITING',
	ORDER_SUCCESS = 'ORDER_SUCCESS',
	ORDER_ERROR = 'ORDER_ERROR',
	CLOSE_MODAL = 'CLOSE_MODAL'
}

export interface IOrderPayLoad {
	orderId: number,
	name: string,
}

export interface IRemovePayLoad {
	selectedId: string,
	ingredientId: string
}