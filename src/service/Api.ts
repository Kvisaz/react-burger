import {IBurgerPart} from "../model/IBurgerPart";

export class Api {
    constructor(private readonly endpoint: string) {
    }

    async getBurgerParts(): Promise<IBurgerPartsResponse> {
        const response: IBurgerPartsResponse = {
            data: [],
            success: true,
        }
        try {
            const apiResponse = await fetch(this.endpoint);
            if (!apiResponse.ok) throw new Error('api error');
            const data = await apiResponse.json() as IBurgerPartsResponse;
            response.data = data.data;
            response.success = data.success;
            if (!data.success) throw new Error('data error');
        } catch (e) {
            response.success = false;
            response.error = e;
        }
        return response;
    }
}

export interface IBurgerPartsResponse {
    success: boolean;
    error?: string;
    data: IBurgerPart[];
}