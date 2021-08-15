export type TabAction =
	| { type: TabActionType.BUNS_SELECT }
	| { type: TabActionType.FILLS_SELECT }
	| { type: TabActionType.SAUCES_SELECT }


export enum TabActionType {
	BUNS_SELECT = 'BUNS_SELECT',
	FILLS_SELECT = 'FILLS_SELECT',
	SAUCES_SELECT = 'SAUCES_SELECT',
}