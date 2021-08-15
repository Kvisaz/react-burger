import React from 'react';
import { IAppState } from '../model/IAppState';
import { BurgerAction } from '../model/IBurgerAction';

interface IReducerState {
	state: IAppState;
	dispatch: React.Dispatch<BurgerAction>;
}

export const AppContext = React.createContext<IReducerState>({
	state: {
		isIngredientsLoaded: false,
		ingredients: [],
		ingredientAmountMap: {},
		selectedParts: [],
		sum: 0,
		isOrderWaiting: false,
		isOrderClicked: false
	},
	dispatch: () => {}
});