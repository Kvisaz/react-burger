import { nanoid } from 'nanoid';
import { BurgerAction, IBurgerActionType, IRemovePayLoad, IWsOrderMessage } from '../../actions';
import { IBurgerPart } from '../../model/IBurgerPart';
import { logg } from '../../utils/log';
import { OrderStatus } from '../../model/IOrderFeedItem';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { mapApiOrderData } from '../../converters/getBurgerParts';
import { IngredientStorage } from '../../storages/IngredientStorage';
import { InitialOrdersFeedState, IOrderState } from './ordersFeedState';


export function ordersFeedReducer(state: IOrderState = InitialOrdersFeedState, action: BurgerAction): IOrderState {
  switch (action.type) {
    case IBurgerActionType.ORDER_RESET:
      return {
        ...state,
        isOrderRequest: false,
        isOrderSuccess: false,
        isOrderFailed: false,
      };
    case IBurgerActionType.ORDER_REQUEST:
      return {
        ...state,
        isOrderRequest: true,
        isOrderSuccess: false,
        isOrderFailed: false,
      };
    case IBurgerActionType.ORDER_SUCCESS:
      return {
        ...resetOrderBasket(state),
        isOrderRequest: false,
        isOrderSuccess: true,
        isOrderFailed: false,
      };
    case IBurgerActionType.ORDER_FAILED:
      return {
        ...state,
        isOrderRequest: false,
        isOrderFailed: true,
        isOrderSuccess: false,
      };
    case IBurgerActionType.INGREDIENT_ADD_TO_BASKET:
      return onSelectAction(action, state);
    case IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET:
      return onRemoveAction(action, state);
    case IBurgerActionType.BASKET_ITEM_SWAP:
      return onBasketItemSwap(action, state);

    case IBurgerActionType.WS_ORDER_GET_MESSAGE:
      return onWsOrderGetMessage(action, state);
    case IBurgerActionType.ORDER_FEED_UPDATE:
      return {
        ...state,
        orderFeed: action.orderFeed,
      };
    case IBurgerActionType.ORDERED_POPUP_SHOW:
      return {
        ...state,
        showCreatedOrder: undefined,
        showedOrders: [...state.showedOrders, action.order],
      };
    default:
      logg(`ordersFeedReducer unknown action`, action);
      return {
        ...state,
      };
  }
}

function onSelectAction(
  action: { type: IBurgerActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart },
  state: IOrderState,
): IOrderState {
  const selectedIngredient = action.ingredient;
  const isBun = selectedIngredient.type === 'bun';
  const constructorItem = mapBurgerItem(selectedIngredient);

  const selectedBun = isBun ? constructorItem : state.selectedBun;
  const selectedParts = isBun
    ? state.selectedParts
    : [...state.selectedParts, constructorItem];

  let sum = selectedParts.reduce((acc, next) => acc + next.price, 0);
  if (selectedBun) sum += selectedBun.price * 2;

  const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

  return {
    ...state,
    ingredientAmountMap,
    selectedBun,
    selectedParts,
    sum,
  };
}

function onRemoveAction(
  action: { type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad },
  state: IOrderState):
  IOrderState {

  const { selectedId } = action.payload;
  const selectedParts = [...state.selectedParts.filter(p => p.selectedId !== selectedId)];
  const { selectedBun } = state;
  const bunSum = selectedBun === undefined ? 0 : selectedBun.price * 2;
  const sum = bunSum + selectedParts.reduce((acc, next) => acc + next.price, 0);

  const ingredientAmountMap = updateAmounts(selectedParts, selectedBun);

  return {
    ...state,
    selectedParts,
    ingredientAmountMap,
    sum,
  };
}

function updateAmounts(selectedParts: IConstructorElementData[], bun?: IConstructorElementData): Record<string, number> {
  const amountMap: Record<string, number> = {};
  if (bun) {
    const ingredientId = bun.ingredientId;
    amountMap[ingredientId] = 2;
  }
  selectedParts.forEach(({ ingredientId }) => {
    if (amountMap[ingredientId] === undefined) amountMap[ingredientId] = 0;
    amountMap[ingredientId]++;
  });
  return amountMap;
}


function mapBurgerItem(data: IBurgerPart): IConstructorElementData {
  return setUniqueSelectorId({
    ingredientId: data._id, price: data.price, text: data.name, thumbnail: data.image,
    selectedId: data._id,
  });
}

function setUniqueSelectorId(data: IConstructorElementData): IConstructorElementData {
  return {
    ...data,
    selectedId: nanoid(),
  };
}

function onBasketItemSwap(
  action: { type: IBurgerActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string },
  state: IOrderState,
): IOrderState {
  const { selectedId1, selectedId2 } = action;
  const { selectedParts } = state;
  const results = selectedParts.slice();
  const item1index = selectedParts.findIndex(item => item.selectedId === selectedId1);
  const item2index = selectedParts.findIndex(item => item.selectedId === selectedId2);
  if (item1index > -1 && item2index > -1) {
    results[item2index] = selectedParts[item1index];
    results[item1index] = selectedParts[item2index];
  } else {
    console.warn(`cannot find ${selectedId1}, ${selectedId2} in `, selectedParts);
  }
  return {
    ...state,
    selectedParts: results,
  };
}


/**
 * Обнулить корзину
 */
function resetOrderBasket(state: IOrderState): IOrderState {
  return {
    ...state,
    ingredientAmountMap: {},
    selectedParts: [],
    selectedBun: undefined,
  };
}

function onWsOrderGetMessage(
  action: { type: IBurgerActionType.WS_ORDER_GET_MESSAGE, message: IWsOrderMessage },
  state: IOrderState,
):
  IOrderState {

  logg('WS_ORDER_GET_MESSAGE meesage', action);
  const { success, orders, total: orderTotal, totalToday: orderToday } = action.message;

  if (success) {
    const ingredients = IngredientStorage.getIngredients();
    const orderFeed = orders.map(order => mapApiOrderData(order, ingredients));

    const showCreatedOrder = orderFeed.filter(order => order.status === OrderStatus.CREATED)[0];
    logg('showCreatedOrder ', showCreatedOrder);

    // если ордер можно показать - можно очистить корзину
    const successState = showCreatedOrder ? resetOrderBasket(state) : state;

    return {
      ...successState,
      orderFeed,
      orderToday,
      orderTotal,
      showCreatedOrder,
    };
  } else {
    return {
      ...state,
    };
  }
}