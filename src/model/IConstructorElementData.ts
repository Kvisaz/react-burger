export interface IConstructorElementData {
	ingredientId: string;
	selectedId: string;
	type?: IConstructorElementType;
	isLocked?: boolean;
	handleClose?: () => void;
	text: string;
	thumbnail: string;
	price: number;
}

export enum IConstructorElementType {
	TOP = 'top',
	BOTTOM = 'bottom',
}