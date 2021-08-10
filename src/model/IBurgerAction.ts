export interface IBurgerAction {
	type: IBurgerActionType,
	payload: any
}

export enum IBurgerActionType {
	SELECT_ITEM = 'selectItem',
}