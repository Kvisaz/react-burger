import { IBurgerPart } from '../model/IBurgerPart';
import {
	deleteTokenCookies,
	getTokenAuth,
	getTokenRefresh,
	setTokenAuthCookie,
	setTokenRefreshCookie,
} from './cookieTokens';

export class Api {
	constructor(private readonly endpoints: IApiEndpoints) {
	}

	async getBurgerParts(): Promise<IngredientsResponse> {
		return fetch(this.endpoints.ingredients)
			.then(apiResponse => this.checkResponse<IApiIngredientsResponse>(apiResponse))
			.then((data: IApiIngredientsResponse) => ({
				ingredients: data.data,
			}));
	}

	async order(selectedIds: string[]): Promise<IApiOrderResult> {
		const data: IApiOrderConfig = {
			ingredients: selectedIds,
		};
		return this.fetchPost<IApiOrderConfig, IApiOrderResponse>(this.endpoints.order, data)
			.then(data => ({
				name: data.name,
				orderId: data.order.number,
			}));
	}

	async registerUser(data: IApiRegisterUserData): Promise<IApiRegisterUserResponse> {
		return this
			.fetchPost<IApiRegisterUserData, IApiRegisterUserResponse>(this.endpoints.registerUser, data)
			.then(response => {
				const { accessToken, refreshToken } = response;
				setTokenAuthCookie(accessToken.split(' ')[1]);
				setTokenRefreshCookie(refreshToken);
				return response;
			})
			.catch(e => {
				console.warn(e);
				return Promise.reject(e);
			});
	}

	async restorePassword(data: IApiRestorePasswordData): Promise<IApiRestorePasswordResponse> {
		return fetch(this.endpoints.restorePassword, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + getTokenAuth(),
			},
			body: JSON.stringify(data),
		}).then(apiResponse => this.checkResponse<IApiRestorePasswordResponse>(apiResponse));
	}

	async resetPassword(data: IApiResetPasswordData): Promise<IApiResetPasswordResponse> {
		return this
			.fetchPost<IApiResetPasswordData, IApiResetPasswordResponse>(this.endpoints.resetPassword, data);
	}

	async login(data: IApiLoginData): Promise<IApiLoginResponse> {
		return this.fetchPost<IApiLoginData, IApiLoginResponse>(this.endpoints.login, data)
			.then(response => {
				const { accessToken, refreshToken } = response;
				setTokenAuthCookie(accessToken.split(' ')[1]);
				setTokenRefreshCookie(refreshToken);
				return response;
			})
			.catch(e => {
				console.warn(e);
				return Promise.reject(e);
			});
	}

	async logout(): Promise<IApiLogoutResponse> {
		const data: IApiLogoutData = {
			token: getTokenRefresh() ?? '',
		};
		return this.fetchPost<IApiLogoutData, IApiLogoutResponse>(this.endpoints.logout, data)
			.then(response => {
				deleteTokenCookies();
				return response;
			});
	}

	async refreshToken(data: IApiTokenData): Promise<IApiTokenResponse> {
		return this.fetchPost<IApiTokenData, IApiTokenResponse>(this.endpoints.token, data);
	}

	async getProfile(): Promise<IApiUserProfileResponse> {
		return fetch(this.endpoints.userData, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + getTokenAuth(),
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		}).then(apiResponse => this.checkResponse<IApiUserProfileResponse>(apiResponse));
	}

	async patchProfile(data: IApiUserProfilePatchData): Promise<IApiUserProfileResponse> {
		return fetch(this.endpoints.userData, {
			method: 'PATCH',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + getTokenAuth(),
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data),
		}).then(apiResponse => this.checkResponse<IApiUserProfileResponse>(apiResponse));
	}

	private async fetchPost<Data, Response extends IApiResponse>(endPoint: string, data: Data): Promise<Response> {
		return fetch(endPoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(apiResponse => this.checkResponse(apiResponse));
	}

	private async checkResponse<T extends IApiResponse>(apiResponse: Response): Promise<T> {
		if (!apiResponse.ok) return Promise.reject('apiResponse not ok');

		return apiResponse.json()
			.then((data: T) => {
				if (data.success) return data;
				else return Promise.reject('apiResponse data is not success');
			});
	}
}

export interface IApiEndpoints extends Record<string, string> {
	ingredients: string;
	order: string;
	registerUser: string;
	restorePassword: string;
	resetPassword: string;
	login: string;
	logout: string;
	token: string;
	userData: string;
}

export interface IApiResponse {
	success?: boolean;
}

export interface IApiIngredientsResponse {
	success: boolean;
	data: IBurgerPart[];
}

export interface IngredientsResponse {
	ingredients: IBurgerPart[];
}

export interface IApiOrderConfig {
	ingredients: string[]; // ingredients ids
}

export interface IApiOrderResponse {
	name: string; // "Краторный метеоритный бургер",
	order: { number: number };
	success: boolean;
}

export interface IApiOrderResult {
	name: string; // "Краторный метеоритный бургер",
	orderId: number;
}

export interface IApiRegisterUserData {
	email: string;
	password: string;
	name: string;
}

export interface IApiRegisterUserResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string; // "Bearer ...",
	refreshToken: string;
}

export interface IApiTokenData {
	token: string; // {{refreshToken}}
}

export interface IApiGetProfileData {
	authorization: string; // token
}

export interface IApiTokenResponse {
	success: boolean;
	accessToken: string; // "Bearer ...",
	refreshToken: string;
}

export interface IApiUserProfileResponse {
	success: boolean;
	user: {
		name: string;
		email: string;
	}
}

export interface IApiUserProfilePatchData {
	email: string;
	password: string;
	name: string;
}

export interface IApiRestorePasswordData {
	email: string;
}

export interface IApiRestorePasswordResponse {
	success: boolean;
	message: string; // "Reset email sent"
}


export interface IApiResetPasswordData {
	password: string;
	token: string;
}

export interface IApiResetPasswordResponse {
	success: boolean;
	message: string; // "Password successfully reset"
}

export interface IApiLoginData {
	email: string;
	password: string;
}


export interface IApiProfileData {
	email: string;
	password: string;
	name: string;
}


export interface IApiLoginResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	}
	message: string; // "Password successfully reset"
}


export interface IApiLogoutData {
	token: string;
}

export interface IApiLogoutResponse {
	success: boolean;
	message: string; // "Successful logout"
}