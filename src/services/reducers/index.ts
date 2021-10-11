import { combineReducers } from 'redux';

import { IMainState, mainReducer } from './main';
import { ingredientsReducer, IngredientsState } from './ingredients';

export type { IMainState } from './main';

export type { IngredientsState } from './ingredients';

export const rootReducer = combineReducers({
  main: mainReducer,
  ingredients: ingredientsReducer,
});

export interface IRootState {
  main: IMainState;
  ingredients: IngredientsState;
}