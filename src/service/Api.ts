import {IBurgerPart} from "../model/IBurgerPart";
import MOCK_JSON from '../utils/data.json'

export class Api {
    async getBurgerParts(): Promise<IBurgerPartsResponse> {
        const response: IBurgerPartsResponse = {
            data: []
        }
        // test purpose only
        await delay(1000);
        try {
            response.data = MOCK_JSON;
        } catch (e) {
            response.error = e;
        }
        return response;
    }
}

export interface IBurgerPartsResponse {
    error?: string;
    data: IBurgerPart[];
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}