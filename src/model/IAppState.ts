import {IBurgerPart} from './IBurgerPart';
import {IConstructorElementData} from './IConstructorElementData';
import {IApiOrderResult} from '../services/Api';

export interface IAppState {
    isIngredientsRequest: boolean;
    isIngredientsLoaded: boolean;
    isIngredientsFailed: boolean;
    ingredients: IBurgerPart[];
    ingredientAmountMap: Record<string, number>;

    sum: number;
    selectedBun?: IConstructorElementData;
    selectedParts: IConstructorElementData[];

    selectedIngredient?: IBurgerPart;
    orders: IApiOrderResult[];

    isOrderRequest: boolean;
    isOrderSuccess: boolean;
    isOrderFailed: boolean;

    currentTabIndex: number;
    tabs: ITab[];

    userRegisterEmail?: string;
    userRegisterName?: string;
    userRegisterPassword?: string;
    isRegisterRequest?: boolean;
    isRegisterSuccess?: boolean;
    isRegisterFailed?: boolean;

    isUserLogged?: boolean;
    urlAfterLogging?: string;

    loginPageEmail?: string;
    loginPagePassword?: string;
    isLoginRequest?: boolean;
    isLoginSuccess?: boolean;
    isLoginFailed?: boolean;

    isLogoutRequest?: boolean;
    isLogoutSuccess?: boolean;
    isLogoutFailed?: boolean;

    userForgotEmail?: string;
    isForgotRequest?: boolean;
    isForgotSuccess?: boolean;
    isForgotFailed?: boolean;

    userRestoreEmail?: string;
    isRestoreRequest?: boolean;
    isRestoreSuccess?: boolean;
    isRestoreFailed?: boolean;

    userResetCode?: string;
    userResetPassword?: string;
    isResetRequest?: boolean;
    isResetSuccess?: boolean;
    isResetFailed?: boolean;

    userPassword?: string;
    userTokenAuth?: string;
    isTokenAuthRequest?: boolean;
    isTokenAuthSuccess?: boolean;
    isTokenAuthFailed?: boolean;

    userTokenRefresh?: string;
    isTokenRefreshRequest?: boolean;
    isTokenRefreshSuccess?: boolean;
    isTokenRefreshFailed?: boolean;

    needAuthorization?: boolean;
    needBackToMainPage?: boolean;
}


interface ITab {
    name: string;
}