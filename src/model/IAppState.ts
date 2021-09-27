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

    isAuthorized?: boolean;
    isAuthorizationChecking?: boolean;
    isNoRefreshToken?: boolean;
    urlAfterLogging?: string;

    isModalUrl?: boolean;
    
    loginPageEmail?: string;
    loginPagePassword?: string;
    isLoginRequest?: boolean;
    isLoginSuccess?: boolean;
    isLoginFailed?: boolean;

    isLogoutRequest?: boolean;
    isLogoutSuccess?: boolean;
    isLogoutFailed?: boolean;

    userRestoreEmail?: string;
    isRestoreRequest?: boolean;
    isRestoreSuccess?: boolean;
    isRestoreFailed?: boolean;

    userResetCode?: string;
    userResetPassword?: string;
    isResetRequest?: boolean;
    isResetSuccess?: boolean;
    isResetFailed?: boolean;

    userTokenAuth?: string;
    isTokenAuthRequest?: boolean;
    isTokenAuthSuccess?: boolean;
    isTokenAuthFailed?: boolean;

    userTokenRefresh?: string;
    isTokenRefreshRequest?: boolean;
    isTokenRefreshSuccess?: boolean;
    isTokenRefreshFailed?: boolean;

    needBackToMainPage?: boolean;

    isProfileRequest?: boolean;
    isProfileSuccess?: boolean;
    isProfileFail?: boolean;

    userName?:string;
    userPassword?: string;
    userEmail?:string;

    profileName?: string;
    profileEmail?: string;
    profilePassword?: string;

    isProfileUpdateRequest?: boolean;
    isProfileUpdateSuccess?: boolean;
    isProfileUpdateFail?: boolean;
}


interface ITab {
    name: string;
}