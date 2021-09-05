import {IBurgerPart} from '../../model/IBurgerPart';
import {IGetState} from '../store';
import {
    Api,
    IApiEndpoints,
    IApiLoginData,
    IApiRegisterUserData,
    IApiResetPasswordData,
    IApiRestorePasswordData
} from '../Api';

export type BurgerAction =
    | { type: IBurgerActionType.DATA_REQUEST }
    | { type: IBurgerActionType.DATA_LOADED, ingredients: IBurgerPart[] }
    | { type: IBurgerActionType.DATA_FAILED, message: string }
    | { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }
    | { type: IBurgerActionType.INGREDIENT_SHOW, ingredient: IBurgerPart }
    | { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad }
    | { type: IBurgerActionType.ORDER_REQUEST }
    | { type: IBurgerActionType.ORDER_SUCCESS, payload: IOrderPayLoad }
    | { type: IBurgerActionType.ORDER_FAILED }
    | { type: IBurgerActionType.CLOSE_MODAL }
    | { type: IBurgerActionType.TAB_SELECT, index: number }
    | { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string }
    | { type: IBurgerActionType.REGISTRATION_USER_REQUEST, data: IApiRegisterUserData }
    | { type: IBurgerActionType.REGISTRATION_USER_SUCCESS }
    | { type: IBurgerActionType.REGISTRATION_USER_FAIL }
    | { type: IBurgerActionType.RESTORE_PASS_REQUEST, data: IApiRestorePasswordData }
    | { type: IBurgerActionType.RESTORE_PASS_SUCCESS }
    | { type: IBurgerActionType.RESTORE_PASS_FAIL }
    | { type: IBurgerActionType.RESET_PASS_REQUEST, data: IApiResetPasswordData }
    | { type: IBurgerActionType.RESET_PASS_SUCCESS }
    | { type: IBurgerActionType.RESET_PASS_FAIL }
    | { type: IBurgerActionType.LOGIN_REQUEST, data: IApiLoginData }
    | { type: IBurgerActionType.LOGIN_SUCCESS }
    | { type: IBurgerActionType.LOGIN_FAIL }

type IBurgerDispatch = (action: BurgerAction) => any;


export enum IBurgerActionType {
    DATA_REQUEST = 'DATA_REQUEST',
    DATA_LOADED = 'DATA_LOADED',
    DATA_FAILED = 'DATA_FAILED',
    INGREDIENT_ADD_TO_BASKET = 'INGREDIENT_ADD_TO_BASKET',
    INGREDIENT_SHOW = 'INGREDIENT_SHOW',
    INGREDIENT_REMOVE_FROM_BASKET = 'INGREDIENT_REMOVE_FROM_BASKET',
    ORDER_REQUEST = 'ORDER_REQUEST',
    ORDER_SUCCESS = 'ORDER_SUCCESS',
    ORDER_FAILED = 'ORDER_FAILED',
    CLOSE_MODAL = 'CLOSE_MODAL',
    TAB_SELECT = 'TAB_SELECT',
    BASKET_ITEM_SWAP = 'BASKET_ITEM_SWAP',

    REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST',
    REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
    REGISTRATION_USER_FAIL = 'REGISTRATION_USER_FAIL',

    RESTORE_PASS_REQUEST = 'RESTORE_PASS_REQUEST',
    RESTORE_PASS_SUCCESS = 'RESTORE_PASS_SUCCESS',
    RESTORE_PASS_FAIL = 'RESTORE_PASS_FAIL',

    RESET_PASS_REQUEST = 'RESET_PASS_REQUEST',
    RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS',
    RESET_PASS_FAIL = 'RESET_PASS_FAIL',

    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',

}

export interface IOrderPayLoad {
    orderId: number,
    name: string,
}

export interface IRemovePayLoad {
    selectedId: string,
    ingredientId: string
}

const END_POINTS: IApiEndpoints = {
    ingredients: 'https://norma.nomoreparties.space/api/ingredients',
    order: 'https://norma.nomoreparties.space/api/orders',
    login: 'https://norma.nomoreparties.space/api/password-reset/login',
    registerUser: 'https://norma.nomoreparties.space/api/auth/register',
    restorePassword: 'https://norma.nomoreparties.space/api/password-reset',
    resetPassword: 'https://norma.nomoreparties.space/api/password-reset/reset',
}

const API = new Api(END_POINTS);

export const fetchIngredientsActionCreator = () => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.DATA_REQUEST});

    API.getBurgerParts()
        .then(({ingredients}) => dispatch({type: IBurgerActionType.DATA_LOADED, ingredients}))
        .catch((e: Error | string) => dispatch({type: IBurgerActionType.DATA_FAILED, message: e.toString()}));
};

export const onOrderClickActionCreator = () => async (dispatch: IBurgerDispatch, getState: IGetState) => {
    dispatch({type: IBurgerActionType.ORDER_REQUEST});
    const state = getState();

    const selectedBun = state.selectedBun;
    const selectedIds = state.selectedParts.map(i => i.ingredientId);
    if (selectedBun) {
        selectedIds.push(selectedBun.ingredientId);
        selectedIds.push(selectedBun.ingredientId);
    }
    API.order(selectedIds)
        .then((result) => dispatch({type: IBurgerActionType.ORDER_SUCCESS, payload: result}))
        .catch(e => console.error(e));
};

export const onIngredientClickActionCreator = (id: string) => (dispatch: IBurgerDispatch, getState: IGetState) => {
    const {ingredients} = getState();
    const ingredient = ingredients.find(i => i._id === id);
    if (ingredient) {
        dispatch({type: IBurgerActionType.INGREDIENT_SHOW, ingredient});
    }
};

export const onIngredientDropActionCreator = (id: string) => (dispatch: IBurgerDispatch, getState: IGetState) => {
    const {ingredients} = getState();
    const ingredient = ingredients.find(i => i._id === id);
    if (ingredient) {
        dispatch({type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient});
    }
};

export const registerActionCreator = (data: IApiRegisterUserData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.REGISTRATION_USER_REQUEST, data});

    API.registerUser(data)
        .then(() => dispatch({type: IBurgerActionType.REGISTRATION_USER_SUCCESS}))
        .catch(() => dispatch({type: IBurgerActionType.REGISTRATION_USER_FAIL}));
}

export const loginActionCreator = (data: IApiLoginData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.LOGIN_REQUEST, data});

    API.login(data)
        .then(() => dispatch({type: IBurgerActionType.LOGIN_SUCCESS}))
        .catch(() => dispatch({type: IBurgerActionType.LOGIN_FAIL}));
}


export const restorePassActionCreator = (data: IApiRestorePasswordData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.RESTORE_PASS_REQUEST, data});

    API.restorePassword(data)
        .then(() => dispatch({type: IBurgerActionType.RESTORE_PASS_SUCCESS}))
        .catch(() => dispatch({type: IBurgerActionType.RESTORE_PASS_FAIL}));
}

export const resetPassActionCreator = (data: IApiResetPasswordData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.RESET_PASS_REQUEST, data});

    API.resetPassword(data)
        .then(() => dispatch({type: IBurgerActionType.RESET_PASS_SUCCESS}))
        .catch(() => dispatch({type: IBurgerActionType.RESET_PASS_FAIL}));
}