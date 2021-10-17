import { loggOff } from '../../utils/log';
import { IMainState, InitialMainState } from './IMainState';
import { mainReducer } from './mainReducer';
import { MainAction, MainActionType } from '../../actions';

const INITIAL_STATE = InitialMainState;
const reducer = mainReducer;

describe('order feed reducer', () => {
  loggOff();

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should TAB_SELECT', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = { type: MainActionType.TAB_SELECT, index: 1 };
    const state2: IMainState = {
      ...INITIAL_STATE,
      currentTabIndex: action.index,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

  it('should REGISTRATION_PAGE_CHANGE', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.REGISTRATION_PAGE_CHANGE, data: {
        email: 'test@test.ru',
        password: '123',
        name: 'Vasya',
      },
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      userRegisterEmail: action.data.email,
      userRegisterName: action.data.name,
      userRegisterPassword: action.data.password,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should REGISTRATION_USER_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.REGISTRATION_USER_REQUEST, data: {
        email: 'test@test.ru',
        password: '123',
        name: 'Vasya',
      },
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRegisterRequest: true,
      isRegisterSuccess: false,
      isRegisterFailed: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should REGISTRATION_USER_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.REGISTRATION_USER_SUCCESS, data: {
        success: true,
        user: {
          email: 'test@test.ru',
          name: 'Vasya',
        },
        accessToken: 'Bearer 3232',
        refreshToken: '2121212',
      },
      password: '9345',
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRegisterRequest: false,
      isRegisterSuccess: true,
      isRegisterFailed: false,
      isAuthorized: true,
      userEmail: action.data.user.email,
      userName: action.data.user.name,
      userPassword: action.password,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

  it('should REGISTRATION_USER_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.REGISTRATION_USER_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRegisterRequest: false,
      isRegisterSuccess: false,
      isRegisterFailed: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

  it('should LOGIN_PAGE_CHANGE', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGIN_PAGE_CHANGE, data: {
        email: 'test@te4st.ru',
        password: '212121',
      },

    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      loginPageEmail: action.data.email,
      loginPagePassword: action.data.password,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGIN_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGIN_REQUEST,
      data: {
        email: 'test@te4st.ru',
        password: '212121',
      },
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLoginRequest: true,
      isLoginSuccess: false,
      isLoginFailed: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGIN_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGIN_SUCCESS,
      data: {
        success: true,
        accessToken: 'Bearer 21212',
        refreshToken: 'w12w1nsas',
        user: {
          email: 'test@test.ru',
          name: 'sasha',
        },
        message: 'Password successfully reset',
      },
      password: '2121212',
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLoginRequest: false,
      isLoginSuccess: true,
      isLoginFailed: false,
      isAuthorized: true,
      userEmail: action.data.user.email,
      userName: action.data.user.name,
      userPassword: action.password,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGIN_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGIN_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginFailed: true,
      isAuthorized: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGOUT_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGOUT_REQUEST,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLogoutRequest: true,
      isLogoutSuccess: false,
      isLogoutFailed: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGOUT_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGOUT_SUCCESS,
      data: {
        success: true,
        message: 'Successful logout',
      },
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLogoutRequest: false,
      isLogoutSuccess: true,
      isLogoutFailed: false,
      isAuthorized: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should LOGOUT_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.LOGOUT_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isLogoutRequest: false,
      isLogoutSuccess: false,
      isLogoutFailed: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should RESTORE_PAGE_CHANGE', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESTORE_PAGE_CHANGE,
      email: 'e@e.com'
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      userRestoreEmail: action.email,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should RESTORE_PASS_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESTORE_PASS_REQUEST,
      data: {
        email: 'e@e.com'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRestoreRequest: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should RESTORE_PASS_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESTORE_PASS_SUCCESS,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRestoreRequest: false,
      isRestoreSuccess: true,
      isRestoreFailed: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

  it('should RESTORE_PASS_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESTORE_PASS_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isRestoreRequest: false,
      isRestoreSuccess: false,
      isRestoreFailed: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should RESET_PAGE_CHANGE', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESET_PAGE_CHANGE,
      code: '212121', password: 'dsddsds121'
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      userResetCode: action.code,
      userResetPassword: action.password,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should RESET_PASS_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESET_PASS_REQUEST,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isResetRequest: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should RESET_PASS_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESET_PASS_SUCCESS,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isResetRequest: false,
      isResetFailed: false,
      isResetSuccess: true,
      isRestoreSuccess: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should RESET_PASS_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.RESET_PASS_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isResetRequest: false,
      isResetFailed: true,
      isResetSuccess: false,
      isRestoreSuccess: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

  it('should TOKEN_REFRESH_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.TOKEN_REFRESH_REQUEST,
      data: {
        token: 'dsdsd'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should TOKEN_REFRESH_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.TOKEN_REFRESH_SUCCESS,
      data: {
        success: true,
        accessToken: 'Bearer 12121',
        refreshToken: 'dsdsdsd'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should TOKEN_REFRESH_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.TOKEN_REFRESH_FAIL
    };
    const state2: IMainState = {
      ...INITIAL_STATE
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_REQUEST
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileRequest: true,
      isProfileSuccess: false,
      isProfileFail: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_SUCCESS,
      data: {
        email: 'vas@vas.com',
        name: 'Vasya',
        password: '21212'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileSuccess: true,
      isProfileRequest: false,
      isProfileFail: false,
      profileEmail: action.data.email,
      profilePassword: action.data.password,
      profileName: action.data.name,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileRequest: false,
      isProfileSuccess: false,
      isProfileFail: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_PAGE_CHANGE', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_PAGE_CHANGE,
      data: {
        email: 'vas@vas.com',
        name: 'Vasya',
        password: '21212'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      profileEmail: action.data.email,
      profilePassword: action.data.password,
      profileName: action.data.name,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should PROFILE_PAGE_RESET', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_PAGE_RESET,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      profileEmail: state1.userEmail,
      profilePassword: state1.userPassword ?? '',
      profileName: state1.userName,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_UPDATE_REQUEST', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_UPDATE_REQUEST,
      data: {
        email: 'vas@vas.com',
        name: 'Vasya',
        password: '21212'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileUpdateRequest: true,
      isProfileUpdateSuccess: false,
      isProfileUpdateFail: false,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should PROFILE_UPDATE_SUCCESS', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_UPDATE_SUCCESS,
      data: {
        email: 'vas@vas.com',
        name: 'Vasya',
        password: '21212'
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileUpdateRequest: false,
      isProfileUpdateSuccess: true,
      isProfileUpdateFail: false,
      userName: action.data.name,
      userPassword: '',
      userEmail: action.data.email,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should PROFILE_UPDATE_FAIL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.PROFILE_UPDATE_FAIL,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isProfileUpdateRequest: false,
      isProfileUpdateSuccess: false,
      isProfileUpdateFail: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should SAVE_AFTER_LOGGING_URL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.SAVE_AFTER_LOGGING_URL,
      url: 'testUrl'
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      urlAfterLogging: action.url,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });



  it('should SET_MODAL_URL', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.SET_MODAL_URL,
      isModal: true
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isModalUrl: action.isModal,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should AUTH_CHECK_START', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.AUTH_CHECK_START,
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isAuthorizationChecking: true,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });


  it('should AUTH_CHECK_END', () => {
    const state1 = {
      ...INITIAL_STATE,
    };
    const action: MainAction = {
      type: MainActionType.AUTH_CHECK_END,
      data: {
        isAuthorized: true
      }
    };
    const state2: IMainState = {
      ...INITIAL_STATE,
      isAuthorizationChecking: false,
      isAuthorized: action.data.isAuthorized,
    };

    expect(reducer(state1, action)).toEqual(state2);
  });

});