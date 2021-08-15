import { Api } from '../Api';
import { IDispatch, IGetState } from '../store';
import { IBurgerActionType } from '../../model/IBurgerAction';


const API_DATA_END_POINT = 'https://norma.nomoreparties.space/api/ingredients';
const API_ORDER_END_POINT = 'https://norma.nomoreparties.space/api/orders';
const API = new Api(API_DATA_END_POINT, API_ORDER_END_POINT);

export const fetchIngredientsAction = () => async (dispatch: IDispatch, getState: IGetState) => {
	dispatch({ type: IBurgerActionType.DATA_REQUEST });
	API.getBurgerParts()
		.then(({ ingredients }) => dispatch({ type: IBurgerActionType.DATA_LOADED, payload: ingredients }))
		.catch(e => dispatch({ type: IBurgerActionType.DATA_FAILED, message: e.toString() }));
};