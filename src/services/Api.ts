import { IBurgerPart } from '../model/IBurgerPart';

export class Api {
	constructor(private readonly dataEndPoint: string, private readonly orderEndPoint: string) {
	}

	async getBurgerParts(): Promise<IBurgerPartsResponse> {
		const response: IBurgerPartsResponse = {
			data: [],
		};
		try {
			const apiResponse = await fetch(this.dataEndPoint);
			if (!apiResponse.ok) throw new Error('api error');
			const apiJson = await apiResponse.json() as IApiEndPointResponse;
			if (!apiJson.success) throw new Error('apiJson error');
			response.data = apiJson.data;
		} catch (e) {
			throw e;
		}
		return response;
	}

	async order(selectedIds: string[]): Promise<IApiOrderResult> {
		const orderConfig: IApiOrderConfig = {
			ingredients: selectedIds,
		};

		const response: IApiOrderResult = {
			name: '',
			orderId: 0,
		};

		try {
			const apiResponse = await fetch(this.orderEndPoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderConfig),
			});

			if (!apiResponse.ok) throw new Error('api order error');
			const apiJson: IApiOrderResponse = await apiResponse.json() as IApiOrderResponse;
			if (!apiJson.success) throw new Error('api order json error');
			response.name = apiJson.name;
			response.orderId = apiJson.order.number;
		} catch (e) {
			throw e;
		}
		return response;
	}
}

export interface IApiEndPointResponse {
	success: boolean;
	data: IBurgerPart[];
}


export interface IBurgerPartsResponse {
	data: IBurgerPart[];
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