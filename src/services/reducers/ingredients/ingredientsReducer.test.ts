import { ingredientsReducer } from './ingredientsReducer';
import { InitialIngredientsState } from './IngredientsState';
import { IngredientActionType } from '../../actions';

import mockIngredients from '../../mock/ingredients.json';

const ingredients = mockIngredients;
const reducer = ingredientsReducer;
const initialState = InitialIngredientsState;

describe('ingredients reducer', ()=>{
  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set isIngredientsRequest', () => {
    // @ts-ignore
    expect(reducer(initialState, { type: IngredientActionType.DATA_REQUEST})).toEqual({
      ...initialState,
      isIngredientsRequest: true,
    })
  })

  it('should set isIngredientsRequest', () => {
    // @ts-ignore
    expect(reducer(initialState, { type: IngredientActionType.DATA_FAILED})).toEqual({
      ...initialState,
      isIngredientsRequest: false,
      isIngredientsLoaded: false,
      isIngredientsFailed: true,
    })
  })

  it('should set ingredients', () => {

    const countedIngredients = ingredients.map(i => ({
      ...i,
      amount: 0,
    }));

    // @ts-ignore
    expect(reducer(initialState, { type: IngredientActionType.DATA_LOADED, ingredients})).toEqual({
      ...initialState,
      ingredients: countedIngredients,
      isIngredientsLoaded: true,
      isIngredientsRequest: false,
    })
  })

})
