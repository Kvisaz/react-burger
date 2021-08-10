import React from 'react';
import { IAppState } from '../model/IAppState';
import { IBurgerAction } from '../model/IBurgerAction';

interface IReducerState {
	state: IAppState;
	dispatch?: React.Dispatch<IBurgerAction>;
}

export const AppContext = React.createContext<IReducerState>({
	state: {
		loaded: false,
		ingredients: [],
		selectedParts: [],
		sum: 0,
	},
});