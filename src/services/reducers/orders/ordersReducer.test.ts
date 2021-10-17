import mockIngredients from '../../mock/ingredients.json';
import { ordersReducer } from './ordersReducer';
import { InitialOrdersFeedState } from './ordersState';
import { IOrderPayLoad, IRemovePayLoad, IWsOrderMessage, OrderActionActionType } from '../../actions';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { IBurgerPart } from '../../model/IBurgerPart';
import { IOrderFeedItem, OrderStatus } from '../../model/IOrderFeedItem';
import { loggOff } from '../../utils/log';

const ingredients = mockIngredients;
const reducer = ordersReducer;
const INITIAL_STATE = InitialOrdersFeedState;

const mockIngredient = ingredients[0];

describe('order feed reducer', () => {
  loggOff();

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should INGREDIENT_ADD_TO_BASKET', () => {

    const state = INITIAL_STATE;

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
      : endState.selectedParts.map(i => ({
        ...i,
        selectedId: i.ingredientId,
      }));

    expect({ ...endState, selectedBun: undefined, selectedParts: [] }).toEqual({
      ...INITIAL_STATE,
      ingredientAmountMap,
      selectedBun: undefined,
      selectedParts: [],
      sum,
    });

    expect(endSelectedBun).toEqual(selectedBun);
    expect(endSelectedParts).toEqual(isBun ? [] : [
      selectedIngredient,
    ]);

  });

  it('should INGREDIENT_REMOVE_FROM_BASKET', () => {

    const mockIngredient = ingredients[2];
    const selectedIngredient = mapToSelected(mockIngredient);

    const state1 = {
      ...INITIAL_STATE,
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

  it('should ORDER_RESET', () => {
    const state1 = INITIAL_STATE;
    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_RESET }))
      .toEqual({
        ...state1,
        isOrderRequest: false,
        isOrderSuccess: false,
        isOrderFailed: false,
      });
  });

  it('should ORDER_REQUEST', () => {
    const state1 = INITIAL_STATE;
    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_REQUEST }))
      .toEqual({
        ...state1,
        isOrderRequest: true,
        isOrderSuccess: false,
        isOrderFailed: false,
        orderMessage: 'Идет запрос к серверу...',
        isBadOrderMessage: false,
      });
  });

  it('should ORDER_SUCCESS', () => {
    const state1 = INITIAL_STATE;
    const payload: IOrderPayLoad = {
      createdAt: '', id: '', ingredients: [], name: '', number: 0, status: OrderStatus.CREATED,

    };
    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_SUCCESS, payload }))
      .toEqual({
        ...state1,
        ingredientAmountMap: {},
        selectedParts: [],
        selectedBun: undefined,
        isOrderRequest: false,
        isOrderSuccess: true,
        isOrderFailed: false,
        showCreatedOrder: payload,
        orderMessage: 'Бургер успешно заказан',
        isBadOrderMessage: false,
      });
  });

  it('should ORDER_FAILED', () => {
    const state1 = INITIAL_STATE;
    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_FAILED }))
      .toEqual({
        ...state1,
        isOrderRequest: false,
        isOrderFailed: true,
        isOrderSuccess: false,
        orderMessage: 'Ошибка сервера, попробуйте повторить заказ...',
        isBadOrderMessage: true,
      });
  });

  it('should ORDER_MESSAGE_RESET', () => {
    const state1 = INITIAL_STATE;
    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_MESSAGE_RESET }))
      .toEqual({
        ...state1,
        orderMessage: undefined,
        isBadOrderMessage: false,
      });
  });

  it('should BASKET_ITEM_SWAP', () => {
    const selected1 = mapToSelected(ingredients[2]);
    const selected2 = mapToSelected(ingredients[3]);

    const state1 = {
      ...INITIAL_STATE,
      selectedParts: [
        selected1, selected2,
      ],
    };

    const state2 = {
      ...INITIAL_STATE,
      selectedParts: [
        selected2, selected1,
      ],
    };
    const selectedId1 = selected1.selectedId;
    const selectedId2 = selected2.selectedId;
    expect(reducer(state1,
      { type: OrderActionActionType.BASKET_ITEM_SWAP, selectedId1, selectedId2 }))
      .toEqual(state2);
  });

  it('should WS_ORDER_GET_MESSAGE', () => {

    const state1 = {
      ...INITIAL_STATE,
    };

    const wsMessageSuccess: IWsOrderMessage = {
      success: true, orders: [], total: 100, totalToday: 10,
    };

    const wsMessageFail: IWsOrderMessage = {
      orders: [], total: 100, totalToday: 10,
    };

    const state2Success = {
      ...INITIAL_STATE,
      orderFeed: [],
      orderToday: wsMessageSuccess.totalToday,
      orderTotal: wsMessageSuccess.total,
    };


    expect(reducer(state1,
      { type: OrderActionActionType.WS_ORDER_GET_MESSAGE, message: wsMessageSuccess }))
      .toEqual(state2Success);

    expect(reducer(state1,
      { type: OrderActionActionType.WS_ORDER_GET_MESSAGE, message: wsMessageFail }))
      .toEqual({ ...state1 });
  });

  it('should ORDER_FEED_UPDATE', () => {

    const state1 = {
      ...INITIAL_STATE,
    };

    const order1: IOrderFeedItem = {
      createdAt: '', id: '1', ingredients: [], name: '', number: 0, status: OrderStatus.CREATED,
    };

    const order2: IOrderFeedItem = {
      createdAt: '', id: '2', ingredients: [], name: '', number: 0, status: OrderStatus.CREATED,
    };
    const orderFeed: IOrderFeedItem[] = [
      order1, order2,
    ];

    const state2Success = {
      ...INITIAL_STATE,
      orderFeed,
    };


    expect(reducer(state1,
      { type: OrderActionActionType.ORDER_FEED_UPDATE, orderFeed }))
      .toEqual(state2Success);
  });


  it('should ORDERED_POPUP_SHOW', () => {

    const state1 = {
      ...INITIAL_STATE,
    };

    const order1: IOrderFeedItem = {
      createdAt: '', id: '1', ingredients: [], name: '', number: 0, status: OrderStatus.CREATED,
    };

    const state2Success = {
      ...INITIAL_STATE,
      showCreatedOrder: undefined,
      showedOrders: [order1]
    };


    expect(reducer(state1,
      { type: OrderActionActionType.ORDERED_POPUP_SHOW, order: order1 }))
      .toEqual(state2Success);
  });

});


function mapToSelected(a: IBurgerPart): IConstructorElementData {
  return {
    price: a.price,
    text: a.name,
    thumbnail: a.image,
    ingredientId: a._id,
    selectedId: a._id,
  };
}