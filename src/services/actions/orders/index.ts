import { IBurgerPart } from '../../model/IBurgerPart';
import { IApiOrderFeedItem, IOrderFeedItem } from '../../model/IOrderFeedItem';
import { IGetState } from '../../store';
import { API } from '../../services/ApiService';
import { mapApiOrderData } from '../../converters/getBurgerParts';
import { getTokenAuth } from '../../cookieTokens';
import { logg } from '../../utils/log';

export type OrderAction =
  | { type: OrderActionActionType.INGREDIENT_ADD_TO_BASKET, ingredient: IBurgerPart }
  | { type: OrderActionActionType.INGREDIENT_REMOVE_FROM_BASKET, payload: IRemovePayLoad }
  | { type: OrderActionActionType.ORDER_RESET }
  | { type: OrderActionActionType.ORDER_REQUEST }
  | { type: OrderActionActionType.ORDER_SUCCESS, payload: IOrderPayLoad }
  | { type: OrderActionActionType.ORDER_FAILED }
  | { type: OrderActionActionType.ORDER_MESSAGE_RESET }
  | { type: OrderActionActionType.WS_ORDER_CONNECTION_START, token: string }
  | { type: OrderActionActionType.WS_ORDER_CONNECTION_SUCCESS }
  | { type: OrderActionActionType.WS_ORDER_CONNECTION_CLOSE }
  | { type: OrderActionActionType.WS_ORDER_CONNECTION_CLOSED, event: any }
  | { type: OrderActionActionType.WS_ORDER_CONNECTION_ERROR, error: any }
  | { type: OrderActionActionType.ORDERS_FEED_UPDATE, message: IWsOrderMessage }
  | { type: OrderActionActionType.WS_ORDER_SEND_MESSAGE, message: any }
  | { type: OrderActionActionType.ORDERED_POPUP_SHOW, order: IOrderFeedItem }
  | { type: OrderActionActionType.BASKET_ITEM_SWAP, selectedId1: string, selectedId2: string }


export interface IOrderPayLoad extends IOrderFeedItem {
}


export interface IWsOrderMessage {
  success?: boolean;
  total: number;
  totalToday: number;
  orders: IApiOrderFeedItem[];
}


export interface IRemovePayLoad {
  selectedId: string,
  ingredientId: string
}

export enum OrderActionActionType {
  INGREDIENT_ADD_TO_BASKET = 'INGREDIENT_ADD_TO_BASKET',
  INGREDIENT_REMOVE_FROM_BASKET = 'INGREDIENT_REMOVE_FROM_BASKET',

  BASKET_ITEM_SWAP = 'BASKET_ITEM_SWAP',

  ORDER_RESET = 'ORDER_RESET',
  ORDER_REQUEST = 'ORDER_REQUEST',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ORDER_FAILED = 'ORDER_FAILED',
  ORDER_MESSAGE_RESET = 'ORDER_MESSAGE_RESET',

  WS_ORDER_CONNECTION_SUCCESS = 'WS_ORDER_CONNECTION_SUCCESS',
  WS_ORDER_CONNECTION_START = 'WS_ORDER_CONNECTION_START',
  WS_ORDER_CONNECTION_ERROR = 'WS_ORDER_CONNECTION_ERROR',
  WS_ORDER_CONNECTION_CLOSED = 'WS_ORDER_CONNECTION_CLOSED',
  WS_ORDER_CONNECTION_CLOSE = 'WS_ORDER_CONNECTION_CLOSE',
  ORDERS_FEED_UPDATE = 'ORDERS_FEED_UPDATE',
  WS_ORDER_SEND_MESSAGE = 'WS_ORDER_SEND_MESSAGE',

  // отправить при открытии окна с информацией о полученном заказе
  ORDERED_POPUP_SHOW = 'ORDERED_POPUP_SHOW',

}

type OrderDispatch = (action: OrderAction) => any;


const updateOrderFeedFromHttp = () =>
  async (dispatch: OrderDispatch, getState: IGetState) => {
    try {
      const apiOrderFeed = await API.fetchOrdersFeed();
      console.log('updateOrderFeedFromHttp', apiOrderFeed)
      const { ingredients } = getState().ingredients;
      const { total, totalToday, orders } = apiOrderFeed;
      dispatch({
        type: OrderActionActionType.ORDERS_FEED_UPDATE,
        message: {
          orders,
          total,
          totalToday,
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };

const closeSocket = () => async (dispatch: OrderDispatch) => {
  dispatch({ type: OrderActionActionType.WS_ORDER_CONNECTION_CLOSE });
};

const onIngredientDropActionCreator = (id: string) => (dispatch: OrderDispatch, getState: IGetState) => {
  const { ingredients } = getState().ingredients;
  const ingredient = ingredients.find(i => i._id === id);
  if (ingredient) {
    dispatch({ type: OrderActionActionType.INGREDIENT_ADD_TO_BASKET, ingredient });
  }
};

const orderAuthorizedActionCreator = () => async (dispatch: OrderDispatch, getState: IGetState) => {
  dispatch({ type: OrderActionActionType.ORDER_REQUEST });
  const state = getState().orders;

  const { ingredients } = getState().ingredients;

  const selectedBun = state.selectedBun;
  const selectedIds = state.selectedParts.map(i => i.ingredientId);
  if (selectedBun) {
    selectedIds.push(selectedBun.ingredientId);
    selectedIds.push(selectedBun.ingredientId);
  }

  // order срабатывает с сильным запозданием, поэтому перевесим SUCCESS на проверку через сокеты
  API.order(selectedIds)
    .then(result => {
      dispatch({ type: OrderActionActionType.ORDER_SUCCESS, payload: mapApiOrderData(result, ingredients) });
      setTimeout(() => {
        dispatch({ type: OrderActionActionType.ORDER_MESSAGE_RESET });
      }, 1500);
    })
    .catch(e => {
      console.error(e);
      dispatch({ type: OrderActionActionType.ORDER_FAILED });
      setTimeout(() => {
        dispatch({ type: OrderActionActionType.ORDER_MESSAGE_RESET });
      }, 1500);
    });
};


const initOrderFeedSocket = () => async (dispatch: OrderDispatch) => {
  const token = getTokenAuth();
  if (token) {
    dispatch({ type: OrderActionActionType.WS_ORDER_CONNECTION_START, token });
    logg('initOrderFeedSocket', token);
  }
};

const showOrderPopup = (order: IOrderFeedItem) => async (dispatch: OrderDispatch) => {
  dispatch({ type: OrderActionActionType.ORDERED_POPUP_SHOW, order });
};


export const ORDERS_ACTION = {
  initOrderFeedSocket,
  closeSocket,
  showOrderPopup,
  updateOrderFeedFromHttp,
  onIngredientDropActionCreator,
  orderAuthorizedActionCreator,
  swapBasketItem: (selectedId1: string, selectedId2: string) => ({
    type: OrderActionActionType.BASKET_ITEM_SWAP,
    selectedId1,
    selectedId2,
  }),
  removeFromBasket: (payload: IRemovePayLoad) => ({
    type: OrderActionActionType.INGREDIENT_REMOVE_FROM_BASKET,
    payload,
  }),
};