import { combineReducers } from 'redux';

import { IMainState, mainReducer } from './main';
import { ingredientsReducer, IngredientsState } from './ingredients';
import { IOrderState, ordersReducer } from './orders';

export type { IMainState } from './main';

export type { IngredientsState } from './ingredients';

export const rootReducer = combineReducers({
  main: mainReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
});

export interface IRootState {
  main: IMainState;
  ingredients: IngredientsState;
  orders: IOrderState;
}