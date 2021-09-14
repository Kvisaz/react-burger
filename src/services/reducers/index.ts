import { IAppState } from '../../model/IAppState';
import { BurgerAction, IBurgerActionType, IRemovePayLoad } from '../actions';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { InitialAppState } from '../initialAppState';
import { nanoid } from 'nanoid';
import {
    IApiLoginData,
    IApiLoginResponse,
    IApiProfileData,
    IApiRegisterUserData,
    IApiRegisterUserResponse,
} from '../Api';


export function mainReducer(state: IAppState = InitialAppState, action: BurgerAction): IAppState {
	switch (action.type) {
		case IBurgerActionType.DATA_REQUEST: {
			return {
				...state,
				isIngredientsRequest: true,
			};
		}
		case IBurgerActionType.DATA_FAILED : {
			return {
				...state,
				isIngredientsRequest: false,
				isIngredientsLoaded: false,
				isIngredientsFailed: true,
			};
		}
		case IBurgerActionType.DATA_LOADED:
			return {
				...state,
				ingredients: action.ingredients.map(i => ({
					...i,
					amount: 0,
				})),
				isIngredientsLoaded: true,
				isIngredientsRequest: false,
			};
		case IBurgerActionType.ORDER_RESET:
			return {
				...state,
				isOrderRequest: false,
				isOrderSuccess: false,
				isOrderFailed: false,
			};
		case IBurgerActionType.ORDER_REQUEST:
			return {
				...state,
				isOrderRequest: true,
				isOrderSuccess: false,
				isOrderFailed: false,
			};
		case IBurgerActionType.ORDER_SUCCESS:
			return {
				...state,
				orders: [
					...state.orders,
					action.payload,
				],
				isOrderRequest: false,
				isOrderSuccess: true,
				ingredientAmountMap: {},
				selectedParts: [],
				selectedBun: undefined,
			};
		case IBurgerActionType.ORDER_FAILED:
			return {
				...state,
				isOrderRequest: false,
				isOrderFailed: true,
				isOrderSuccess: false,
			};
		case IBurgerActionType.INGREDIENT_ADD_TO_BASKET:
			return onSelectAction(action, state);
		case IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET:
			return onRemoveAction(action, state);
		case IBurgerActionType.TAB_SELECT:
			return {
				...state,
				currentTabIndex: action.index,
			};
		case IBurgerActionType.BASKET_ITEM_SWAP:
			return onBasketItemSwap(action, state);
		case IBurgerActionType.REGISTRATION_PAGE_CHANGE:
			return onRegisterPageChange(action, state);
		case IBurgerActionType.REGISTRATION_USER_REQUEST:
			return {
				...state,
				isRegisterRequest: true,
				isRegisterSuccess: false,
				isRegisterFailed: false,
			};
		case IBurgerActionType.REGISTRATION_USER_SUCCESS:
			return onRegisterSuccess(action, state);
		case IBurgerActionType.REGISTRATION_USER_FAIL:
			return {
				...state,
				isRegisterRequest: false,
				isRegisterSuccess: false,
				isRegisterFailed: true,
			};
		case IBurgerActionType.LOGIN_PAGE_CHANGE:
			return onLoginPageChange(action, state);
		case IBurgerActionType.LOGIN_REQUEST:
			return {
				...state,
				isLoginRequest: true,
				isLoginSuccess: false,
				isLoginFailed: false,
			};
		case IBurgerActionType.LOGIN_SUCCESS:
			return onLoginSuccess(action, state);
		case IBurgerActionType.LOGIN_FAIL:
			return {
				...state,
				isLoginRequest: false,
				isLoginSuccess: false,
				isLoginFailed: true,
				isAuthorized: false,
			};
		case IBurgerActionType.LOGOUT_REQUEST:
			return {
				...state,
				isLogoutRequest: true,
				isLogoutSuccess: false,
				isLogoutFailed: false,
			};
		case IBurgerActionType.LOGOUT_SUCCESS:
			return {
				...state,
				isLogoutRequest: false,
				isLogoutSuccess: true,
				isLogoutFailed: false,
				isAuthorized: false,
				isOrderRequest: false,
				isOrderSuccess: false,
				isOrderFailed: false,
			};
		case IBurgerActionType.LOGOUT_FAIL:
			return {
				...state,
				isLogoutRequest: false,
				isLogoutSuccess: false,
				isLogoutFailed: true,
			};
		case IBurgerActionType.RESTORE_PAGE_CHANGE:
			return onRestorePageChange(action, state);
		case IBurgerActionType.RESTORE_PASS_REQUEST:
			return {
				...state,
				isRestoreRequest: true,
			};
		case IBurgerActionType.RESTORE_PASS_SUCCESS:
			return {
				...state,
				isRestoreRequest: false,
				isRestoreSuccess: true,
				isRestoreFailed: false,
			};
		case IBurgerActionType.RESTORE_PASS_FAIL:
			return {
				...state,
				isRestoreRequest: false,
				isRestoreSuccess: false,
				isRestoreFailed: true,
			};
		case IBurgerActionType.RESET_PAGE_CHANGE:
			return onResetPageChange(action, state);
		case IBurgerActionType.RESET_PASS_REQUEST:
			return {
				...state,
				isResetRequest: true,
			};
		case IBurgerActionType.RESET_PASS_SUCCESS:
			return {
				...state,
				isResetRequest: false,
				isResetFailed: false,
				isResetSuccess: true,
				isRestoreSuccess: false,
			};
		case IBurgerActionType.RESET_PASS_FAIL:
			return {
				...state,
				isResetRequest: false,
				isResetFailed: true,
				isResetSuccess: false,
				isRestoreSuccess: false,
			};
		case IBurgerActionType.TOKEN_REFRESH_REQUEST:
			// TODO
			return {
				...state,
			};
		case IBurgerActionType.TOKEN_REFRESH_SUCCESS:
			// TODO
			return {
				...state,
			};
		case IBurgerActionType.TOKEN_REFRESH_FAIL:
			// TODO
			return {
				...state,
			};
		case IBurgerActionType.PROFILE_REQUEST:
			return {
				...state,
				isProfileRequest: true,
				isProfileSuccess: false,
				isProfileFail: false,
			};
		case IBurgerActionType.PROFILE_SUCCESS:
			return onProfilePageLoad(action, state);
		case IBurgerActionType.PROFILE_FAIL:
			return {
				...state,
				isProfileRequest: false,
				isProfileSuccess: false,
				isProfileFail: true,
			};

		case IBurgerActionType.PROFILE_PAGE_CHANGE:
			return onProfilePageChange(action, state);
		case IBurgerActionType.PROFILE_PAGE_RESET:
			return onProfilePageReset(action, state);

		case IBurgerActionType.PROFILE_UPDATE_REQUEST:
			return {
				...state,
				isProfileUpdateRequest: true,
				isProfileUpdateSuccess: false,
				isProfileUpdateFail: false,
			};
		case IBurgerActionType.PROFILE_UPDATE_SUCCESS:
			return {
				...state,
				isProfileUpdateRequest: false,
				isProfileUpdateSuccess: true,
				isProfileUpdateFail: false,
				userName: action.data.name,
				userPassword: '',
				userEmail: action.data.email,
			};
		case IBurgerActionType.PROFILE_UPDATE_FAIL:
			return {
				...state,
				isProfileUpdateRequest: false,
				isProfileUpdateSuccess: false,
				isProfileUpdateFail: true,
			};
		case IBurgerActionType.SAVE_AFTER_LOGGING_URL:
			return {
				...state,
				urlAfterLogging: action.url,
			};


        case IBurgerActionType.SET_MODAL_URL:
            return  {
                ...state,
                isModalUrl: action.isModal,
            }

		case IBurgerActionType.AUTH_CHECK_START:
			return {
				...state,
				isAuthorizationChecking: true,
			};
		case IBurgerActionType.AUTH_CHECK_END:
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

function onSelectAction(action: { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }, state: IAppState): IAppState {
	const selectedIngredient = action.ingredient;
	const isBun = selectedIngredient.type === 'bun';
	const constructorItem = mapBurgerItem(selectedIngredient);

	const selectedBun = isBun ? constructorItem : state.selectedBun;
	const selectedParts = isBun
		? state.selectedParts
		: [...state.selectedParts, constructorItem];

	let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
	if (selectedBun) sum += selectedBun.price * 2;

	const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

	return {
		...state,
		ingredientAmountMap,
		selectedBun,
		selectedParts,
		sum,
	};
}

function onRemoveAction(
	action: { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad },
	state: IAppState):
	IAppState {

	const { selectedId } = action.payload;
	const selectedParts = [...state.selectedParts.filter(p => p.selectedId !== selectedId)];
	const { selectedBun } = state;
	const bunSum = selectedBun === undefined ? 0 : selectedBun.price * 2;
	const sum = bunSum + selectedParts.reduce((acc, next) => acc + next.price, 0);

	const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

	return {
		...state,
		selectedParts,
		ingredientAmountMap,
		sum,
	};
}

function updateAmounts(selectedParts: IConstructorElementData[], bun?: IConstructorElementData): Record<string, number> {
	const amountMap: Record<string, number> = {};
	if (bun) {
		const ingredientId = bun.ingredientId;
		amountMap[ingredientId] = 2;
	}
	selectedParts.forEach(({ ingredientId }) => {
		if (amountMap[ingredientId] === undefined) amountMap[ingredientId] = 0;
		amountMap[ingredientId]++;
	});
	return amountMap;
}


function mapBurgerItem(data: IBurgerPart): IConstructorElementData {
	return setUniqueSelectorId({
		ingredientId: data._id, price: data.price, text: data.name, thumbnail: data.image,
		selectedId: data._id,
	});
}

function setUniqueSelectorId(data: IConstructorElementData): IConstructorElementData {
	return {
		...data,
		selectedId: nanoid(),
	};
}

function onBasketItemSwap(
	action: { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string },
	state: IAppState,
): IAppState {
	const { selectedId1, selectedId2 } = action;
	const { selectedParts } = state;
	const results = selectedParts.slice();
	const item1index = selectedParts.findIndex(item => item.selectedId === selectedId1);
	const item2index = selectedParts.findIndex(item => item.selectedId === selectedId2);
	if (item1index > -1 && item2index > -1) {
		results[item2index] = selectedParts[item1index];
		results[item1index] = selectedParts[item2index];
	} else {
		console.warn(`cannot find ${selectedId1}, ${selectedId2} in `, selectedParts);
	}
	return {
		...state,
		selectedParts: results,
	};
}

function onRegisterPageChange(
	action: { type: IBurgerActionType.REGISTRATION_PAGE_CHANGE, data: IApiRegisterUserData },
	state: IAppState,
): IAppState {
	return {
		...state,
		userRegisterEmail: action.data.email,
		userRegisterName: action.data.name,
		userRegisterPassword: action.data.password,
	};
}

function onRestorePageChange(
	action: { type: IBurgerActionType.RESTORE_PAGE_CHANGE, email: string },
	state: IAppState,
): IAppState {
	return {
		...state,
		userRestoreEmail: action.email,
	};
}

function onResetPageChange(
	action: { type: IBurgerActionType.RESET_PAGE_CHANGE, code: string, password: string },
	state: IAppState,
): IAppState {
	return {
		...state,
		userResetCode: action.code,
		userResetPassword: action.password,
	};
}

function onRegisterSuccess(
	action: { type: IBurgerActionType.REGISTRATION_USER_SUCCESS, data: IApiRegisterUserResponse, password: string },
	state: IAppState,
): IAppState {
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
	action: { type: IBurgerActionType.LOGIN_SUCCESS, data: IApiLoginResponse, password: string },
	state: IAppState,
): IAppState {
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
	action: { type: IBurgerActionType.LOGIN_PAGE_CHANGE, data: IApiLoginData },
	state: IAppState,
): IAppState {
	return {
		...state,
		loginPageEmail: action.data.email,
		loginPagePassword: action.data.password,
	};
}

function onProfilePageLoad(
	action: { type: IBurgerActionType.PROFILE_SUCCESS, data: IApiProfileData },
	state: IAppState,
): IAppState {
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
	action: { type: IBurgerActionType.PROFILE_PAGE_CHANGE, data: IApiProfileData },
	state: IAppState,
): IAppState {
	return {
		...state,
		profileEmail: action.data.email,
		profilePassword: action.data.password,
		profileName: action.data.name,
	};
}

function onProfilePageReset(
	action: { type: IBurgerActionType.PROFILE_PAGE_RESET },
	state: IAppState,
): IAppState {
	return {
		...state,
		profileEmail: state.userEmail,
		profilePassword: state.userPassword ?? '',
		profileName: state.userName,
	};
}