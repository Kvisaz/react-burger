import {IBurgerPart} from '../model/IBurgerPart';
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
                const {accessToken, refreshToken} = response;
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
                Authorization: getTokenAuth() ?? '',
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
                const {accessToken, refreshToken} = response;
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

    async refreshToken(): Promise<IApiTokenResponse> {
        const refreshToken = getTokenRefresh();
        if (refreshToken == null) return Promise.reject('no refresh token');
        return this.fetchPost<IApiTokenData, IApiTokenResponse>(this.endpoints.token, {token: refreshToken})
            .then(result => {
                setTokenAuthCookie(result.accessToken);
                setTokenRefreshCookie(result.refreshToken);
                return result;
            });
    }

    async getProfile(): Promise<IApiUserProfileResponse> {
        try {
            let responseBody = await this.fetchProfile();
            if (!responseBody.success) {
                const {message} = responseBody;
                console.log('responseBody not success', message)
                if (isBadToken(message)) {
                    console.log('invalid token')
                    const {accessToken} = await this.refreshToken();
                    if (accessToken) {
                        console.log('token refreshed ', accessToken);
                        responseBody = await this.fetchProfile();
                    }
                } else return Promise.reject(message);
            }
            return responseBody;
        } catch (e) {
            console.warn(e);
            return Promise.reject(e);
        }
    }

    private async fetchProfile(): Promise<IApiUserProfileResponse> {
        try {
            const apiResponse = await fetch(this.endpoints.userData, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: getTokenAuth() ?? '',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            });
            console.log('fetchProfile apiResponse', apiResponse);
            const responseBody = await apiResponse.json();
            console.log('fetchProfile response body', responseBody);
            return responseBody;
        } catch (e) {
            console.warn(e);
            return Promise.reject(e);
        }
    }

    async patchProfile(data: IApiUserProfilePatchData): Promise<IApiUserProfileResponse> {
        try {
            let responseBody = await this.fetchPatchProfile(data);
            if (!responseBody.success) {
                const {message} = responseBody;
                console.log('responseBody not success', message)
                if (isBadToken(message)) {
                    console.log('invalid token')
                    const {accessToken} = await this.refreshToken();
                    if (accessToken) {
                        console.log('token refreshed ', accessToken);
                        responseBody = await this.fetchPatchProfile(data);
                    }
                } else return Promise.reject(message);
            }
            return responseBody;
        } catch (e) {
            console.warn(e);
            return Promise.reject(e);
        }
    }

    private async fetchPatchProfile(data: IApiUserProfilePatchData): Promise<IApiUserProfileResponse> {
        return fetch(this.endpoints.userData, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                Authorization: getTokenAuth() ?? '',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        }).then(apiResponse => {
            console.log('patchProfile ', apiResponse)
            return apiResponse.json();
        });
    }

    async checkAuth(): Promise<IApiAuthCheckResult> {
        let isAuthorized = false;
        try {
            const refreshToken = getTokenRefresh();
            const authToken = getTokenAuth();

            isAuthorized = refreshToken != null && authToken != null;

            console.log('refreshToken ', refreshToken);
            console.log('authToken ', authToken);

            if (refreshToken && authToken == null) {
                console.log('try to refresh access token');
                await this.refreshToken();
                isAuthorized = true;
            }
        } catch (e) {
            console.warn(e)
        }
        return {
            isAuthorized,
        };
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

function isBadToken(message: string | undefined) {
    return message === 'invalid token' || message === 'jwt expire' || message === 'invalid algorithm';
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
    message?: string;
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

export interface IApiAuthCheckResult {
    isAuthorized: boolean
}