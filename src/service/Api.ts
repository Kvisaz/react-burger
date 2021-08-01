import {IBurgerPart} from "../model/IBurgerPart";

export class Api {
    constructor(private readonly endpoint: string) {
    }

    async getBurgerParts(): Promise<IBurgerPartsResponse> {
        const response: IBurgerPartsResponse = {
            data: [],
        }
        try {
            const apiResponse = await fetch(this.endpoint);
            if (!apiResponse.ok) throw new Error('api error');
            const apiJson = await apiResponse.json() as IApiEndPointResponse;
            if (!apiJson.success) throw new Error('apiJson error');
            response.data = apiJson.data;
        } catch (e) {
            response.error = e;
        }
        return response;
    }
}

export interface IApiEndPointResponse {
    success: boolean;
    data: IBurgerPart[];
}

export interface IBurgerPartsResponse {
    error?: string;
    data: IBurgerPart[];
}