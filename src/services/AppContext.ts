import React from 'react';
import { IAppState } from '../model/IAppState';
import { BurgerAction } from './actions';
import { InitialAppState } from './initialAppState';

interface IReducerState {
	state: IAppState;
	dispatch: React.Dispatch<BurgerAction>;
}

export const AppContext = React.createContext<IReducerState>({
	state: InitialAppState,
	dispatch: () => {}
});