import { Api } from '../Api';
import { IGetState } from '../store';
import { IBurgerPart } from '../../model/IBurgerPart';

export type ApiAction =
	| { type: ApiActionType.DATA_REQUEST }
	| { type: ApiActionType.DATA_LOADED, payload: IBurgerPart[] }
	| { type: ApiActionType.DATA_FAILED, message: string }

export interface IApiDispatch {
	(action: ApiAction): any
}

export enum ApiActionType {
	DATA_REQUEST = 'DATA_REQUEST',
	DATA_LOADED = 'DATA_LOADED',
	DATA_FAILED = 'DATA_FAILED',
}

const API_DATA_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDER_END_POINT = 'https://norma.nomoreparties.space/api/orders';
const API = new Api(API_DATA_END_POINT, API_ORDER_END_POINT);

export const fetchIngredientsAction = () => async (dispatch: IApiDispatch, getState: IGetState) => {
	dispatch({ type: ApiActionType.DATA_REQUEST });
	API.getBurgerParts()
		.then(({ ingredients }) => dispatch({ type: ApiActionType.DATA_LOADED, payload: ingredients }))
		.catch(e => dispatch({ type: ApiActionType.DATA_FAILED, message: e.toString() }));
};

