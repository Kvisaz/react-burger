import { IBurgerPart } from '../../model/IBurgerPart';

export interface IngredientsState {
  isIngredientsRequest: boolean;
  isIngredientsLoaded: boolean;
  isIngredientsFailed: boolean;
  ingredients: IBurgerPart[];
}

export const InitialIngredientsState: IngredientsState = {
  isIngredientsRequest: false,
  isIngredientsFailed: false,
  isIngredientsLoaded: false,
  ingredients: [],
}