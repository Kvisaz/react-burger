export interface IBurgerAction {
	type: IBurgerActionType,
	payload?: any
}

export enum IBurgerActionType {
	SELECT_ITEM = 'SELECT_ITEM',
	ORDER_CLICK = 'ORDER_CLICK',
	INGREDIENT_CLICK = 'INGREDIENT_CLICK',
	CLOSE_MODAL = 'CLOSE_MODAL',
	DATA_LOADED = 'DATA_LOADED',
	ORDER_DATA_LOADED = 'ORDER_DATA_LOADED'
}