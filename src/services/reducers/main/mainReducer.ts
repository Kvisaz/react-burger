import { IMainState, InitialMainState } from './IMainState';
import { MainAction, MainActionType } from '../../actions';
import {
  IApiLoginData,
  IApiLoginResponse,
  IApiProfileData,
  IApiRegisterUserData,
  IApiRegisterUserResponse,
} from '../../services/ApiService';


export function mainReducer(state: IMainState = InitialMainState, action: MainAction): IMainState {
  switch (action.type) {
    case MainActionType.TAB_SELECT:
      return {
        ...state,
        currentTabIndex: action.index,
      };
    case MainActionType.REGISTRATION_PAGE_CHANGE:
      return onRegisterPageChange(action, state);
    case MainActionType.REGISTRATION_USER_REQUEST:
      return {
        ...state,
        isRegisterRequest: true,
        isRegisterSuccess: false,
        isRegisterFailed: false,
      };
    case MainActionType.REGISTRATION_USER_SUCCESS:
      return onRegisterSuccess(action, state);
    case MainActionType.REGISTRATION_USER_FAIL:
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterSuccess: false,
        isRegisterFailed: true,
      };
    case MainActionType.LOGIN_PAGE_CHANGE:
      return onLoginPageChange(action, state);
    case MainActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
        isLoginFailed: false,
      };
    case MainActionType.LOGIN_SUCCESS:
      return onLoginSuccess(action, state);
    case MainActionType.LOGIN_FAIL:
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: false,
        isLoginFailed: true,
        isAuthorized: false,
      };
    case MainActionType.LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutSuccess: false,
        isLogoutFailed: false,
      };
    case MainActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: true,
        isLogoutFailed: false,
        isAuthorized: false,
      };
    case MainActionType.LOGOUT_FAIL:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: false,
        isLogoutFailed: true,
      };
    case MainActionType.RESTORE_PAGE_CHANGE:
      return onRestorePageChange(action, state);
    case MainActionType.RESTORE_PASS_REQUEST:
      return {
        ...state,
        isRestoreRequest: true,
      };
    case MainActionType.RESTORE_PASS_SUCCESS:
      return {
        ...state,
        isRestoreRequest: false,
        isRestoreSuccess: true,
        isRestoreFailed: false,
      };
    case MainActionType.RESTORE_PASS_FAIL:
      return {
        ...state,
        isRestoreRequest: false,
        isRestoreSuccess: false,
        isRestoreFailed: true,
      };
    case MainActionType.RESET_PAGE_CHANGE:
      return onResetPageChange(action, state);
    case MainActionType.RESET_PASS_REQUEST:
      return {
        ...state,
        isResetRequest: true,
      };
    case MainActionType.RESET_PASS_SUCCESS:
      return {
        ...state,
        isResetRequest: false,
        isResetFailed: false,
        isResetSuccess: true,
        isRestoreSuccess: false,
      };
    case MainActionType.RESET_PASS_FAIL:
      return {
        ...state,
        isResetRequest: false,
        isResetFailed: true,
        isResetSuccess: false,
        isRestoreSuccess: false,
      };
    case MainActionType.TOKEN_REFRESH_REQUEST:
      // TODO
      return {
        ...state,
      };
    case MainActionType.TOKEN_REFRESH_SUCCESS:
      // TODO
      return {
        ...state,
      };
    case MainActionType.TOKEN_REFRESH_FAIL:
      // TODO
      return {
        ...state,
      };
    case MainActionType.PROFILE_REQUEST:
      return {
        ...state,
        isProfileRequest: true,
        isProfileSuccess: false,
        isProfileFail: false,
      };
    case MainActionType.PROFILE_SUCCESS:
      return onProfilePageLoad(action, state);
    case MainActionType.PROFILE_FAIL:
      return {
        ...state,
        isProfileRequest: false,
        isProfileSuccess: false,
        isProfileFail: true,
      };

    case MainActionType.PROFILE_PAGE_CHANGE:
      return onProfilePageChange(action, state);
    case MainActionType.PROFILE_PAGE_RESET:
      return onProfilePageReset(action, state);

    case MainActionType.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isProfileUpdateRequest: true,
        isProfileUpdateSuccess: false,
        isProfileUpdateFail: false,
      };
    case MainActionType.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isProfileUpdateRequest: false,
        isProfileUpdateSuccess: true,
        isProfileUpdateFail: false,
        userName: action.data.name,
        userPassword: '',
        userEmail: action.data.email,
      };
    case MainActionType.PROFILE_UPDATE_FAIL:
      return {
        ...state,
        isProfileUpdateRequest: false,
        isProfileUpdateSuccess: false,
        isProfileUpdateFail: true,
      };
    case MainActionType.SAVE_AFTER_LOGGING_URL:
      return {
        ...state,
        urlAfterLogging: action.url,
      };


    case MainActionType.SET_MODAL_URL:
      return {
        ...state,
        isModalUrl: action.isModal,
      };

    case MainActionType.AUTH_CHECK_START:
      return {
        ...state,
        isAuthorizationChecking: true,
      };
    case MainActionType.AUTH_CHECK_END:
      return {
        ...state,
        isAuthorizationChecking: false,
        isAuthorized: action.data.isAuthorized,
      };
    default:
      console.warn(`unknown action`, action);
      return {
        ...state,
      };
  }
}

function onRegisterPageChange(
  action: { type: MainActionType.REGISTRATION_PAGE_CHANGE, data: IApiRegisterUserData },
  state: IMainState,
): IMainState {
  return {
    ...state,
    userRegisterEmail: action.data.email,
    userRegisterName: action.data.name,
    userRegisterPassword: action.data.password,
  };
}

function onRestorePageChange(
  action: { type: MainActionType.RESTORE_PAGE_CHANGE, email: string },
  state: IMainState,
): IMainState {
  return {
    ...state,
    userRestoreEmail: action.email,
  };
}

function onResetPageChange(
  action: { type: MainActionType.RESET_PAGE_CHANGE, code: string, password: string },
  state: IMainState,
): IMainState {
  return {
    ...state,
    userResetCode: action.code,
    userResetPassword: action.password,
  };
}

function onRegisterSuccess(
  action: { type: MainActionType.REGISTRATION_USER_SUCCESS, data: IApiRegisterUserResponse, password: string },
  state: IMainState,
): IMainState {
  return {
    ...state,
    isRegisterRequest: false,
    isRegisterSuccess: true,
    isRegisterFailed: false,
    isAuthorized: true,
    userEmail: action.data.user.email,
    userName: action.data.user.name,
    userPassword: action.password,
  };
}

function onLoginSuccess(
  action: { type: MainActionType.LOGIN_SUCCESS, data: IApiLoginResponse, password: string },
  state: IMainState,
): IMainState {
  return {
    ...state,
    isLoginRequest: false,
    isLoginSuccess: true,
    isLoginFailed: false,
    isAuthorized: true,
    userEmail: action.data.user.email,
    userName: action.data.user.name,
    userPassword: action.password,
  };
}

function onLoginPageChange(
  action: { type: MainActionType.LOGIN_PAGE_CHANGE, data: IApiLoginData },
  state: IMainState,
): IMainState {
  return {
    ...state,
    loginPageEmail: action.data.email,
    loginPagePassword: action.data.password,
  };
}

function onProfilePageLoad(
  action: { type: MainActionType.PROFILE_SUCCESS, data: IApiProfileData },
  state: IMainState,
): IMainState {
  return {
    ...state,
    isProfileSuccess: true,
    isProfileRequest: false,
    isProfileFail: false,
    profileEmail: action.data.email,
    profilePassword: action.data.password,
    profileName: action.data.name,
  };
}

function onProfilePageChange(
  action: { type: MainActionType.PROFILE_PAGE_CHANGE, data: IApiProfileData },
  state: IMainState,
): IMainState {
  return {
    ...state,
    profileEmail: action.data.email,
    profilePassword: action.data.password,
    profileName: action.data.name,
  };
}

function onProfilePageReset(
  action: { type: MainActionType.PROFILE_PAGE_RESET },
  state: IMainState,
): IMainState {
  return {
    ...state,
    profileEmail: state.userEmail,
    profilePassword: state.userPassword ?? '',
    profileName: state.userName,
  };
}