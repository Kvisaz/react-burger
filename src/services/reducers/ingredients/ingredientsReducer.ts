import { BurgerAction, IBurgerActionType } from '../../actions';
import { IngredientsState, InitialIngredientsState } from './IngredientsState';
import { logg } from '../../utils/log';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IngredientService } from '../connectors/IngredientService';

export function ingredientsReducer(state: IngredientsState = InitialIngredientsState, action: BurgerAction): IngredientsState {
  switch (action.type) {
    case IBurgerActionType.DATA_REQUEST: {
      return {
        ...state,
        isIngredientsRequest: true,
      };
    }
    case IBurgerActionType.DATA_FAILED : {
      return {
        ...state,
        isIngredientsRequest: false,
        isIngredientsLoaded: false,
        isIngredientsFailed: true,
      };
    }
    case IBurgerActionType.DATA_LOADED:
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
  action: { type: IBurgerActionType.DATA_LOADED; ingredients: IBurgerPart[]; isAuthorized: boolean },
): IngredientsState {

  const ingredients = action.ingredients.map(i => ({
    ...i,
    amount: 0,
  }));

  IngredientService.save(ingredients); // for use in other reducers

  return {
    ...state,
    ingredients,
    isIngredientsLoaded: true,
    isIngredientsRequest: false,
  };
}