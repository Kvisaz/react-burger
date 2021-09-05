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

	userEmail?: string;
	userName?: string;
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
	needResetPassword?: boolean;
	needBackToMainPage?: boolean;
}


interface ITab {
	name: string;
}