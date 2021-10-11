import { MainAction, MainActionType } from '../../actions';
import { IngredientsState, InitialIngredientsState } from './IngredientsState';
import { logg } from '../../utils/log';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IngredientStorage } from '../../services/IngredientStorage';

export function ingredientsReducer(state: IngredientsState = InitialIngredientsState, action: MainAction): IngredientsState {
  switch (action.type) {
    case MainActionType.DATA_REQUEST: {
      return {
        ...state,
        isIngredientsRequest: true,
      };
    }
    case MainActionType.DATA_FAILED : {
      return {
        ...state,
        isIngredientsRequest: false,
        isIngredientsLoaded: false,
        isIngredientsFailed: true,
      };
    }
    case MainActionType.DATA_LOADED:
      return onDataLoad(state, action);
    default:
      logg(`ingredientsReducer unknown action`, action);
      return {
        ...state,
      };
  }
}

function onDataLoad(
  state: IngredientsState,
  action: { type: MainActionType.DATA_LOADED; ingredients: IBurgerPart[]; isAuthorized: boolean },
): IngredientsState {

  const ingredients = action.ingredients.map(i => ({
    ...i,
    amount: 0,
  }));

  IngredientStorage.save(ingredients); // for use in other reducers

  return {
    ...state,
    ingredients,
    isIngredientsLoaded: true,
    isIngredientsRequest: false,
  };
}