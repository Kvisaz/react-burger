import {IBurgerPart} from '../../model/IBurgerPart';
import {IGetState} from '../store';
import {
    Api,
    IApiEndpoints,
    IApiLoginData, IApiLogoutData, IApiLogoutResponse,
    IApiRegisterUserData,
    IApiResetPasswordData,
    IApiRestorePasswordData, IApiTokenData, IApiTokenResponse
} from '../Api';

export type BurgerAction =
    | { type: IBurgerActionType.DATA_REQUEST }
    | { type: IBurgerActionType.DATA_LOADED, ingredients: IBurgerPart[] }
    | { type: IBurgerActionType.DATA_FAILED, message: string }
    | { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }
    | { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad }
    | { type: IBurgerActionType.ORDER_REQUEST }
    | { type: IBurgerActionType.ORDER_SUCCESS, payload: IOrderPayLoad }
    | { type: IBurgerActionType.ORDER_FAILED }
    | { type: IBurgerActionType.TAB_SELECT, index: number }
    | { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string }
    | { type: IBurgerActionType.REGISTRATION_PAGE_CHANGE, data: IApiRegisterUserData }
    | { type: IBurgerActionType.REGISTRATION_USER_REQUEST, data: IApiRegisterUserData }
    | { type: IBurgerActionType.REGISTRATION_USER_SUCCESS }
    | { type: IBurgerActionType.REGISTRATION_USER_FAIL }
    | { type: IBurgerActionType.RESTORE_PAGE_CHANGE, email: string }
    | { type: IBurgerActionType.RESTORE_PASS_REQUEST, data: IApiRestorePasswordData }
    | { type: IBurgerActionType.RESTORE_PASS_SUCCESS }
    | { type: IBurgerActionType.RESTORE_PASS_FAIL }
    | { type: IBurgerActionType.RESET_PAGE_CHANGE, code: string, password: string }
    | { type: IBurgerActionType.RESET_PASS_REQUEST }
    | { type: IBurgerActionType.RESET_PASS_SUCCESS }
    | { type: IBurgerActionType.RESET_PASS_FAIL }
    | { type: IBurgerActionType.LOGIN_PAGE_CHANGE, email: string, password: string }
    | { type: IBurgerActionType.LOGIN_REQUEST, data: IApiLoginData }
    | { type: IBurgerActionType.LOGIN_SUCCESS }
    | { type: IBurgerActionType.LOGIN_FAIL }
    | { type: IBurgerActionType.LOGOUT_REQUEST, data: IApiLogoutData }
    | { type: IBurgerActionType.LOGOUT_SUCCESS, data: IApiLogoutResponse }
    | { type: IBurgerActionType.LOGOUT_FAIL }
    | { type: IBurgerActionType.TOKEN_REFRESH_REQUEST, data: IApiTokenData }
    | { type: IBurgerActionType.TOKEN_REFRESH_SUCCESS, data: IApiTokenResponse }
    | { type: IBurgerActionType.TOKEN_REFRESH_FAIL }

type IBurgerDispatch = (action: BurgerAction) => any;
type IBurgerThunkDispatch = Function;


export enum IBurgerActionType {
    DATA_REQUEST = 'DATA_REQUEST',
    DATA_LOADED = 'DATA_LOADED',
    DATA_FAILED = 'DATA_FAILED',
    INGREDIENT_ADD_TO_BASKET = 'INGREDIENT_ADD_TO_BASKET',

    INGREDIENT_REMOVE_FROM_BASKET = 'INGREDIENT_REMOVE_FROM_BASKET',
    ORDER_REQUEST = 'ORDER_REQUEST',
    ORDER_SUCCESS = 'ORDER_SUCCESS',
    ORDER_FAILED = 'ORDER_FAILED',
    TAB_SELECT = 'TAB_SELECT',
    BASKET_ITEM_SWAP = 'BASKET_ITEM_SWAP',

    REGISTRATION_PAGE_CHANGE = 'REGISTRATION_PAGE_CHANGE',
    REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST',
    REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
    REGISTRATION_USER_FAIL = 'REGISTRATION_USER_FAIL',

    RESTORE_PAGE_CHANGE = 'RESTORE_PAGE_CHANGE',
    RESTORE_PASS_REQUEST = 'RESTORE_PASS_REQUEST',
    RESTORE_PASS_SUCCESS = 'RESTORE_PASS_SUCCESS',
    RESTORE_PASS_FAIL = 'RESTORE_PASS_FAIL',

    RESET_PAGE_CHANGE = 'RESET_PAGE_CHANGE',
    RESET_PASS_REQUEST = 'RESET_PASS_REQUEST',
    RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS',
    RESET_PASS_FAIL = 'RESET_PASS_FAIL',

    LOGIN_PAGE_CHANGE = 'LOGIN_PAGE_CHANGE',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',

    LOGOUT_REQUEST = 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAIL = 'LOGOUT_FAIL',

    TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST',
    TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS',
    TOKEN_REFRESH_FAIL = 'TOKEN_REFRESH_FAIL',

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
    login: 'https://norma.nomoreparties.space/api/auth/login',
    logout: 'https://norma.nomoreparties.space/api/auth/logout',
    token: 'https://norma.nomoreparties.space/api/auth/token',
    registerUser: 'https://norma.nomoreparties.space/api/auth/register',
    restorePassword: 'https://norma.nomoreparties.space/api/password-reset',
    resetPassword: 'https://norma.nomoreparties.space/api/password-reset/reset',
    userData: 'https://norma.nomoreparties.space/api/auth/user',
}

const API = new Api(END_POINTS);

export const fetchIngredientsActionCreator = () => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.DATA_REQUEST});

    API.getBurgerParts()
        .then(({ingredients}) => dispatch({type: IBurgerActionType.DATA_LOADED, ingredients}))
        .catch((e: Error | string) => dispatch({type: IBurgerActionType.DATA_FAILED, message: e.toString()}));
};

export const onOrderClickActionCreator = () => async (dispatch: IBurgerThunkDispatch, getState: IGetState) => {
    const {userTokenAuth} = getState();
    if (userTokenAuth != null) {
        dispatch(orderAuthorizedActionCreator());
    } else {
        dispatch(orderUnAuthorizedActionCreator());
    }
};

export const orderUnAuthorizedActionCreator = () => async (dispatch: IBurgerDispatch, getState: IGetState) => {
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

export const orderAuthorizedActionCreator = () => async (dispatch: IBurgerDispatch, getState: IGetState) => {
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

export const logoutActionCreator = (data: IApiLogoutData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.LOGOUT_REQUEST, data});

    API.logout(data)
        .then((response) => dispatch({type: IBurgerActionType.LOGOUT_SUCCESS, data: response}))
        .catch(() => dispatch({type: IBurgerActionType.LOGOUT_FAIL}));
}

export const restorePassActionCreator = (data: IApiRestorePasswordData) =>
    async (dispatch: IBurgerDispatch) => {
        dispatch({type: IBurgerActionType.RESTORE_PASS_REQUEST, data});
        API.restorePassword(data)
            .then(() => dispatch({type: IBurgerActionType.RESTORE_PASS_SUCCESS}))
            .catch(() => dispatch({type: IBurgerActionType.RESTORE_PASS_FAIL}));
    }

export const resetPassActionCreator = () =>
    async (dispatch: IBurgerDispatch, getState: IGetState) => {
        const {userResetCode: token = '', userResetPassword: password = ''} = getState();
        const data: IApiResetPasswordData = {
            password, token
        }

        dispatch({type: IBurgerActionType.RESET_PASS_REQUEST});

        API.resetPassword(data)
            .then(() => dispatch({type: IBurgerActionType.RESET_PASS_SUCCESS}))
            .catch(() => dispatch({type: IBurgerActionType.RESET_PASS_FAIL}));
    }

export const refreshTokenActionCreator = (data: IApiTokenData) => async (dispatch: IBurgerDispatch) => {
    dispatch({type: IBurgerActionType.TOKEN_REFRESH_REQUEST, data});

    API.refreshToken(data)
        .then((response) => dispatch({type: IBurgerActionType.TOKEN_REFRESH_SUCCESS, data: response}))
        .catch(() => dispatch({type: IBurgerActionType.TOKEN_REFRESH_FAIL}));
}