import { IBurgerPart } from '../../model/IBurgerPart';
import { IGetState } from '../store';
import { Api } from '../Api';

export type BurgerAction =
	| { type: IBurgerActionType.DATA_REQUEST }
	| { type: IBurgerActionType.DATA_LOADED, ingredients: IBurgerPart[] }
	| { type: IBurgerActionType.DATA_FAILED, message: string }
	| { type: IBurgerActionType.INGREDIENT_SELECT_CLICK, ingredient: IBurgerPart }
	| { type: IBurgerActionType.INGREDIENT_SHOW, ingredient: IBurgerPart }
	| { type: IBurgerActionType.INGREDIENT_REMOVE_CLICK, payload: IRemovePayLoad }
	| { type: IBurgerActionType.ORDER_REQUEST }
	| { type: IBurgerActionType.ORDER_SUCCESS, payload: IOrderPayLoad }
	| { type: IBurgerActionType.ORDER_FAILED }
	| { type: IBurgerActionType.CLOSE_MODAL }
	| { type: IBurgerActionType.TAB_SELECT, index: number }
	| { type: IBurgerActionType.BASKET_ITEM_DRAG, dragIndex: number, hoverIndex: number }

type IBurgerDispatch = (action: BurgerAction) => any;


export enum IBurgerActionType {
	DATA_REQUEST = 'DATA_REQUEST',
	DATA_LOADED = 'DATA_LOADED',
	DATA_FAILED = 'DATA_FAILED',
	INGREDIENT_SELECT_CLICK = 'INGREDIENT_SELECT_CLICK',
	INGREDIENT_SHOW = 'INGREDIENT_SHOW',
	INGREDIENT_REMOVE_CLICK = 'INGREDIENT_REMOVE_CLICK',
	ORDER_REQUEST = 'ORDER_REQUEST',
	ORDER_SUCCESS = 'ORDER_SUCCESS',
	ORDER_FAILED = 'ORDER_FAILED',
	CLOSE_MODAL = 'CLOSE_MODAL',
	TAB_SELECT = 'TAB_SELECT',
	BASKET_ITEM_DRAG = 'BASKET_ITEM_DRAG'
}

export interface IOrderPayLoad {
	orderId: number,
	name: string,
}

export interface IRemovePayLoad {
	selectedId: string,
	ingredientId: string
}

const API_DATA_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDER_END_POINT = 'https://norma.nomoreparties.space/api/orders';
const API = new Api(API_DATA_END_POINT, API_ORDER_END_POINT);

export const fetchIngredientsActionCreator = () => async (dispatch: IBurgerDispatch) => {
	dispatch({ type: IBurgerActionType.DATA_REQUEST });
	API.getBurgerParts()
		.then(({ ingredients }) => dispatch({ type: IBurgerActionType.DATA_LOADED, ingredients }))
		.catch((e: Error | string) => dispatch({ type: IBurgerActionType.DATA_FAILED, message: e.toString() }));
};

export const onOrderClickActionCreator = () => async (dispatch: IBurgerDispatch, getState: IGetState) => {
	dispatch({ type: IBurgerActionType.ORDER_REQUEST });
	const state = getState();

	const selectedBun = state.selectedBun;
	const selectedIds = state.selectedParts.map(i => i.ingredientId);
	if (selectedBun) {
		selectedIds.push(selectedBun.ingredientId);
		selectedIds.push(selectedBun.ingredientId);
	}
	API.order(selectedIds)
		.then((result) => dispatch({ type: IBurgerActionType.ORDER_SUCCESS, payload: result }))
		.catch(e => console.error(e));
};

export const onIngredientClickActionCreator = (id: string) => (dispatch: IBurgerDispatch, getState: IGetState) => {
	const { ingredients } = getState();
	const ingredient = ingredients.find(i => i._id === id);
	if (ingredient) {
		dispatch({ type: IBurgerActionType.INGREDIENT_SELECT_CLICK, ingredient });
		dispatch({ type: IBurgerActionType.INGREDIENT_SHOW, ingredient });
	}
};

export const onIngredientDropActionCreator = (id: string) => (dispatch: IBurgerDispatch, getState: IGetState) => {
	const { ingredients } = getState();
	const ingredient = ingredients.find(i => i._id === id);
	if (ingredient) {
		dispatch({ type: IBurgerActionType.INGREDIENT_SELECT_CLICK, ingredient });
	}
};