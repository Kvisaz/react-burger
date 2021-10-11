import { IGetState } from '../../store';
import {
  API,
  IApiAuthCheckResult,
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
} from '../../services/ApiService';
import { mapApiOrderData } from '../../converters/getBurgerParts';
import { getTokenAuth } from '../../cookieTokens';
import { logg } from '../../utils/log';

export type MainAction =
  | { type: MainActionType.TAB_SELECT, index: number }
  | { type: MainActionType.REGISTRATION_PAGE_CHANGE, data: IApiRegisterUserData }
  | { type: MainActionType.REGISTRATION_USER_REQUEST, data: IApiRegisterUserData }
  | { type: MainActionType.REGISTRATION_USER_SUCCESS, data: IApiRegisterUserResponse, password: string }
  | { type: MainActionType.REGISTRATION_USER_FAIL }
  | { type: MainActionType.RESTORE_PAGE_CHANGE, email: string }
  | { type: MainActionType.RESTORE_PASS_REQUEST, data: IApiRestorePasswordData }
  | { type: MainActionType.RESTORE_PASS_SUCCESS }
  | { type: MainActionType.RESTORE_PASS_FAIL }
  | { type: MainActionType.RESET_PAGE_CHANGE, code: string, password: string }
  | { type: MainActionType.RESET_PASS_REQUEST }
  | { type: MainActionType.RESET_PASS_SUCCESS }
  | { type: MainActionType.RESET_PASS_FAIL }
  | { type: MainActionType.LOGIN_PAGE_CHANGE, data: IApiLoginData }
  | { type: MainActionType.LOGIN_REQUEST, data: IApiLoginData }
  | { type: MainActionType.LOGIN_SUCCESS, data: IApiLoginResponse, password: string }
  | { type: MainActionType.LOGIN_FAIL }
  | { type: MainActionType.LOGOUT_REQUEST }
  | { type: MainActionType.LOGOUT_SUCCESS, data: IApiLogoutResponse }
  | { type: MainActionType.LOGOUT_FAIL }
  | { type: MainActionType.TOKEN_REFRESH_REQUEST, data: IApiTokenData }
  | { type: MainActionType.TOKEN_REFRESH_SUCCESS, data: IApiTokenResponse }
  | { type: MainActionType.TOKEN_REFRESH_FAIL }
  | { type: MainActionType.PROFILE_REQUEST }
  | { type: MainActionType.PROFILE_SUCCESS, data: IApiProfileData }
  | { type: MainActionType.PROFILE_FAIL }
  | { type: MainActionType.PROFILE_PAGE_CHANGE, data: IApiProfileData }
  | { type: MainActionType.PROFILE_PAGE_RESET }
  | { type: MainActionType.PROFILE_UPDATE_REQUEST, data: IApiProfileData }
  | { type: MainActionType.PROFILE_UPDATE_SUCCESS, data: IApiProfileData }
  | { type: MainActionType.PROFILE_UPDATE_FAIL }
  | { type: MainActionType.SAVE_AFTER_LOGGING_URL, url: string }
  | { type: MainActionType.SET_MODAL_URL, isModal: boolean }
  | { type: MainActionType.AUTH_CHECK_START }
  | { type: MainActionType.AUTH_CHECK_END, data: IApiAuthCheckResult }


type IMainDispatch = (action: MainAction) => any;

export enum MainActionType {


  TAB_SELECT = 'TAB_SELECT',

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

  SET_MODAL_URL = 'SET_MODAL_URL',
}


export interface IAuthCheckStartData {
  selectedId: string,
  ingredientId: string
}






const registerActionCreator = (data: IApiRegisterUserData) => async (dispatch: IMainDispatch) => {
  dispatch({ type: MainActionType.REGISTRATION_USER_REQUEST, data });

  API.registerUser(data)
    .then((response) =>
      dispatch({ type: MainActionType.REGISTRATION_USER_SUCCESS, data: response, password: data.password }))
    .catch(() => dispatch({ type: MainActionType.REGISTRATION_USER_FAIL }));
};

const loginActionCreator = (data: IApiLoginData) => async (dispatch: IMainDispatch) => {
  dispatch({ type: MainActionType.LOGIN_REQUEST, data });

  API.login(data)
    .then((response) => {
      dispatch({ type: MainActionType.LOGIN_SUCCESS, data: response, password: data.password });
    }).catch(() => dispatch({ type: MainActionType.LOGIN_FAIL }));
};

const logoutActionCreator = () => async (dispatch: IMainDispatch) => {
  dispatch({ type: MainActionType.LOGOUT_REQUEST });
  API.logout()
    .then((response) => dispatch({ type: MainActionType.LOGOUT_SUCCESS, data: response }))
    .catch(() => dispatch({ type: MainActionType.LOGOUT_FAIL }));
};

const restorePassActionCreator = (data: IApiRestorePasswordData) =>
  async (dispatch: IMainDispatch) => {
    dispatch({ type: MainActionType.RESTORE_PASS_REQUEST, data });
    API.restorePassword(data)
      .then(() => dispatch({ type: MainActionType.RESTORE_PASS_SUCCESS }))
      .catch(() => dispatch({ type: MainActionType.RESTORE_PASS_FAIL }));
  };

const resetPassActionCreator = () =>
  async (dispatch: IMainDispatch, getState: IGetState) => {
    const { userResetCode: token = '', userResetPassword: password = '' } = getState().main;
    const data: IApiResetPasswordData = {
      password, token,
    };

    dispatch({ type: MainActionType.RESET_PASS_REQUEST });

    API.resetPassword(data)
      .then(() => dispatch({ type: MainActionType.RESET_PASS_SUCCESS }))
      .catch(() => dispatch({ type: MainActionType.RESET_PASS_FAIL }));
  };

const requestProfileActionCreator = () =>
  async (dispatch: IMainDispatch) => {
    dispatch({ type: MainActionType.PROFILE_REQUEST });
    API.getProfile()
      .then((response) => {
          dispatch({ type: MainActionType.PROFILE_SUCCESS, data: { ...response.user, password: '' } });
        },
      )
      .catch(() => dispatch({ type: MainActionType.PROFILE_FAIL }));
  };

const updateProfileActionCreator = () =>
  async (dispatch: IMainDispatch, getState: IGetState) => {
    const { profileName = '', profileEmail = '', profilePassword = '' } = getState().main;
    const data = {
      name: profileName,
      email: profileEmail,
      password: profilePassword,
    };
    dispatch({ type: MainActionType.PROFILE_UPDATE_REQUEST, data });
    API.patchProfile(data)
      .then(() => {
          dispatch({ type: MainActionType.PROFILE_UPDATE_SUCCESS, data });
        },
      )
      .catch((e) => {
        console.warn(e);
        dispatch({ type: MainActionType.PROFILE_UPDATE_FAIL });
      });
  };

const setModalUrlOn = () =>
  async (dispatch: IMainDispatch) => {
    dispatch({ type: MainActionType.SET_MODAL_URL, isModal: true });
  };

const setModalUrlOff = () =>
  async (dispatch: IMainDispatch) => {
    dispatch({ type: MainActionType.SET_MODAL_URL, isModal: false });
  };


export const MAIN_ACTION = {
  setModalUrlOff,
  setModalUrlOn,
  updateProfileActionCreator,
  requestProfileActionCreator,
  resetPassActionCreator,
  restorePassActionCreator,
  logoutActionCreator,
  loginActionCreator,
  registerActionCreator,
};