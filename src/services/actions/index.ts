import { IBurgerPart } from '../model/IBurgerPart';
import { IGetState } from '../store';
import {
  Api,
  IApiAuthCheckResult,
  IApiEndpoints,
  IApiLoginData,
  IApiLoginResponse,
  IApiLogoutResponse,
  IApiProfileData,
  IApiRegisterUserData,
  IApiRegisterUserResponse,
  IApiResetPasswordData,
  IApiRestorePasswordData,
  IApiTokenData,
  IApiTokenResponse,
} from '../Api';
import { IOrderFeedItem } from '../model/IOrderFeedItem';
import { mapApiOrderData } from '../converters/getBurgerParts';

export type BurgerAction =
  | { type: IBurgerActionType.DATA_REQUEST }
  | { type: IBurgerActionType.DATA_LOADED, ingredients: IBurgerPart[], isAuthorized: boolean }
  | { type: IBurgerActionType.DATA_FAILED, message: string }
  | { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }
  | { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad }
  | { type: IBurgerActionType.ORDER_RESET }
  | { type: IBurgerActionType.ORDER_REQUEST }
  | { type: IBurgerActionType.ORDER_SUCCESS, payload: IOrderPayLoad }
  | { type: IBurgerActionType.ORDER_FAILED }
  | { type: IBurgerActionType.TAB_SELECT, index: number }
  | { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string }
  | { type: IBurgerActionType.REGISTRATION_PAGE_CHANGE, data: IApiRegisterUserData }
  | { type: IBurgerActionType.REGISTRATION_USER_REQUEST, data: IApiRegisterUserData }
  | { type: IBurgerActionType.REGISTRATION_USER_SUCCESS, data: IApiRegisterUserResponse, password: string }
  | { type: IBurgerActionType.REGISTRATION_USER_FAIL }
  | { type: IBurgerActionType.RESTORE_PAGE_CHANGE, email: string }
  | { type: IBurgerActionType.RESTORE_PASS_REQUEST, data: IApiRestorePasswordData }
  | { type: IBurgerActionType.RESTORE_PASS_SUCCESS }
  | { type: IBurgerActionType.RESTORE_PASS_FAIL }
  | { type: IBurgerActionType.RESET_PAGE_CHANGE, code: string, password: string }
  | { type: IBurgerActionType.RESET_PASS_REQUEST }
  | { type: IBurgerActionType.RESET_PASS_SUCCESS }
  | { type: IBurgerActionType.RESET_PASS_FAIL }
  | { type: IBurgerActionType.LOGIN_PAGE_CHANGE, data: IApiLoginData }
  | { type: IBurgerActionType.LOGIN_REQUEST, data: IApiLoginData }
  | { type: IBurgerActionType.LOGIN_SUCCESS, data: IApiLoginResponse, password: string }
  | { type: IBurgerActionType.LOGIN_FAIL }
  | { type: IBurgerActionType.LOGOUT_REQUEST }
  | { type: IBurgerActionType.LOGOUT_SUCCESS, data: IApiLogoutResponse }
  | { type: IBurgerActionType.LOGOUT_FAIL }
  | { type: IBurgerActionType.TOKEN_REFRESH_REQUEST, data: IApiTokenData }
  | { type: IBurgerActionType.TOKEN_REFRESH_SUCCESS, data: IApiTokenResponse }
  | { type: IBurgerActionType.TOKEN_REFRESH_FAIL }
  | { type: IBurgerActionType.PROFILE_REQUEST }
  | { type: IBurgerActionType.PROFILE_SUCCESS, data: IApiProfileData }
  | { type: IBurgerActionType.PROFILE_FAIL }
  | { type: IBurgerActionType.PROFILE_PAGE_CHANGE, data: IApiProfileData }
  | { type: IBurgerActionType.PROFILE_PAGE_RESET }
  | { type: IBurgerActionType.PROFILE_UPDATE_REQUEST, data: IApiProfileData }
  | { type: IBurgerActionType.PROFILE_UPDATE_SUCCESS, data: IApiProfileData }
  | { type: IBurgerActionType.PROFILE_UPDATE_FAIL }
  | { type: IBurgerActionType.SAVE_AFTER_LOGGING_URL, url: string }
  | { type: IBurgerActionType.SET_MODAL_URL, isModal: boolean }
  | { type: IBurgerActionType.AUTH_CHECK_START }
  | { type: IBurgerActionType.AUTH_CHECK_END, data: IApiAuthCheckResult }
  | { type: IBurgerActionType.ORDER_FEED_UPDATE, orderFeed: IOrderFeedItem[] }
  | { type: IBurgerActionType.WS_ORDER_CONNECTION_START, token: string }
  | { type: IBurgerActionType.WS_ORDER_CONNECTION_SUCCESS }
  | { type: IBurgerActionType.WS_ORDER_CONNECTION_CLOSED, event: any }
  | { type: IBurgerActionType.WS_ORDER_CONNECTION_ERROR, error: any }
  | { type: IBurgerActionType.WS_ORDER_GET_MESSAGE, message: any }
  | { type: IBurgerActionType.WS_ORDER_SEND_MESSAGE, message: any }

type IBurgerDispatch = (action: BurgerAction) => any;

export enum IBurgerActionType {
  DATA_REQUEST = 'DATA_REQUEST',
  DATA_LOADED = 'DATA_LOADED',
  DATA_FAILED = 'DATA_FAILED',
  INGREDIENT_ADD_TO_BASKET = 'INGREDIENT_ADD_TO_BASKET',

  INGREDIENT_REMOVE_FROM_BASKET = 'INGREDIENT_REMOVE_FROM_BASKET',
  ORDER_RESET = 'ORDER_RESET',
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

  PROFILE_REQUEST = 'PROFILE_REQUEST',
  PROFILE_SUCCESS = 'PROFILE_SUCCESS',
  PROFILE_FAIL = 'PROFILE_FAIL',

  PROFILE_PAGE_CHANGE = 'PROFILE_PAGE_CHANGE',
  PROFILE_PAGE_RESET = 'PROFILE_PAGE_RESET',

  PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL',

  SAVE_AFTER_LOGGING_URL = 'SAVE_AFTER_LOGGING_URL',
  AUTH_CHECK_START = 'AUTH_CHECK_START',
  AUTH_CHECK_END = 'AUTH_CHECK_END',

  ORDER_FEED_UPDATE = 'ORDER_FEED_UPDATE',

  SET_MODAL_URL = 'SET_MODAL_URL',

  WS_ORDER_CONNECTION_SUCCESS = 'WS_ORDER_CONNECTION_SUCCESS',
  WS_ORDER_CONNECTION_START = 'WS_ORDER_CONNECTION_START',
  WS_ORDER_CONNECTION_ERROR = 'WS_ORDER_CONNECTION_ERROR',
  WS_ORDER_CONNECTION_CLOSED = 'WS_ORDER_CONNECTION_CLOSED',
  WS_ORDER_GET_MESSAGE = 'WS_ORDER_GET_MESSAGE',
  WS_ORDER_SEND_MESSAGE = 'WS_ORDER_SEND_MESSAGE',
}

export interface IOrderPayLoad {
  orderId: number,
  name: string,
}

export interface IRemovePayLoad {
  selectedId: string,
  ingredientId: string
}

export interface IAuthCheckStartData {
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
  orderFeed: 'https://norma.nomoreparties.space/api/orders/all',
};

const API = new Api(END_POINTS);

export const initData = () => async (dispatch: IBurgerDispatch) => {
  dispatch({ type: IBurgerActionType.DATA_REQUEST });

  try {
    const { isAuthorized } = await API.restoreAuth();
    const { ingredients } = await API.getBurgerParts();
    console.log('ingredients', ingredients)
    dispatch({ type: IBurgerActionType.DATA_LOADED, ingredients, isAuthorized });
  } catch (e: any) {
    dispatch({ type: IBurgerActionType.DATA_FAILED, message: e.toString() });
  }
};

export const orderAuthorizedActionCreator = () => async (dispatch: IBurgerDispatch, getState: IGetState) => {
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
    .catch(e => {
      console.error(e);
      dispatch({ type: IBurgerActionType.ORDER_FAILED });
    });
};

export const onIngredientDropActionCreator = (id: string) => (dispatch: IBurgerDispatch, getState: IGetState) => {
  const { ingredients } = getState();
  const ingredient = ingredients.find(i => i._id === id);
  if (ingredient) {
    dispatch({ type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient });
  }
};

export const registerActionCreator = (data: IApiRegisterUserData) => async (dispatch: IBurgerDispatch) => {
  dispatch({ type: IBurgerActionType.REGISTRATION_USER_REQUEST, data });

  API.registerUser(data)
    .then((response) =>
      dispatch({ type: IBurgerActionType.REGISTRATION_USER_SUCCESS, data: response, password: data.password }))
    .catch(() => dispatch({ type: IBurgerActionType.REGISTRATION_USER_FAIL }));
};

export const loginActionCreator = (data: IApiLoginData) => async (dispatch: IBurgerDispatch) => {
  dispatch({ type: IBurgerActionType.LOGIN_REQUEST, data });

  API.login(data)
    .then((response) =>
      dispatch({ type: IBurgerActionType.LOGIN_SUCCESS, data: response, password: data.password }))
    .catch(() => dispatch({ type: IBurgerActionType.LOGIN_FAIL }));
};

export const logoutActionCreator = () => async (dispatch: IBurgerDispatch) => {
  dispatch({ type: IBurgerActionType.LOGOUT_REQUEST });

  API.logout()
    .then((response) => dispatch({ type: IBurgerActionType.LOGOUT_SUCCESS, data: response }))
    .catch(() => dispatch({ type: IBurgerActionType.LOGOUT_FAIL }));
};

export const restorePassActionCreator = (data: IApiRestorePasswordData) =>
  async (dispatch: IBurgerDispatch) => {
    dispatch({ type: IBurgerActionType.RESTORE_PASS_REQUEST, data });
    API.restorePassword(data)
      .then(() => dispatch({ type: IBurgerActionType.RESTORE_PASS_SUCCESS }))
      .catch(() => dispatch({ type: IBurgerActionType.RESTORE_PASS_FAIL }));
  };

export const resetPassActionCreator = () =>
  async (dispatch: IBurgerDispatch, getState: IGetState) => {
    const { userResetCode: token = '', userResetPassword: password = '' } = getState();
    const data: IApiResetPasswordData = {
      password, token,
    };

    dispatch({ type: IBurgerActionType.RESET_PASS_REQUEST });

    API.resetPassword(data)
      .then(() => dispatch({ type: IBurgerActionType.RESET_PASS_SUCCESS }))
      .catch(() => dispatch({ type: IBurgerActionType.RESET_PASS_FAIL }));
  };

export const requestProfileActionCreator = () =>
  async (dispatch: IBurgerDispatch) => {
    dispatch({ type: IBurgerActionType.PROFILE_REQUEST });
    API.getProfile()
      .then((response) => {
          dispatch({ type: IBurgerActionType.PROFILE_SUCCESS, data: { ...response.user, password: '' } });
        },
      )
      .catch(() => dispatch({ type: IBurgerActionType.PROFILE_FAIL }));
  };

export const updateProfileActionCreator = () =>
  async (dispatch: IBurgerDispatch, getState: IGetState) => {
    const { profileName = '', profileEmail = '', profilePassword = '' } = getState();
    const data = {
      name: profileName,
      email: profileEmail,
      password: profilePassword,
    };
    dispatch({ type: IBurgerActionType.PROFILE_UPDATE_REQUEST, data });
    API.patchProfile(data)
      .then(() => {
          dispatch({ type: IBurgerActionType.PROFILE_UPDATE_SUCCESS, data });
        },
      )
      .catch((e) => {
        console.warn(e);
        dispatch({ type: IBurgerActionType.PROFILE_UPDATE_FAIL });
      });
  };

export const setModalUrlOn = () =>
  async (dispatch: IBurgerDispatch) => {
    dispatch({ type: IBurgerActionType.SET_MODAL_URL, isModal: true });
  };

export const setModalUrlOff = () =>
  async (dispatch: IBurgerDispatch) => {
    dispatch({ type: IBurgerActionType.SET_MODAL_URL, isModal: false });
  };

export const updateOrderFeed = () =>
  async (dispatch: IBurgerDispatch, getState: IGetState) => {
    try {
      const apiOrderFeed = await API.fetchOrdersFeed();
      const { ingredients } = getState();
      const orderFeed = apiOrderFeed.map(order => mapApiOrderData(order, ingredients));
      dispatch({ type: IBurgerActionType.ORDER_FEED_UPDATE, orderFeed });
    } catch (e) {
      console.warn(e);
    }
  };