import mockIngredients from '../../mock/ingredients.json';
import { ordersReducer } from './ordersReducer';
import { InitialOrdersFeedState } from './ordersState';
import { IRemovePayLoad, OrderActionActionType } from '../../actions';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { IBurgerPart } from '../../model/IBurgerPart';

const ingredients = mockIngredients;
const reducer = ordersReducer;
const initialState = InitialOrdersFeedState;

const mockIngredient = ingredients[0];

describe('order feed reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should ADD_TO_BASKET', () => {

    const state = initialState;

    const selectedIngredient = mockIngredient;
    const isBun = selectedIngredient.type === 'bun';
    const constructorItem: IConstructorElementData = {
      ingredientId: selectedIngredient._id,
      price: selectedIngredient.price,
      text: selectedIngredient.name,
      thumbnail: selectedIngredient.image,
      selectedId: selectedIngredient._id,
    };

    const selectedBun = isBun ? constructorItem : state.selectedBun;
    const selectedParts = isBun
      ? state.selectedParts
      : [...state.selectedParts, constructorItem];

    let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
    if (selectedBun) sum += selectedBun.price * 2;

    const ingredientAmountMap: Record<string, number> = {};
    if (isBun && selectedBun) ingredientAmountMap[selectedBun.ingredientId] = 2;
    selectedParts.forEach(({ ingredientId }) => {
      if (ingredientAmountMap[ingredientId] === undefined) ingredientAmountMap[ingredientId] = 0;
      ingredientAmountMap[ingredientId]++;
    });

    const endState = (reducer(state,
      { type: OrderActionActionType.INGREDIENT_ADD_TO_BASKET, ingredient: mockIngredient }));

    /**
     * Элементы корзины содержат уникальный nanoid
     * из-за которого isEqual не хорошо работает
     * а как мокать nanoid - разводят руками даже эксперты
     *
     * поэтому для тестирования мы извлекаем объекты и заменяем id
     */
    const endSelectedBun = selectedBun ? {
      ...endState.selectedBun,
      selectedId: selectedBun.selectedId,
    } : endState.selectedBun;

    const endSelectedParts = selectedBun ? []
      : endState.selectedParts.map(i=> ({
      ...i,
      selectedId: i.ingredientId
    }) );

    expect({ ...endState, selectedBun: undefined, selectedParts: [] }).toEqual({
      ...initialState,
      ingredientAmountMap,
      selectedBun: undefined,
      selectedParts: [],
      sum,
    });

    expect(endSelectedBun).toEqual(selectedBun);
    expect(endSelectedParts).toEqual(isBun ? [] : [
      selectedIngredient
    ])

  });

    it('should REMOVE_FROM_BASKET', () => {

      const mockIngredient = ingredients[2];
      const selectedIngredient = mapToSelected(mockIngredient);

      const state1 = {
        ...initialState,
        selectedParts: [selectedIngredient],
      };

      const removePayload: IRemovePayLoad = {
        ingredientId: mockIngredient._id,
        selectedId: mockIngredient._id,
      };

      expect(reducer(state1,
        { type: OrderActionActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: removePayload }))
        .toEqual({
          ...state1,
          selectedParts: [],
        });
    });

});


function mapToSelected(a: IBurgerPart): IConstructorElementData {
  return  {
    price: a.price,
    text: a.name,
    thumbnail: a.image,
    ingredientId: a._id,
    selectedId: a._id
  }
}