import {IBurgerPart} from '../model/IBurgerPart';

export class Api {
    constructor(private readonly endpoints: IApiEndpoints) {
    }

    async getBurgerParts(): Promise<IngredientsResponse> {
        return this.fetch<any, IApiIngredientsResponse>(this.endpoints.ingredients)
            .then(data => ({
                ingredients: data.data
            }))
    }

    async order(selectedIds: string[]): Promise<IApiOrderResult> {
        const data: IApiOrderConfig = {
            ingredients: selectedIds,
        };
        return this.fetch<IApiOrderConfig, IApiOrderResponse>(this.endpoints.order, data)
            .then(data => ({
                name: data.name,
                orderId: data.order.number
            }));
    }

    async registerUser(data: IApiRegisterUserData): Promise<boolean> {
        return this
            .fetch<IApiRegisterUserData, IApiRegisterUserResponse>(this.endpoints.registerUser, data)
            .then(() => true);
    }

    async restorePassword(data: IApiRestorePasswordData): Promise<boolean> {
        return this
            .fetch<IApiRestorePasswordData, IApiRestorePasswordResponse>(this.endpoints.restorePassword, data)
            .then(() => true);
    }

    async resetPassword(data: IApiResetPasswordData): Promise<boolean> {
        return this
            .fetch<IApiResetPasswordData, IApiResetPasswordResponse>(this.endpoints.resetPassword, data)
            .then(() => true);
    }

    async login(data: IApiLoginData): Promise<boolean> {
        return this
            .fetch<IApiLoginData, IApiLoginResponse>(this.endpoints.login, data)
            .then(() => true);
    }

    private async fetch<Data, Response extends IApiResponse>(endPoint: string, data?: Data): Promise<Response> {
        const fetchOptions = data == null
            ? {}
            : {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }

        return fetch(endPoint, fetchOptions)
            .then(apiResponse => {
                if (apiResponse.ok) {
                    return apiResponse.json()
                } else {
                    return Promise.reject('apiResponse not ok')
                }
            })
            .then((data: Response) => {
                if (data.success) return data;
                else return Promise.reject('data is not success');
            })
    }
}

export interface IApiEndpoints extends Record<string, string> {
    ingredients: string;
    order: string;
    registerUser: string;
    restorePassword: string;
    resetPassword: string;
    login: string;
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
    login: string;
    password: string;
}

export interface IApiLoginResponse {
    success: boolean;
    message: string; // "Password successfully reset"
}