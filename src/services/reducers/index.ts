import { combineReducers } from 'redux';

import { IMainState, mainReducer } from './main';
import { ingredientsReducer, IngredientsState } from './ingredients';
import { IOrderState, ordersFeedReducer } from './orders-feed';

export type { IMainState } from './main';

export type { IngredientsState } from './ingredients';

export const rootReducer = combineReducers({
  main: mainReducer,
  ingredients: ingredientsReducer,
  orders: ordersFeedReducer,
});

export interface IRootState {
  main: IMainState;
  ingredients: IngredientsState;
  orders: IOrderState;
}