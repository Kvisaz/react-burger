import { IBurgerPart } from '../../model/IBurgerPart';
import { API } from '../../services/ApiService';
import { logg } from '../../utils/log';

export enum IngredientActionType {
  DATA_REQUEST = 'DATA_REQUEST',
  DATA_LOADED = 'DATA_LOADED',
  DATA_FAILED = 'DATA_FAILED'
}

type IngredientDispatch = (action: IngredientAction) => any;

const initData = () => async (dispatch: IngredientDispatch) => {
  dispatch({ type: IngredientActionType.DATA_REQUEST });

  try {
    const { ingredients } = await API.getBurgerParts();
    logg('ingredients', ingredients);
    dispatch({ type: IngredientActionType.DATA_LOADED, ingredients });
  } catch (e: any) {
    dispatch({ type: IngredientActionType.DATA_FAILED, message: e.toString() });
  }
};

export const INGREDIENTS_ACTION = {
  initData,
};

export type IngredientAction =
  | { type: IngredientActionType.DATA_REQUEST }
  | { type: IngredientActionType.DATA_LOADED, ingredients: IBurgerPart[] }
  | { type: IngredientActionType.DATA_FAILED, message: string }
  | typeof initData