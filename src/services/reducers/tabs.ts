import { TabAction, TabActionType } from '../actions/tabs';

export interface ITabState {
	tabIndex: TabActionType
}

export const InitialTabState: ITabState = {
	tabIndex: TabActionType.BUNS_SELECT,
};

export function tabsReducer(state: ITabState = InitialTabState, action: TabAction): ITabState {
	switch (action.type) {
		case TabActionType.BUNS_SELECT:
			return {
				...state,
				tabIndex: TabActionType.BUNS_SELECT,
			};
		case TabActionType.FILLS_SELECT:
			return {
				...state,
				tabIndex: TabActionType.FILLS_SELECT,
			};
		case TabActionType.SAUCES_SELECT:
			return {
				...state,
				tabIndex: TabActionType.SAUCES_SELECT,
			};
		default:
			console.warn('unknown action', action)
			return {
				...state
			}

	}
}